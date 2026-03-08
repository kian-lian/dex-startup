# CI Quality Gates

This project enforces three required CI checks on pull requests:

- `quality`
- `security-sca`
- `security-secret`

## Gate Definitions

### 1) `quality`

Runs:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test:run`
- `pnpm build`
- `pnpm spellcheck`

Notes:

- CI injects `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` (repo secret if present, otherwise `test-project-id`) so build validation remains deterministic.

### 2) `security-sca`

Runs:

- `pnpm security:audit`

Current threshold: fail on `high` or `critical` dependency vulnerabilities.

### 3) `security-secret`

Runs secret scan with gitleaks using `.gitleaks.toml`.

## Local Reproduction

```bash
pnpm run ci
pnpm security:audit
pnpm security:secrets
```

## Failure Playbook

### `quality` fails

1. Run `pnpm run ci` locally.
2. Fix lint/type/test/build/spell issues.
3. Push a new commit and verify CI rerun.

### `security-sca` fails

1. Run `pnpm security:audit` locally.
2. Upgrade affected dependencies.
3. If no upgrade exists, open a tracked exception with mitigation and expiry.

### `security-secret` fails

1. Remove secret from code/history if real.
2. Rotate leaked secret immediately.
3. If false positive, update `.gitleaks.toml` with a narrowly scoped allowlist entry.
