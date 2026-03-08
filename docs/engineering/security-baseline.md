# Security Baseline

## Scope

Phase 1 baseline covers:

- Dependency vulnerability scanning (`pnpm audit`)
- Secret scanning (`gitleaks`)

## Rules

- Never commit secrets. Use `.env.local` for local private values.
- Public environment keys (`NEXT_PUBLIC_*`) still require review before commit.
- Any discovered secret must be treated as compromised and rotated.

## Tooling

- SCA: `pnpm security:audit`
- Secret scanning: `pnpm security:secrets`
- CI workflow: `.github/workflows/ci.yml`
- Secret scanner config: `.gitleaks.toml`

## Exception Process

When a finding cannot be fixed immediately:

1. Create an issue with:
   - finding details
   - risk assessment
   - mitigation plan
   - expiry date
2. Add a minimal temporary exception (dependency pin or allowlist).
3. Remove exception before expiry.

## Incident Response (Secrets)

1. Revoke and rotate affected credentials.
2. Remove leaked values from repository and/or history as needed.
3. Confirm clean scan with `pnpm security:secrets`.
4. Document impact and prevention in post-incident notes.
