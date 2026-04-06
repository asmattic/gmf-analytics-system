# GMF Analytics System

Intent-driven UX optimization system. North-star metric: **`intent_to_click_rate`** (see [docs/metrics.md](docs/metrics.md)).

## Stack

- [Next.js](https://nextjs.org/) (App Router), TypeScript, Tailwind CSS
- [PostHog](https://posthog.com/) + optional Google Analytics (gtag), Microsoft Clarity, and Sentry via `src/components/AnalyticsProvider.tsx`

## Setup

```bash
pnpm install
cp .env.example .env.local
```

Fill in `NEXT_PUBLIC_POSTHOG_KEY` (and optional vars from `.env.example`, including Clarity and Sentry if used). Then:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `pnpm dev`     | Development server       |
| `pnpm build`   | Production build         |
| `pnpm start`   | Run production server    |
| `pnpm lint`    | ESLint                   |

## Documentation

- [AGENTS.md](AGENTS.md) — context for contributors and coding agents
- [docs/ROADMAP.md](docs/ROADMAP.md) — backlog and status
- [docs/GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md) — PR → merge → delete branch

## License

Private project (`private: true` in package.json).
