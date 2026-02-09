export const restApi_deps = [
  "express",
  "dotenv",
  "cors",
  "jsonwebtoken",
  "helmet",
  "pino",
  "pino-http", //middleware for the http
  "zod",
];
export const restApi_dev_deps = ["nodemon", "eslint", "prettier"];
export const restApi_deps_typescript = [
  "@types/express",
  "@types/jsonwebtoken",
  "@types/node",
  "typescript",
  "@types/cors",
  "ts-node",
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
  { db: "postgresql", deps: ["pg@^8.11.0", "pg-hstore@^2.3.4"] },
  { db: "postgresql_prisma", deps: ["@prisma/client@^6.0.0"] },
];

export const db_deps_dev = [
  { db: "none", deps: [] },
  { db: "mongo", deps: [] },
  { db: "postgresql", deps: [] },
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
