import { Command } from "commander";
const program = new Command();
import inquirer from "inquirer";
import path from "node:path";
import type { FlagConfig, PresetConfig } from "./types.js";
import {
  checkEnv,
  generateRandomNames,
  getSafeProjectPath,
  isToolInstalled,
} from "./utils/utils.js";
import { setup_restApi_project } from "./generator/shell.js";

program
  .name("stackforge-init-app")
  .command("stackforge-init-app")
  .description("Generate production-ready backend projects")
  .argument("[project-name]")
  .version("1.0.0")
  // Preset flags
  .option("--ts", "TypeScript + REST API (default template)")
  .option("--js", "JavaScript + REST API (default template)")
  .option("--ts-rest", "TypeScript + REST API")
  .option("--ts-ws", "TypeScript + WebSocket (ws package)")
  .option("--ts-io", "TypeScript + Socket.io")
  .option("--js-rest", "JavaScript + REST API")
  .option("--js-ws", "JavaScript + WebSocket (ws package)")
  .option("--js-io", "JavaScript + Socket.io")
  // Granular configuration flags
  .option("--template <type>", "Template type: rest_api or websocket+rest_api")
  .option("--lang <language>", "Language: js or ts")
  .option("--db <database>", "Database: none, mongo, or postgresql_prisma")
  .option("--ws <package>", "WebSocket package: ws or socket.io")
  .option("--docker", "Include Dockerfile")
  .option("--no-docker", "Skip Dockerfile")
  // Utility flags
  .option("--no-install", "Skip dependency installation")
  .option("--no-git", "Skip git initialization")
  .option("--pm <manager>", "Package manager: npm, pnpm, or yarn")
  .addHelpText(
    "after",
    `
Examples:
  $ stackforge-init-app my-app --ts-rest
  $ stackforge-init-app my-app --ts-io --db mongo --docker
  $ stackforge-init-app my-app --js-ws --db none --no-git
  $ stackforge-init-app my-app --template rest_api --lang ts --db postgresql_prisma
    `,
  )
  .action(async (project_name, options) => {
    try {
      // Parse preset flags into configuration
      const flagConfig: FlagConfig = {};

      // Handle preset flags
      const presets: PresetConfig[] = [
        { flag: options.ts, template: "rest_api", language: "ts" },
        { flag: options.js, template: "rest_api", language: "js" },
        { flag: options.tsRest, template: "rest_api", language: "ts" },
        {
          flag: options.tsWs,
          template: "websocket+rest_api",
          language: "ts",
          websocketPackage: "ws",
        },
        {
          flag: options.tsIo,
          template: "websocket+rest_api",
          language: "ts",
          websocketPackage: "socket.io",
        },
        { flag: options.jsRest, template: "rest_api", language: "js" },
        {
          flag: options.jsWs,
          template: "websocket+rest_api",
          language: "js",
          websocketPackage: "ws",
        },
        {
          flag: options.jsIo,
          template: "websocket+rest_api",
          language: "js",
          websocketPackage: "socket.io",
        },
      ];

      const activePresets = presets.filter((p) => p.flag);
      if (activePresets.length > 1) {
        console.error(
          "❌ Error: Multiple preset flags detected. Please use only one preset flag.",
        );
        process.exit(1);
      }

      if (activePresets.length === 1) {
        const preset = activePresets[0];
        if (preset) {
          flagConfig.template = preset.template;
          flagConfig.language = preset.language;
          if (preset.websocketPackage) {
            flagConfig.websocket_package = preset.websocketPackage;
          }
        }
      }

      // Handle granular flags (they override presets)
      if (options.template) {
        const validTemplates = ["rest_api", "websocket+rest_api"];
        if (!validTemplates.includes(options.template)) {
          console.error(
            `❌ Error: Invalid template "${options.template}". Use: rest_api or websocket+rest_api`,
          );
          process.exit(1);
        }
        flagConfig.template = options.template;
      }

      if (options.lang) {
        const validLangs = ["js", "ts"];
        if (!validLangs.includes(options.lang)) {
          console.error(
            `❌ Error: Invalid language "${options.lang}". Use: js or ts`,
          );
          process.exit(1);
        }
        flagConfig.language = options.lang;
      }

      if (options.db) {
        const validDbs = ["none", "mongo", "postgresql_prisma"];
        if (!validDbs.includes(options.db)) {
          console.error(
            `❌ Error: Invalid database "${options.db}". Use: none, mongo, or postgresql_prisma`,
          );
          process.exit(1);
        }
        flagConfig.database = options.db;
      }

      if (options.ws) {
        const validWs = ["ws", "socket.io"];
        if (!validWs.includes(options.ws)) {
          console.error(
            `❌ Error: Invalid websocket package "${options.ws}". Use: ws or socket.io`,
          );
          process.exit(1);
        }
        flagConfig.websocket_package = options.ws;
      }

      // Handle docker flag (options.docker will be true if --docker, false if --no-docker, undefined if not specified)
      // If docker is undefined, set it to false (no docker)
      if (options.docker !== undefined) {
        flagConfig.docker = options.docker;
      } else {
        flagConfig.docker = false;
      }

      // Validate: websocket package only makes sense with websocket template
      if (flagConfig.websocket_package && flagConfig.template === "rest_api") {
        console.error(
          "❌ Error: --ws flag can only be used with websocket+rest_api template",
        );
        process.exit(1);
      }

      // Validate: PostgreSQL + JavaScript warning
      if (
        flagConfig.database === "postgresql_prisma" &&
        flagConfig.language === "js"
      ) {
        console.warn(
          "⚠️  Warning: JavaScript does not work properly with PostgreSQL (Prisma). Consider using TypeScript.",
        );
      }

      let name = project_name;
      if (!name) {
        const answer = await inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: "Project Name",
            default: generateRandomNames(),
          },
        ]);
        name = answer.name;
      }
      const project_path = getSafeProjectPath(name);

      // Only prompt for template if not provided via flags
      const templateSelection = flagConfig.template
        ? { template: flagConfig.template }
        : await inquirer.prompt([
            {
              type: "select",
              name: "template",
              message: "Template",
              choices: [
                {
                  name: "REST API [Express, CORS, dotenv, JWT, Helmet, Pino]",
                  value: "rest_api",
                },
                {
                  name: "WebSockets + REST API [Express, CORS, dotenv, JWT, ws or socket.io]",
                  value: "websocket+rest_api",
                },
              ],
              default: 0,
            },
          ]);

      await checkEnv();

      const config = await inquirer.prompt([
        {
          type: "select",
          name: "websocket_package",
          message: "WebSocket Engine",
          choices: [
            {
              name: "Socket.io (Room support, auto-reconnect, broadcast helpers)",
              value: "socket.io",
            },
            {
              name: "ws (Lightweight, manual control)",
              value: "ws",
            },
          ],
          default: 0,
          when: () =>
            !flagConfig.websocket_package &&
            templateSelection.template === "websocket+rest_api",
        },
        {
          type: "select",
          name: "language",
          message: "Language",
          choices: [
            {
              name: "Javascript",
              value: "js",
            },
            {
              name: "Typescript",
              value: "ts",
            },
          ],
          when: () => !flagConfig.language,
        },
        {
          type: "select",
          name: "database",
          message: (answers) =>
            (flagConfig.language || answers.language) === "js"
              ? "Database (Warning: JavaScript does not work properly with PostgreSQL (Prisma). Use TypeScript.)"
              : "Database",
          choices: [
            { name: "None", value: "none" },
            { name: "MongoDB (Mongoose)", value: "mongo" },
            {
              name: "PostgreSQL (Prisma)",
              value: "postgresql_prisma",
            },
          ],
          default: 0,
          when: () => !flagConfig.database,
        },
        {
          type: "confirm",
          name: "docker",
          message: "Would you like to generate a Dockerfile for this project?",
          default: false,
          when: () => flagConfig.docker === undefined,
        },
      ]);

      const fullConfig = {
        ...templateSelection,
        ...flagConfig,
        ...config,
      };

      if (fullConfig.docker && !(await isToolInstalled("docker"))) {
        console.warn(
          'Warning: "docker" is not installed. Dockerfile will be generated, but you cannot build/run containers until Docker is installed.',
        );
      }

      await setup_restApi_project({
        db: fullConfig.database as "mongo" | "postgresql_prisma" | "none",
        path: project_path,
        name: name,
        language: fullConfig.language as "js" | "ts",
        template: fullConfig.template as string,
        websocket_package: fullConfig.websocket_package,
        Dockerfile: fullConfig.docker,
        skipInstall: options.install === false,
        skipGit: options.git === false,
        packageManager: options.pm || "npm",
      });

      console.log(name);
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "ExitPromptError") {
          console.log("\n⚠️ Process Cancelled by user");
          process.exit(0);
        }

        // Handle other errors
        console.error("❌ Error:", error.message);
        process.exit(1);
      }
    }
  });

program.parse();
