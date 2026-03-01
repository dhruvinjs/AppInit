# AppInit Web Docs (`apps/web`)

Frontend documentation site for `@dhruvinjs/appinit` inside the StackForge monorepo.

## Purpose

This app provides:

- Product landing page for AppInit
- CLI usage examples
- Canonical flag documentation aligned with `packages/cli/src/index.ts`

## Local Development

From repo root:

```bash
pnpm install
pnpm --filter web dev
```

Open `http://localhost:3000`.

## Build and Checks

```bash
pnpm --filter web lint
pnpm --filter web check-types
pnpm --filter web build
```

## CLI Flags (Source of Truth)

These are the currently supported flags in the CLI entrypoint (`packages/cli/src/index.ts`).

### Preset flags

- `--ts`
- `--js`
- `--ts-rest`
- `--ts-ws`
- `--ts-io`
- `--js-rest`
- `--js-ws`
- `--js-io`

### Granular flags

- `--template <rest_api|websocket+rest_api>`
- `--lang <js|ts>`
- `--db <none|mongo|postgresql_prisma>`
- `--ws <ws|socket.io>`
- `--docker` / `--no-docker`
- `--pm <npm|pnpm|yarn>`
- `--no-git`

### Example commands

```bash
npx @dhruvinjs/appinit my-app --ts-rest
npx @dhruvinjs/appinit my-app --ts-io --db mongo --docker
npx @dhruvinjs/appinit my-app --js-ws --db none --no-git
npx @dhruvinjs/appinit my-app --template rest_api --lang ts --db postgresql_prisma
```

## Frontend Structure

```text
apps/web/
├── app/                       # Next.js app router
│   └── page.tsx               # Page orchestrator
└── components/home/           # Landing page sections and home-specific UI
    ├── animated-icon.tsx
    ├── background-effects.tsx
    ├── constants.ts
    ├── flags-section.tsx
    ├── footer.tsx
    ├── hero-section.tsx
    ├── navbar.tsx
    ├── stacks-section.tsx
    ├── template-card.tsx
    └── types.ts
```
