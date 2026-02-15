export const restApi_deps = [
  "express",
  "dotenv",
  "cors",
  "jsonwebtoken",
  "helmet",
  "pino",
  "pino-http", //middleware for the http
  "zod",
  "pino-pretty",
];
export const restApi_dev_deps = [
  "nodemon",
  "eslint@^9.0.0", // Force version 9
  "@eslint/js@^9.0.0", // Match with eslint
  "prettier",
  "globals@^15.0.0", // Helps ESLint understand Node/Browser variables
];
export const restApi_deps_typescript = [
  "@types/express",
  "@types/jsonwebtoken",
  "@types/node",
  "typescript",
  "@types/cors",
  "ts-node",
  "typescript-eslint@^8.0.0", // Works perfectly with v9
];
export const websocket_project_deps = [
  {
    package: "ws",
    deps: ["ws"],
  },
  {
    package: "socket.io",
    deps: ["socket.io"],
  },
];
export const db_deps = [
  {
    db: "none",
    deps: [],
  },
  { db: "mongo", deps: ["mongoose"] },
  { db: "postgresql_prisma", deps: ["@prisma/client@^6.0.0"] },
];

export const db_deps_dev = [
  { db: "none", deps: [] },
  { db: "mongo", deps: [] },
  { db: "postgresql_prisma", deps: ["prisma@^6.0.0"] },
];

export const restApi_dirs = [
  "controller",
  "utils",
  "models",
  "routes",
  "services",
  "config",
];
export const project_path = "/home/dhruvin/Projects/";
