# Repository Guidelines

## Project Structure & Module Organization
This repository follows a **Feature-First** architecture.

- `src/app/`: Next.js App Router entry layer (pages, layouts, route files).
- `src/features/`: Business domains (`swap`, `token`, `wallet`) with local types/constants and feature APIs.
- `src/shared/`: Cross-feature infrastructure (`config/`, `providers/`, `lib/`).
- `src/test/`: Shared test setup.
- `public/`: Static assets.
- `docs/engineering/`: CI and security process documentation.

Keep business logic in feature modules and move reusable cross-feature code to `src/shared`. Avoid deep cross-feature imports.

## Build, Test, and Development Commands
- `pnpm dev`: Start local development server.
- `pnpm build` / `pnpm start`: Build and run production bundle.
- `pnpm lint`: Run Biome checks.
- `pnpm typecheck`: Run TypeScript checks (`tsc --noEmit`).
- `pnpm test` / `pnpm test:run`: Run Vitest (watch / one-shot).
- `pnpm test:coverage`: Generate coverage report.
- `pnpm run ci`: Run full local quality gate.
- `pnpm security:audit`: Scan dependencies for high+ vulnerabilities.
- `pnpm security:secrets`: Scan repository for hardcoded secrets.
- `pnpm analyze`: Bundle size analysis (opens browser report).
- `pnpm changeset`: Add a changeset entry for version/changelog tracking.

## Coding Style & Naming Conventions
- Language: TypeScript with `strict` mode.
- Indentation: 2 spaces (`.editorconfig` + Biome).
- Naming:
  - files/directories: `kebab-case`
  - components/types: `PascalCase`
  - hooks: `useCamelCase`
  - constants: `UPPER_SNAKE_CASE`
- Formatting/linting: Biome (`pnpm lint`, `pnpm format`).
- Prefer Server Components; add `"use client"` only when browser-only behavior is required.

## Testing Guidelines
- Framework: Vitest + Testing Library (`jsdom`).
- Test files: `*.test.ts` / `*.test.tsx` (or `*.spec.ts(x)`).
- Place tests close to modules (e.g., `src/shared/lib/__tests__/address.test.ts`).
- Before PR: run `pnpm test:run` (and `pnpm test:coverage` for larger changes).

## Commit & Pull Request Guidelines
- Commit format: Conventional Commits (e.g., `feat(wallet): add connect state`).
- Allowed commit types are enforced by commitlint; subject max length is 72.
- PRs should be focused and include:
  - clear summary and motivation
  - linked issue/task
  - validation evidence (commands/logs)
  - screenshots/GIFs for UI changes

## Security & Configuration Tips
- Never commit secrets; use `.env.local`.
- Read env values through `src/shared/config/env.ts`.
- Keep `main` protected: require PR, at least one approval, and passing checks (`quality`, `security-sca`, `security-secret`).
