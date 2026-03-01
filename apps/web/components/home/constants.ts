import type {
  FlagGroup,
  TemplateCardData,
  TemplatePreviewSource,
} from "@/components/home/types";

export const TEMPLATE_CARDS: TemplateCardData[] = [
  {
    name: "Express.js",
    type: "express",
    color: "bg-gradient-to-br from-zinc-900 via-blue-950/70 to-black",
    description:
      "The gold standard REST setup with health checks and centralized async error management.",
    tags: ["rest", "middleware", "ts/js"],
  },
  {
    name: "Native WebSockets",
    type: "websocket",
    color: "bg-gradient-to-br from-zinc-900 via-blue-900/60 to-black",
    description:
      "Ultra-lightweight realtime layer with ws for high-throughput messaging.",
    tags: ["ws", "tcp", "performance"],
  },
  {
    name: "Socket.io",
    type: "websocket",
    color: "bg-gradient-to-br from-zinc-900 via-blue-900/75 to-black",
    description:
      "Feature-rich realtime engine with rooms, events, and reconnect support.",
    tags: ["rooms", "events", "broadcast"],
  },
  {
    name: "Prisma + Postgres",
    type: "database",
    color: "bg-gradient-to-br from-zinc-900 via-blue-950/50 to-black",
    description:
      "Fully typed relational database flow with Prisma schema and generated client.",
    tags: ["sql", "orm", "prisma"],
  },
  {
    name: "MongoDB",
    type: "database",
    color: "bg-gradient-to-br from-zinc-900 via-blue-950/40 to-black",
    description:
      "NoSQL integration with Mongoose using clean model and connection setup.",
    tags: ["nosql", "mongoose", "schema"],
  },
  {
    name: "DevOps Bundle",
    type: "devops",
    color: "bg-gradient-to-br from-zinc-900 via-blue-950/35 to-black",
    description:
      "Optional Dockerfile and Git initialization for fast local-to-production flow.",
    tags: ["docker", "git"],
  },
];

export const FLAG_GROUPS: FlagGroup[] = [
  {
    title: "Preset Shortcuts",
    items: [
      { command: "--ts", description: "TypeScript + REST API" },
      { command: "--js", description: "JavaScript + REST API" },
      { command: "--ts-rest", description: "TypeScript + REST API" },
      { command: "--ts-ws", description: "TypeScript + WebSocket (ws)" },
      { command: "--ts-io", description: "TypeScript + WebSocket (socket.io)" },
      { command: "--js-rest", description: "JavaScript + REST API" },
      { command: "--js-ws", description: "JavaScript + WebSocket (ws)" },
      { command: "--js-io", description: "JavaScript + WebSocket (socket.io)" },
    ],
  },
  {
    title: "Granular Flags",
    items: [
      { command: "--template <type>", description: "rest_api | websocket+rest_api" },
      { command: "--lang <language>", description: "js | ts" },
      { command: "--db <database>", description: "none | mongo | postgresql_prisma" },
      { command: "--ws <package>", description: "ws | socket.io (only for websocket+rest_api)" },
      { command: "--docker / --no-docker", description: "Include or skip Dockerfile" },
      { command: "--pm <manager>", description: "npm | pnpm | yarn" },
      { command: "--no-git", description: "Skip git initialization" },
    ],
  },
];

export const FLAG_EXAMPLES = [
  "npx @dhruvinjs/appinit my-app --ts-rest",
  "npx @dhruvinjs/appinit my-app --ts-io --db mongo --docker",
  "npx @dhruvinjs/appinit my-app --js-ws --db none --no-git",
  "npx @dhruvinjs/appinit my-app --template rest_api --lang ts --db postgresql_prisma",
];

export const TEMPLATE_PREVIEW_SOURCES: TemplatePreviewSource[] = [
  {
    id: "rest-ts",
    label: "REST API (TS)",
    filePath: "packages/templates/base/typescript/src/index.ts.ejs",
    language: "ts",
  },
  {
    id: "rest-js",
    label: "REST API (JS)",
    filePath: "packages/templates/base/javascript/src/index.js.ejs",
    language: "js",
  },
  {
    id: "ws-ts",
    label: "WebSocket ws (TS)",
    filePath: "packages/templates/base/websockets/ws/typescript/index.ts.ejs",
    language: "ts",
  },
  {
    id: "io-ts",
    label: "Socket.io (TS)",
    filePath: "packages/templates/base/websockets/socket.io/typescript/index.ts.ejs",
    language: "ts",
  },
  {
    id: "db-ts",
    label: "DB Config (TS)",
    filePath: "packages/templates/base/typescript/src/config/db.ts.ejs",
    language: "ts",
  },
  {
    id: "docker-ts",
    label: "Dockerfile (TS)",
    filePath: "packages/templates/features/docker/base/typescript/Dockerfile.ejs",
    language: "dockerfile",
  },
];
