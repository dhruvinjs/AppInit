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
//preset configs are preseted means already decided
export interface PresetConfig {
  flag: boolean;
  template: "rest_api" | "websocket+rest_api";
  language: "js" | "ts";
  websocketPackage?: "socket.io" | "ws";
}
//flat config are the interfaces in which user decides from the scratch
export interface FlagConfig {
  template?: "rest_api" | "websocket+rest_api";
  language?: "js" | "ts";
  database?: "mongo" | "postgresql_prisma" | "none";
  websocket_package?: "socket.io" | "ws";
  docker?: boolean;
}
