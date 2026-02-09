import { execa } from "execa";
import { oraPromise } from "ora";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import {
  restApi_deps,
  restApi_deps_typescript,
  db_deps,
  db_deps_dev,
  restApi_dirs,
  restApi_dev_deps,
  websocket_project_deps,
  project_path,
} from "../constants.js";
import type { ProjectConfig } from "../types.js";
import { showSuccessfulMessage, updatePackageJson } from "../utils/utils..js";

export async function setup_restApi_project(project_config: ProjectConfig) {
  try {
    const project_dir_path = path.join(project_path, project_config.name);

    if (!fs.existsSync(project_dir_path)) {
      fs.mkdirSync(project_dir_path, { recursive: true });
    }
    await oraPromise(execa("npm", ["init", "-y"], { cwd: project_dir_path }), {
      text: "Initializing npm project...",
      successText: chalk.green("npm initialized"),
    });

    // Step 2: Set package name
    await oraPromise(
      execa("npm", ["pkg", "set", `name=${project_config.name}`], {
        cwd: project_dir_path,
      }),
      {
        text: "Setting project name...",
        successText: chalk.green(
          `Project name set to "${project_config.name}"`,
        ),
      },
    );

    // Step 3: Install dependencies
    const deps = restApi_deps;
    const dbDependenciesObj = db_deps.find((d) => d.db === project_config.db);
    const dbDeps = dbDependenciesObj?.deps ?? [];

    const allDeps = [...deps, ...dbDeps];
    await oraPromise(
      execa("npm", ["install", ...allDeps], { cwd: project_dir_path }),
      {
        text: `Installing dependencies (${allDeps.length} packages)...`,
        successText: chalk.green("Dependencies installed"),
      },
    );

    // Step 4: Create directories
    await oraPromise(generate_restApis_folder(project_dir_path), {
      text: "Creating project structure...",
      successText: chalk.green("Directories created"),
    });

    // Step 5: Install dev dependencies
    if (project_config.language === "ts") {
      console.log("typescript project");
      await oraPromise(setup_restApiforTypeScript_project(project_dir_path), {
        text: "Setuping typescript compiler",
        successText: chalk.green("Ts project enabled"),
      });
    }
    const devDeps = [];
    const dbDevDependenciesObj = db_deps_dev.find(
      (d) => d.db === project_config.db,
    );
    const dbDev_Deps = dbDevDependenciesObj?.deps ?? [];
    devDeps.push(...dbDev_Deps);
    await oraPromise(
      execa("npm", ["install", "-D", ...devDeps, ...restApi_dev_deps], {
        cwd: project_dir_path,
      }),
      {
        text: `Installing dev dependencies (${devDeps.length + restApi_dev_deps.length} packages)...`,
        successText: chalk.green("Dev dependencies installed"),
      },
    );
    if (project_config.db === "postgresql_prisma") {
      await oraPromise(
        execa("npx", ["prisma", "init"], {
          cwd: project_dir_path,
        }),
        {
          text: `Setting up prisma ...`,
          successText: chalk.green("Prisma Setup done"),
        },
      );
    }

    // Step 6: Setup websockets if template includes websocket
    if (
      project_config.template.includes("websocket") &&
      project_config.websocket_package
    ) {
      await oraPromise(
        setup_websockets_project(
          project_config.websocket_package,
          project_config.language,
          project_dir_path,
        ),
        {
          text: `Setting up ${project_config.websocket_package}...`,
          successText: chalk.green(
            `${project_config.websocket_package} configured`,
          ),
        },
      );
    }
    await oraPromise(updatePackageJson(project_dir_path, project_config.language), {
      text: `Updating package.json with dev scripts...`,
      successText: chalk.green("Updated Package.json"),
    });

    await oraPromise(execa(`git`, ["init"], { cwd: project_dir_path }), {
      successText: chalk.green("Initialized git repositary"),
    });
    await oraPromise(execa(`npm`, ["install"], { cwd: project_dir_path }));
    // Final success message
    showSuccessfulMessage(project_config);
  } catch (error) {
    console.error(chalk.red("Failed to setup project:"), error);
    process.exit(1);
  }
}

export async function generate_restApis_folder(project_path: string) {
  try {
    await execa("mkdir", ["-p", ...restApi_dirs], { cwd: project_path });
  } catch (error) {
    throw new Error(`Failed to create directories: ${error}`);
  }
}

export async function setup_restApiforTypeScript_project(project_path: string) {
  try {
    await execa(`npm`, ["install", "-D", ...restApi_deps_typescript], {
      cwd: project_path,
    });
    await execa("npx", ["tsc", "--init"], { cwd: project_path });
  } catch (error) {
    console.log(
      "Failed to setup the typescript project for restApi template: ",
      error,
    );
    return null;
  }
}

export async function setup_websockets_project(
  websocket_package: string,
  language: string,
  project_path: string,
) {
  try {
    const dependencies = [];
    const wsDeps = websocket_project_deps.find(
      (d) => d.package === websocket_package,
    );
    if (!wsDeps) {
      throw new Error(`Unsupported database type: ${websocket_package}`);
    }
    dependencies.push(...wsDeps.deps);
    if (language === "ts" && websocket_package === "ws") {
      await execa("npm", ["install", "-D", "@types/ws"], {
        cwd: project_path,
      });
    }
    await execa("npm", ["install", ...dependencies], { cwd: project_path });

    return true;
  } catch (error) {
    console.log("failed to setup the websocket project: ", error);
    return false;
  }
}
