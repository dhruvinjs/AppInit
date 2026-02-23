# appinit

appinit is an opinionated, high-performance CLI tool designed to scaffold production-ready Node.js backends. It automates project structure, database setup, and runtime essentials so you can go from idea to initial commit quickly.

This repository is a monorepo containing the CLI and a web app that showcases or supports it.

## Features

- EJS dynamic templating for generated source files
- Interactive command flow with Inquirer
- Robust file operations with fs-extra
- Visual feedback with Ora spinners and Chalk
- Modular database injection (MongoDB/Mongoose, PostgreSQL with pg, PostgreSQL with Prisma)
- Production-ready base: Pino logging, env support, and security middleware

## Tech Stack

| Tool      | Purpose             | Why Not Alternatives                |
| --------- | ------------------- | ----------------------------------- |
| Commander | CLI framework       | Battle-tested, simple, does the job |
| Inquirer  | Interactive prompts | Industry standard                   |
| Ora       | Spinners            | Clean UX                            |
| Chalk     | Colors              | Universal                           |
| fs-extra  | File ops            | Better than native fs               |
| ejs       | Templates           | Simple interpolation                |

## Monorepo Structure

```text
APPINIT/
├── apps/
│   └── web/                # Frontend app
├── packages/
│   ├── cli/                # appinit CLI
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

## CLI Usage

### Interactive Mode (Default)

```bash
appinit my-app
```

This will prompt you to select template, language, database, and other options interactively.

### Quick Start with Preset Flags

Get started instantly with common configurations:

```bash
# TypeScript + REST API
appinit my-app --ts-rest

# TypeScript + WebSocket (Socket.io)
appinit my-app --ts-io

# JavaScript + REST API
appinit my-app --js-rest

# JavaScript + WebSocket (ws)
appinit my-app --js-ws
```

### Full Configuration with Flags

```bash
# With database and Docker
appinit my-app --ts-rest --db mongo --docker

# With custom package manager
appinit my-app --ts-io --db postgresql_prisma --pm pnpm

# Skip git initialization
appinit my-app --js-rest --no-git
```

### Available Flags

**Preset Shortcuts:**

- `--ts` → TypeScript + REST API
- `--js` → JavaScript + REST API
- `--ts-rest`, `--ts-ws`, `--ts-io` → TypeScript variants
- `--js-rest`, `--js-ws`, `--js-io` → JavaScript variants

**Configuration Flags:**

- `--template <type>` → `rest_api` or `websocket+rest_api`
- `--lang <lang>` → `js` or `ts`
- `--db <database>` → `none`, `mongo`, or `postgresql_prisma`
- `--ws <package>` → `ws` or `socket.io`
- `--docker` / `--no-docker` → Include/skip Dockerfile

**Utility Flags:**

- `--no-git` → Skip git initialization
- `--pm <manager>` → Package manager: `npm`, `pnpm`, or `yarn`

For detailed documentation, see [packages/cli/README.md](packages/cli/README.md).

## Generator Flow

1. Template selection: REST API or WebSocket + REST API
2. WebSocket engine (if selected): `socket.io` or `ws`
3. Language: TypeScript or JavaScript
4. Database: None, MongoDB (Mongoose), PostgreSQL (pg), PostgreSQL (Prisma)
5. Finalization: file ops, dependency install (always), git init

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
