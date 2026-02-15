import { Command } from "commander";
const program = new Command();
import inquirer from "inquirer";
import path from "node:path";
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
  .action(async (project_name) => {
    try {
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
        const project_path = getSafeProjectPath(name);
        const templateSelection = await inquirer.prompt([
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
            when: () => templateSelection.template === "websocket+rest_api", // ← Only show if WebSocket selected
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
          },
          {
            type: "select",
            name: "database",
            message: (answers) =>
              answers.language === "js"
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
          },
          {
            type: "confirm",
            name: "docker",
            message:
              "Would you like to generate a Dockerfile for this project?",
            default: false,
          },
        ]);
        const fullConfig = { ...templateSelection, ...config };
        if (fullConfig.docker && !(await isToolInstalled("docker"))) {
          console.warn(
            'Warning: "docker" is not installed. Dockerfile will be generated, but you cannot build/run containers until Docker is installed.',
          );
        }
        // console.log(fullConfig.template);
        // console.log(fullConfig.database);
        // console.log(fullConfig.language);
        await setup_restApi_project({
          db: fullConfig.database as "mongo" | "postgresql_prisma" | "none",
          path: project_path,
          name: name,
          language: fullConfig.language as "js" | "ts",
          template: fullConfig.template as string,
          websocket_package: fullConfig.websocket_package,
          Dockerfile: fullConfig.docker,
        });
      }
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
