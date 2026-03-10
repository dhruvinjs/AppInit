# @dhruvinjs/appinit

Express backend starter with optional WebSocket, DB, and Docker support.

This package creates an Express-based backend starter with optional WebSocket support (`ws` or `socket.io`), optional DB setup (`mongo` or `postgresql_prisma`), and optional Dockerfile generation.

## Install and run

```bash
npx @dhruvinjs/appinit my-app
```

You can also run without a name and choose it in prompts:

```bash
npx @dhruvinjs/appinit
```

or install globally:

```bash
npm i -g @dhruvinjs/appinit
appinit my-app
```

Global command also supports no name:

```bash
appinit
```

## What this CLI actually does

Source entrypoint: `src/index.ts`.

1. Parses flags with `commander`.
2. Prompts with `inquirer` for missing options.
3. Validates project name/path safety.
4. Creates project directory and runs package-manager init.
5. Installs runtime dependencies.
6. Installs dev dependencies (and TypeScript setup if selected).
7. Runs `npx prisma init` for PostgreSQL + Prisma.
8. Optionally installs `ws` or `socket.io`.
9. Renders EJS templates from `appinit-templates` package into your new project.
10. Optionally initializes git.

Core implementation files:

- `src/index.ts`: CLI flags, prompts, and config assembly.
- `src/generator/shell.ts`: project setup flow and command execution.
- `src/generator/template_engine.ts`: template rendering and file mapping.
- `src/utils/utils.ts`: safety checks, package.json/tsconfig updates, cleanup.
- `src/constants.ts`: dependency lists and allowed options.

## Templates and publishing model

This CLI resolves templates at runtime from the separate package `appinit-templates`:

- `template_engine.ts` uses `require.resolve("appinit-templates/package.json")`.
- Because of this, `appinit-templates` must be available when users install this CLI.

## Commands this CLI runs on your machine

Depending on options, it may run:

- `<pm> init` (or `npm init -y`)
- `<pm> pkg set name=<project-name>`
- `<pm> install ...`
- `<pm> install -D ...`
- `npx tsc --init` (TypeScript path)
- `npx prisma init` (PostgreSQL + Prisma path)
- `git init` (unless `--no-git`)

It also writes files into the generated project folder and may remove that folder on setup failure/cancel.

## Flags

Preset flags:

- `--ts`, `--js`
- `--ts-rest`, `--js-rest`
- `--ts-ws`, `--js-ws`
- `--ts-io`, `--js-io`

Granular flags:

- `--template <rest_api|websocket+rest_api>`
- `--lang <js|ts>`
- `--db <none|mongo|postgresql_prisma>`
- `--ws <ws|socket.io>`
- `--docker` / `--no-docker`
- `--pm <npm|pnpm|yarn>`
- `--no-git`

## Dependencies and why they exist

Runtime dependencies in this package:

- `commander`: CLI argument parsing.
- `inquirer`: interactive prompts.
- `execa`: safe process spawning for package manager/git/prisma commands.
- `ora`: spinner/progress output.
- `chalk`: colored terminal output.
- `fs-extra`: file operations for templates/config updates/cleanup.
- `ejs`: template rendering engine.
- `unique-names-generator`: default project name generation.
- `appinit-templates`: source of boilerplate templates.

Direct dependencies currently listed but not used directly by CLI source:

- `express`
- `cors`
- `helmet`
- `jsonwebtoken`

These libraries are generated-project dependencies. They are installed into created apps from `src/constants.ts`, not used as runtime imports by this CLI itself.

## Trust and safety notes

- No telemetry/analytics calls are implemented in this package.
- It executes local shell commands and installs packages from your configured registry.
- It validates project names and blocks path traversal-style names.
- On failure or Ctrl+C/Ctrl+D, it tries to clean up the generated directory.
- It warns when git/docker tools are missing (generation still continues where possible).

## Known behavior to be aware of

- Environment check currently always verifies `npm` and `npx` are present, even if you choose `pnpm` or `yarn`.
- Template resolution requires the `appinit-templates` package to be installable.

## Develop locally

```bash
pnpm --filter @dhruvinjs/appinit run build
pnpm --filter @dhruvinjs/appinit run dev
```

## License

MIT
