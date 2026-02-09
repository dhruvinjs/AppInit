# Stack Forge

Stack Forge is an opinionated, high-performance CLI tool designed to scaffold production-ready Node.js backends. It automates project structure, database setup, and runtime essentials so you can go from idea to initial commit quickly.

This repository is a monorepo containing the CLI and a web app that showcases or supports it.

## Features

- EJS dynamic templating for generated source files
- Interactive command flow with Inquirer
- Robust file operations with fs-extra
- Visual feedback with Ora spinners and Chalk
- Modular database injection (MongoDB/Mongoose, PostgreSQL with pg, PostgreSQL with Prisma)
- Production-ready base: Pino logging, env support, and security middleware

## Tech Stack

| Tool          | Purpose             | Why Not Alternatives                |
| ------------- | ------------------- | ----------------------------------- |
| Commander     | CLI framework       | Battle-tested, simple, does the job |
| Inquirer      | Interactive prompts | Industry standard                   |
| Ora           | Spinners            | Clean UX                            |
| Chalk         | Colors              | Universal                           |
| fs-extra      | File ops            | Better than native fs               |
| ejs           | Templates           | Simple interpolation                |

## Monorepo Structure

```text
STACKFORGE/
├── apps/
│   └── web/                # Frontend app
├── packages/
│   ├── cli/                # Stack Forge CLI
│   │   ├── dist/            # Compiled output
│   │   └── src/
│   │       ├── actions/     # Side effects (git init, npm install, etc.)
│   │       ├── generator/   # Core generation engine
│   │       ├── templates/   # Template source files
│   │       ├── constants.ts # Dependency maps
│   │       ├── index.ts     # CLI entry
│   │       └── types.ts     # CLI types
│   ├── eslint-config/       # Shared lint config
│   ├── typescript-config/   # Shared tsconfig presets
│   └── ui/                  # Shared UI package
├── package.json             # Turbo + workspace scripts
└── pnpm-workspace.yaml
```

## Generator Flow

1. Template selection: REST API or WebSocket + REST API
2. WebSocket engine (if selected): `socket.io` or `ws`
3. Language: TypeScript or JavaScript
4. Database: None, MongoDB (Mongoose), PostgreSQL (pg), PostgreSQL (Prisma)
5. Finalization: file ops, dependency install, git init

## Local Development

Install deps (root):

```bash
pnpm install
```

Build CLI:

```bash
pnpm --filter ./packages/cli run build
```

Run CLI locally:

```bash
pnpm --filter ./packages/cli run dev
```

## Publishing the CLI

The CLI is published from `packages/cli`:

```bash
pnpm --filter ./packages/cli run build
pnpm --filter ./packages/cli publish --access public
```

Make sure `packages/cli/package.json` includes a unique `name`, a `bin` field, and a valid `version` before publishing.

## License

MIT. See [LICENSE](LICENSE).
