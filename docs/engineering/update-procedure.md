# Update Procedure

This document describes the exact steps to record a new version update for this project and explains when deployment happens.

## Scope

Use this procedure when:

- a change should appear in version history
- a change should be included in the next release notes
- you want to understand whether `pnpm changeset` is enough

## Important Rule

Running `pnpm changeset` is only the first step.

It does **not** directly:

- update `package.json` version
- generate the final `CHANGELOG.md`
- deploy production

## Step-by-Step

### 1. Finish the change on a feature branch

Complete the code, tests, and documentation updates for the change.

Recommended local checks:

```bash
pnpm lint
pnpm typecheck
pnpm test:run
pnpm build
pnpm spellcheck
```

### 2. Decide whether this change needs a changeset

Add a changeset if the change is release-worthy, for example:

- user-visible features
- behavior fixes
- workflow or config updates worth recording

Usually skip it for:

- typo-only docs changes
- refactors with no user-facing impact
- test-only changes

### 3. Generate the changeset

Run:

```bash
pnpm changeset
```

Then choose the version bump type:

- `patch`: fixes, small improvements, safe config changes
- `minor`: new backward-compatible functionality
- `major`: breaking changes

Commit the generated file under `.changeset/`.

### 4. Open a pull request

Include the code change and the generated changeset file in the same PR.

Before merge, make sure the required checks pass:

- `quality`
- `security-sca`
- `security-secret`

These checks are defined in `.github/workflows/ci.yml`.

### 5. Merge the pull request into `main`

After merge, GitHub Actions runs `.github/workflows/release.yml`.

If `main` contains one or more pending changesets, Changesets will create or update a PR with this title:

```text
chore(release): version packages
```

### 6. Review and merge the version PR

This PR is the step that actually records the version update.

When merged, it updates:

- `package.json` version
- `CHANGELOG.md`
- consumed `.changeset/*.md` files

This is the point where the new version is formally recorded in git history.

### 7. Deployment happens after version recording

Deployment is separate from Changesets.

Current repository automation only records versions. It does not deploy production by itself.

Deployment behavior depends on your hosting setup:

- If your platform automatically deploys from `main` after merge, deployment happens after the relevant merge to `main`.
- If your platform does not auto-deploy, you must manually deploy the latest `main` commit after the version PR is merged.

For this project, production deployment also requires valid environment configuration, especially:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
```

### 8. Verify production after deploy

After deployment, verify at least:

- the app loads correctly
- wallet connection still works
- the target feature or fix behaves as expected
- no required env values are missing

## Short Answer

If you ask, "Do I only need to run `pnpm changeset` to update and deploy?"

The answer is:

1. No, `pnpm changeset` only creates the pending release record.
2. You still need to merge the normal PR.
3. You still need to merge the generated version PR.
4. Deployment is a separate step unless your hosting platform auto-deploys from `main`.
