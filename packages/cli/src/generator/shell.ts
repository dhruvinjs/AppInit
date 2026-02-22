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
} from "../constants.js";
import type { ProjectConfig } from "../types.js";
import {
  removeProjectDirectory,
  showSuccessfulMessage,
  updatePackageJson,
  updateTsconfig,
  isToolInstalled,
} from "../utils/utils.js";
import { write_rest_templates } from "./template_engine.js";

let current_project_path: string | null = null;

export async function setup_restApi_project(project_config: ProjectConfig) {
  const pm = project_config.packageManager || "npm";
  const pmInstall = pm === "yarn" ? "add" : "install";

  // Set the current project path for SIGINT handler
  current_project_path = project_config.path;

  try {
    // Check if package manager is installed
    if (!(await isToolInstalled(pm))) {
      throw new Error(
        `Package manager "${pm}" is not installed or not in your PATH.`,
      );
    }

    if (!fs.existsSync(project_config.path)) {
      fs.mkdirSync(project_config.path, { recursive: true });
    }

    // Handle package manager init differently - pnpm and yarn don't support -y flag
    const initArgs = pm === "npm" ? ["init", "-y"] : ["init"];
    await oraPromise(execa(pm, initArgs, { cwd: project_config.path }), {
      text: "Initializing project...",
      successText: chalk.green(`${pm} initialized`),
    });

    // Step 2: Set package name
    await oraPromise(
      execa(pm, ["pkg", "set", `name=${project_config.name}`], {
        cwd: project_config.path,
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
      execa(pm, [pmInstall, ...allDeps], { cwd: project_config.path }),
      {
        text: `Installing dependencies (${allDeps.length} packages)...`,
        successText: chalk.green("Dependencies installed"),
      },
    );

    // Step 4: Create directories
    await oraPromise(generate_restApis_folder(project_config.path), {
      text: "Creating project structure...",
      successText: chalk.green("Directories created"),
    });

    // Step 5: Install dev dependencies
    if (project_config.language === "ts") {
      // console.log("typescript project");
      await oraPromise(
        setup_restApiforTypeScript_project(project_config.path, pm, pmInstall),
        {
          text: "Setuping typescript compiler",
          successText: chalk.green("Ts project enabled"),
        },
      );
      await oraPromise(updateTsconfig(project_config.path), {
        text: "Configuring tsconfig.json...",
        successText: chalk.green("tsconfig.json updated"),
      });
    }

    const devDeps = [];
    const dbDevDependenciesObj = db_deps_dev.find(
      (d) => d.db === project_config.db,
    );
    const dbDev_Deps = dbDevDependenciesObj?.deps ?? [];
    devDeps.push(...dbDev_Deps);
    await oraPromise(
      execa(pm, [pmInstall, "-D", ...devDeps, ...restApi_dev_deps], {
        cwd: project_config.path,
      }),
      {
        text: `Installing dev dependencies (${devDeps.length + restApi_dev_deps.length} packages)...`,
        successText: chalk.green("Dev dependencies installed"),
      },
    );

    if (project_config.db === "postgresql_prisma") {
      await oraPromise(
        execa("npx", ["prisma", "init"], {
          cwd: project_config.path,
        }),
        {
          text: `Setting up prisma ...`,
          successText: chalk.green("Prisma Setup done"),
        },
      );
    }

    // Step 6: Setup websockets if template includes websocket
    if (
      project_config.template.includes("websocket")
      && project_config.websocket_package
    ) {
      await oraPromise(
        setup_websockets_project(
          project_config.websocket_package,
          project_config.language,
          project_config.path,
          pm,
          pmInstall,
        ),
        {
          text: `Setting up ${project_config.websocket_package}...`,
          successText: chalk.green(
            `${project_config.websocket_package} configured`,
          ),
        },
      );
    }
    await oraPromise(
      updatePackageJson(project_config.path, project_config.language),
      {
        text: `Updating package.json with dev scripts...`,
        successText: chalk.green("Updated Package.json"),
      },
    );

    if (!project_config.skipGit) {
      try {
        await oraPromise(execa(`git`, ["init"], { cwd: project_config.path }), {
          successText: chalk.green("Initialized git repositary"),
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(
          chalk.yellow(
            `Warning: git initialization failed. Continuing without git repo. Reason: ${message}`,
          ),
        );
      }
    } else {
      console.log(
        chalk.yellow("⚠️  Skipping git initialization (--no-git flag)"),
      );
    }
    await oraPromise(
      write_rest_templates({
        ...project_config,
        path: project_config.path,
      }),
      {
        successText: chalk.green("Boilerplate code wrote successfully"),
      },
    );
    // Final success message
    showSuccessfulMessage(project_config);
    // Clear the current project path on success
    current_project_path = null;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(chalk.red(`Fatal: ${message}`));

    await cleanupProjectDirectoryOnFailure(project_config.path);
    // Clear the current project path after cleanup
    current_project_path = null;
    process.exit(1);
  }
}

export async function cleanupProjectDirectoryOnFailure(projectDirPath: string) {
  try {
    await removeProjectDirectory(projectDirPath);
    console.log(chalk.yellow(`Removed directory: ${projectDirPath}`));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(
      chalk.yellow(
        `Warning: failed to clean up project directory. Directory kept at "${projectDirPath}". Reason: ${message}`,
      ),
    );
  }
}

export async function generate_restApis_folder(project_path: string) {
  try {
    const srcDir = path.join(project_path, "src");
    fs.mkdirSync(srcDir, { recursive: true });
    const dirs = restApi_dirs.map((dir) => path.join("src", dir));
    for (const dir of dirs) {
      fs.mkdirSync(path.join(project_path, dir), { recursive: true });
    }
  } catch (error) {
    throw new Error(`Failed to create directories: ${error}`);
  }
}

export async function setup_restApiforTypeScript_project(
  project_path: string,
  pm: string = "npm",
  pmInstall: string = "install",
) {
  try {
    await execa(pm, [pmInstall, "-D", ...restApi_deps_typescript], {
      cwd: project_path,
    });
    await execa("npx", ["tsc", "--init"], { cwd: project_path });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Failed to set up the TypeScript project for rest_api template: ${message}`,
    );
  }
}

export async function setup_websockets_project(
  websocket_package: string,
  language: string,
  project_path: string,
  pm: string = "npm",
  pmInstall: string = "install",
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
      await execa(pm, [pmInstall, "-D", "@types/ws"], {
        cwd: project_path,
      });
    }
    await execa(pm, [pmInstall, ...dependencies], { cwd: project_path });
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "ExitPromptError") {
        console.log("\n⚠️ Process Cancelled by user");
        process.exit(0);
      }
    }
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to set up websocket project: ${message}`);
  }
}

process.on("SIGINT", async () => {
  console.log(chalk.yellow("\n⚠️ Process cancelled by user (Ctrl+C detected)"));

  if (current_project_path) {
    console.log(chalk.yellow("Cleaning up project directory..."));
    await cleanupProjectDirectoryOnFailure(current_project_path);
    current_project_path = null;
  }

  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log(chalk.yellow("\n⚠️ Process cancelled by user (Ctrl+D detected)"));
  if (current_project_path) {
    console.log(chalk.yellow("Cleaned Up Project Directory"));
    await cleanupProjectDirectoryOnFailure(current_project_path);
    current_project_path = null;
  }

  process.exit(0);
});
