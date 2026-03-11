# Versioning Workflow

This project uses Changesets to record version updates for the application.

For the full operational checklist, see `docs/engineering/update-procedure.md`.

## Goal

- Keep version history explicit in git.
- Generate a reviewable version PR instead of editing `package.json` manually.
- Let changelog content come from small per-PR changeset files.

## When to Add a Changeset

Add a changeset for changes that should appear in release history:

- user-visible feature updates
- bug fixes that affect runtime behavior
- configuration or workflow changes worth tracking in release notes

Usually skip a changeset for:

- typo-only documentation updates
- refactors with no user-facing impact
- test-only changes

## How to Add One

Run:

```bash
pnpm changeset
```

Then choose the bump type:

- `patch`: fixes, small improvements, safe config changes
- `minor`: new backward-compatible functionality
- `major`: breaking changes

Commit the generated markdown file under `.changeset/`.

## What Happens After Merge

1. A PR with one or more pending changesets is merged into `main`.
2. GitHub Actions runs `.github/workflows/release.yml`.
3. Changesets creates or updates a `chore(release): version packages` PR.
4. That PR updates:
   - `package.json` version
   - `CHANGELOG.md`
   - consumed `.changeset/*.md` files
5. Merge the version PR to record the new release in git history.

## Notes

- This workflow only records versions. It does not publish packages or deploy.
- If there are no pending changesets on `main`, the workflow does nothing.
- The GitHub repo slug in `.changeset/config.json` must stay accurate or changelog links will be wrong.
