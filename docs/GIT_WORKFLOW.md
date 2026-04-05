# Git workflow

All changes ship through **pull requests** on `main`. After merge, **delete the branch** (remote and local).

## Branch flow

1. `git checkout main && git pull origin main`
2. `git checkout -b <type>/<short-description>`  
   Examples: `feat/posthog-init`, `fix/tracking-types`, `docs/roadmap-update`
3. Make commits using [Conventional Commits](https://www.conventionalcommits.org/) (enforced by commitlint):
   - `feat:` new behavior
   - `fix:` bug fix
   - `docs:` documentation only
   - `chore:` tooling, config, deps
   - `refactor:`, `test:`, `ci:` as needed
4. `git push -u origin <branch>` and open a **PR** on GitHub.
5. Wait for **CI** (lint + build) to pass and get review as needed.
6. **Merge** the PR into `main` (this project uses **squash merge** for a linear history unless you agree otherwise as a team).
7. **Delete the branch**: use the GitHub PR UI, or `git push origin --delete <branch>`, and locally `git branch -d <branch>`.
8. Update local `main`: `git checkout main && git pull origin main`.

## Push to live

Production deploys are not configured in this repository by default. When you connect a host (for example **Vercel** with the GitHub integration), merges to `main` typically trigger a production deployment automatically.
