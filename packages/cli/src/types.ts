export interface ProjectConfig {
  path: string;
  name: string;
  template: string;
  language: "js" | "ts";
  db: "mongo" | "postgresql" | "postgresql_prisma" | "none";
  websocket_package?: "socket.io" | "ws";
}
