#!/usr/bin/env node

import { Command, type OptionValues } from "commander";
const program = new Command();
import inquirer from "inquirer";
import type { FlagConfig, PresetConfig } from "./types.js";
import {
  checkEnv,
  generateRandomNames,
  getSafeProjectPath,
  isToolInstalled,
  validateProjectName,
} from "./utils/utils.js";
import { setup_restApi_project } from "./generator/shell.js";
import {
  package_manager_env,
  db_deps_dev,
  template_flags,
} from "./constants.js";
function validateRawFlags(args: string[]) {
  if (args.length >= 300) {
    throw new Error("Input is too long! Are You trying to hack me or what?");
  }
  const found_presets = args.filter((flags) => template_flags.includes(flags));
  //if no flag provided then I can ask the user only that bro what template do you want
  if (found_presets.length > 1) {
    // console.log(template_flag);
    throw new Error("Cannot have 2 template flags in one command");
  }
  const allowed_dbs = db_deps_dev.map((items) => items.db);
  const found_dbs = args.filter((dbs) => allowed_dbs.includes(dbs));

  if (found_dbs.length > 1) {
    throw new Error(
      `Cannot have 2 database choices in one command. You Choose: ${found_dbs.join(",")}`,
    );
  }
  const allowed_pms = package_manager_env.map((items) => items.package_manager);
  const found_pms = args.filter((pms) => allowed_pms.includes(pms));
  if (found_pms.length > 1) {
    throw new Error(
      `Cannot have 2 package_manager choices in one command. You Choose: ${found_pms.join(",")}`,
    );
  }

  if (args.includes("--docker") && args.includes("--no-docker")) {
    throw new Error("Docker and No-Docker Flag cannot exist in same command");
  }
}

program
  .name("appinit")
  .description("Express backend starter with optional WebSocket, DB, and Docker support.")
  .version("1.0.0")
  .argument("[projectName]", "Project name (optional). Prompts if omitted.")
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
  .option("--no-git", "Skip git initialization")
  .option("--pm <manager>", "Package manager: npm, pnpm, or yarn")
  .addHelpText(
    "after",
    `
Examples:
  $ appinit my-app --ts-rest
  $ appinit my-app --ts-io --db mongo --docker
  $ appinit my-app --js-ws --db none --no-git
  $ appinit my-app --template rest_api --lang ts --db postgresql_prisma
    `,
  )
  .action(async (projectName: string | undefined, options: OptionValues) => {
    try {
      // validateRawCommand(process.argv.slice(2).join(" "));
      //process.argv prints everythign you typed into the terminal like
      // npm init -y, here slice means create a new array after 2nd argument
      // npx appinit --ts-ws mongo => this will only create a new array
      // of ['--ts-ws','mongo']
      validateRawFlags(process.argv.slice(2));
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

      if (options.pm) {
        const validPm = ["npm", "pnpm", "yarn"];
        if (!validPm.includes(options.pm)) {
          console.error(
            `❌ Error: Invalid package manager "${options.pm}". Use: npm, pnpm, or yarn`,
          );
          process.exit(1);
        }

        // Check if the specified package manager is installed
        if (!(await isToolInstalled(options.pm))) {
          const fallbackPm = await inquirer.prompt([
            {
              type: "confirm",
              name: "useFallback",
              message: `⚠️  Package manager "${options.pm}" is not installed. Would you like to use npm instead?`,
              default: true,
            },
          ]);

          if (!fallbackPm.useFallback) {
            console.log(
              "❌ Cancelled: Please install the required package manager and try again.",
            );
            process.exit(0);
          }

          // Use npm as fallback
          options.pm = "npm";
        }
      }

      // Commander negated options can set defaults implicitly.
      // Only treat docker as explicitly configured when the user passed a docker flag.
      const dockerFlagProvided =
        process.argv.includes("--docker")
        || process.argv.includes("--no-docker");
      if (dockerFlagProvided) {
        flagConfig.docker = options.docker;
      }

      // Validate: websocket package only makes sense with websocket template
      if (flagConfig.websocket_package && flagConfig.template === "rest_api") {
        console.error(
          "❌ Error: --ws flag can only be used with websocket+rest_api template",
        );
        process.exit(1);
      }

      // PostgreSQL_Prisma + JavaScript warning
      if (
        flagConfig.database === "postgresql_prisma"
        && flagConfig.language === "js"
      ) {
        console.warn(
          "⚠️  Warning: JavaScript does not work properly with PostgreSQL (Prisma). Consider using TypeScript.",
        );
      }

      const selectedProjectName = projectName
        ? projectName
        : (
            await inquirer.prompt([
              {
                type: "input",
                name: "name",
                message: "Project Name",
                default: generateRandomNames(),
              },
            ])
          ).name;
      const normalizedProjectName = selectedProjectName.trim();
      validateProjectName(normalizedProjectName);
      let project_path = getSafeProjectPath(normalizedProjectName);
      // console.log(project_path);
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
            !flagConfig.websocket_package
            && templateSelection.template === "websocket+rest_api",
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
        {
          type: "select",
          name: "packageManager",
          message: "Package Manager",
          choices: [
            {
              name: "npm (default)",
              value: "npm",
            },
            {
              name: "pnpm",
              value: "pnpm",
            },
            {
              name: "yarn",
              value: "yarn",
            },
          ],
          default: 0,
          when: () => !options.pm,
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

      let resolvedPm = options.pm || fullConfig.packageManager || "npm";
      if (!(await isToolInstalled(resolvedPm))) {
        const fallbackPm = await inquirer.prompt([
          {
            type: "confirm",
            name: "useFallback",
            message: `Package manager "${resolvedPm}" is not installed. Would you like to use npm instead?`,
            default: true,
          },
        ]);

        if (!fallbackPm.useFallback) {
          console.log(
            "❌ Cancelled: Please install the required package manager and try again.",
          );
          process.exit(0);
        }

        resolvedPm = "npm";
      }

      await setup_restApi_project({
        db: fullConfig.database as "mongo" | "postgresql_prisma" | "none",
        path: project_path,
        name: normalizedProjectName,
        language: fullConfig.language as "js" | "ts",
        template: fullConfig.template as string,
        websocket_package: fullConfig.websocket_package,
        Dockerfile: fullConfig.docker,
        skipGit: options.git === false,
        packageManager: resolvedPm,
      });
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
