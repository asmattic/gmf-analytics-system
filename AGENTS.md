# AGENTS.md — GMF Analytics System

Use this file as the durable handoff for humans and coding agents (along with [docs/ROADMAP.md](docs/ROADMAP.md) and [docs/INTENT_REVIEW_AND_PRIORITIES.md](docs/INTENT_REVIEW_AND_PRIORITIES.md)).

## Intent

**GMF Analytics System** is an intent-driven UX optimization product. The north-star metric is **`intent_to_click_rate`**, defined as a PostHog session funnel in [docs/metrics.md](docs/metrics.md).

Core inputs: ticket CTA clicks, scroll 50% / 75%, and paid/organic **cohort** from URL parameters (`gclid`, `fbclid`).

## Commands (pnpm)

```bash
pnpm install    # installs deps; runs Husky prepare
pnpm dev        # Next.js dev server
pnpm build      # production build
pnpm start      # production server
pnpm lint       # ESLint
```

## Environment variables

Copy `.env.example` to `.env.local`. At minimum set `NEXT_PUBLIC_POSTHOG_KEY` for browser capture. Optional: `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_POSTHOG_INTENT_INSIGHT_URL`.

## Code map

- `src/app/` — App Router entry (`layout.tsx` wraps `AnalyticsProvider`)
- `src/components/AnalyticsProvider.tsx` — client-only PostHog + optional gtag bootstrap
- `src/tracking/` — event types, cohort detection, `trackEvent` dispatcher (`posthog-js` + `window.gtag`)
- `src/dashboard/Dashboard.tsx` — internal dashboard UI and dev event triggers

## Conventional commits and commitlint

Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/), for example:

- `feat: add scroll tracking`
- `fix: guard dispatcher on server`
- `docs: update roadmap`
- `chore: bump dependencies`
- `ci: add workflow`

Husky runs `commitlint` on `commit-msg`. Scope is optional: `feat(tracking): ...`.

## Git workflow (mandatory)

**Pull request → merge → delete branch.** Full steps: [docs/GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md).

Summary:

1. Branch from updated `main`.
2. Push branch, open PR, wait for CI.
3. Merge to `main` (prefer squash merge for linear history).
4. Delete the remote branch and local branch, then `git pull` on `main`.

## Where specs live

- [docs/03-tight-core.md](docs/03-tight-core.md) — tight core inputs and metric name
- [docs/metrics.md](docs/metrics.md) — precise `intent_to_click_rate` definition
- [docs/ROADMAP.md](docs/ROADMAP.md) — backlog and event catalog
- [docs/INTENT_REVIEW_AND_PRIORITIES.md](docs/INTENT_REVIEW_AND_PRIORITIES.md) — latest review findings and strict next-run implementation order
