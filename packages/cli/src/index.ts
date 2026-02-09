import { Command } from "commander";
const program = new Command();
import inquirer from "inquirer";
import path from "node:path";
import { generateRandomNames } from "./utils/utils..js";
import { setup_restApi_project } from "./generator/shell.js";

//todo
// code express js with javascript template with using ejs

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

        const config = await inquirer.prompt([
          {
            type: "select",
            name: "template",
            message: "Template",
            choices: [
              {
                name: "REST API [Express, CORS, dotenv, JWT, Helmet]",
                value: "rest_api",
              },
              {
                name: "WebSockets + REST API [Express, CORS, dotenv, JWT, ws]",
                value: "websocket+rest_api",
              },
            ],
            default: 0,
          },
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
            when: (answers) => answers.template === "websocket+rest_api", // ← Only show if WebSocket selected
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
            message: "Database",
            choices: [
              { name: "None", value: "none" },
              { name: "MongoDB (Mongoose)", value: "mongo" },
              {
                name: "Postgresql (Raw SQL with pg driver)",
                value: "postgresql",
              },
              {
                name: "PostgreSQL (Prisma)",
                value: "postgresql_prisma",
              },
            ],
            default: 0,
          },
        ]);
        console.log(config.template);
        console.log(config.database);
        console.log(config.language);
        const projectPath = path.join(process.cwd(), name);
        await setup_restApi_project({
          db: config.database as
            | "mongo"
            | "postgresql"
            | "postgresql_prisma"
            | "none",
          path: projectPath,
          name: name,
          language: config.language as "js" | "ts",
          template: config.template as string,
          websocket_package: config.websocket_package,
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
