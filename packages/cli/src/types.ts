export interface ProjectConfig {
  path: string;
  name: string;
  template: string;
  language: "js" | "ts";
  db: "mongo" | "postgresql_prisma" | "none";
  websocket_package?: "socket.io" | "ws";
  Dockerfile: Boolean;
  skipInstall?: boolean;
  skipGit?: boolean;
  packageManager?: "npm" | "pnpm" | "yarn";
}

export interface PresetConfig {
  flag: boolean;
  template: "rest_api" | "websocket+rest_api";
  language: "js" | "ts";
  websocketPackage?: "socket.io" | "ws";
}

export interface FlagConfig {
  template?: "rest_api" | "websocket+rest_api";
  language?: "js" | "ts";
  database?: "mongo" | "postgresql_prisma" | "none";
  websocket_package?: "socket.io" | "ws";
  docker?: boolean;
}
