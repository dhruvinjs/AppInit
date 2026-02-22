import path from "node:path";
import { fileURLToPath } from "node:url";
import fsExtra from "fs-extra";
import ejs from "ejs";
import type { ProjectConfig } from "../types.js";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
export async function write_rest_templates(project_config: ProjectConfig) {
  const isTs = project_config.language === "ts";
  const template_base_path = give_template_file_path();
  const languageDir = isTs ? "typescript" : "javascript";
  //sourceRoot means it will go to the template/base then langDir=> js or ts
  const sourceRoot = path.join(template_base_path, languageDir);
  const projectRoot = project_config.path;

  const files = await listTemplateFiles(sourceRoot);
  for (const file of files) {
    if (!shouldRenderTemplate(file, isTs)) {
      continue;
    }
    const relativePath = path.relative(sourceRoot, file);
    const targetPath = mapTemplatePathToTarget(relativePath, projectRoot, isTs);
    await renderTemplateFile(file, targetPath, project_config);
  }

  await writeCommonFiles(template_base_path, projectRoot, project_config);
  if (project_config.Dockerfile) {
    const docker_template_root = give_dockerfile_path();
    const docker_template_path = path.join(
      docker_template_root,
      languageDir,
      "Dockerfile.ejs",
    );
    const docker_target_path = path.join(projectRoot, "Dockerfile");
    await write_dockerfile_template(
      project_config,
      docker_template_path,
      docker_target_path,
    );
  }
  if (project_config.template.includes("websocket")) {
    await write_websocket_index(
      project_config,
      template_base_path,
      projectRoot,
      isTs,
    );
  }
}
// dockerfile logic
async function write_dockerfile_template(
  project_config: ProjectConfig,
  docker_template_path: string,
  docker_target_path: string,
) {
  if (!project_config.Dockerfile) {
    throw new Error("Dockerfile is not selected in project_config");
  }
  await renderTemplateFile(
    docker_template_path,
    docker_target_path,
    project_config,
  );
}
//websocket file logic
async function write_websocket_index(
  project_config: ProjectConfig,
  templateBase: string,
  projectRoot: string,
  isTs: boolean,
) {
  if (!project_config.websocket_package) {
    throw new Error("websocket_package is required for websocket templates");
  }
  const languageDir = isTs ? "typescript" : "javascript";
  const ext = isTs ? "ts" : "js";
  const websocketIndex = path.join(
    templateBase,
    "websockets",
    project_config.websocket_package,
    languageDir,
    `index.${ext}.ejs`,
  );
  const targetIndex = isTs
    ? path.join(projectRoot, "src", `index.${ext}`)
    : path.join(projectRoot, `index.${ext}`);
  await renderTemplateFile(websocketIndex, targetIndex, project_config);
}

function get_template_package_root() {
  const pkg_json_path = require.resolve("@stackforge/templates/package.json");
  return path.dirname(pkg_json_path);
}
function give_template_file_path() {
  return path.join(get_template_package_root(), "base");
}
function give_dockerfile_path() {
  return path.join(get_template_package_root(), "features", "docker", "base");
}

async function listTemplateFiles(root: string) {
  const entries = await fsExtra.readdir(root, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(root, entry.name);
    // first full path of file will be taken and recursion has started in which basically
    // it will go to a dir and there is a nested dir it will go into that and basically will not stop
    // until it finds a file if file is found then push it into the file folder
    if (entry.isDirectory()) {
      files.push(...(await listTemplateFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".ejs")) {
      files.push(fullPath);
    }
  }
  return files;
}

function shouldRenderTemplate(filePath: string, isTs: boolean) {
  const fileName = path.basename(filePath);
  if (!isTs && fileName.endsWith(".ts.ejs")) {
    return false;
  }
  return true;
}
//function that removes the ejs and gives files extension according to language selected
function mapTemplatePathToTarget(
  relativePath: string,
  projectRoot: string,
  isTs: boolean,
) {
  const parts = relativePath.split(path.sep).map((part) => {
    if (part.startsWith(",")) {
      return `.${part.slice(1)}`;
    }
    if (part.endsWith(".ejs")) {
      return part.replace(/\.ejs$/, "");
    }
    return part;
  });

  let mapped = path.join(projectRoot, ...parts);
  if (!isTs && relativePath === path.join("src", "index.js.ejs")) {
    mapped = path.join(projectRoot, "index.js");
  }
  if (!isTs && mapped.endsWith(".ts")) {
    mapped = mapped.replace(/\.ts$/, ".js");
  }
  return mapped;
}
//actual code generation where the ejs will render the boilerplate file and write the logic using async await
async function renderTemplateFile(
  srcPath: string,
  destPath: string,
  data: ProjectConfig,
) {
  const templateData = { ...data, database: data.db };
  const rendered = await ejs.renderFile(srcPath, templateData, { async: true });
  await fsExtra.ensureDir(path.dirname(destPath));
  await fsExtra.writeFile(destPath, rendered, "utf8");
}

async function writeCommonFiles(
  templateBase: string,
  projectRoot: string,
  project_config: ProjectConfig,
) {
  const commonRoot = path.join(templateBase, "common");

  const gitignore = path.join(commonRoot, ",gitignore.ejs");
  await renderTemplateFile(
    gitignore,
    path.join(projectRoot, ".gitignore"),
    project_config,
  );

  const envFile = path.join(commonRoot, "env.ejs");
  await renderTemplateFile(
    envFile,
    path.join(projectRoot, ".env"),
    project_config,
  );
}
