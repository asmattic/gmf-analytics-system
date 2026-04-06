# Roadmap and implementation checklist

GMF Analytics System optimizes UX using the core metric **`intent_to_click_rate`**. Spec: [03-tight-core.md](./03-tight-core.md). Metric definition: [metrics.md](./metrics.md).

## Environment

| Variable | Required | Purpose |
| -------- | -------- | ------- |
| `NEXT_PUBLIC_POSTHOG_KEY` | Recommended | PostHog project API key (browser) |
| `NEXT_PUBLIC_POSTHOG_HOST` | Optional | PostHog API host (default `https://us.i.posthog.com`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 measurement ID for gtag |
| `NEXT_PUBLIC_POSTHOG_INTENT_INSIGHT_URL` | Optional | Saved PostHog insight URL for the dashboard button |

See root `.env.example`.

## Events → analytics

| Event name | When | Key properties |
| ---------- | ---- | -------------- |
| `cta_click_ticket` | Ticket CTA click | `cta_location`, `cohort`, `timestamp` |
| `engagement_scroll` | Scroll milestone | `scroll_percent` (50 \| 75), `cohort`, `timestamp` |
| `content_view_artist` | Artist content view | `artist_id`, `cohort`, `timestamp` |

PostHog sessionization applies to funnel analysis for `intent_to_click_rate`.

## Checklist (implementation status)

- [x] Next.js App Router + TypeScript + Tailwind (`pnpm`)
- [x] Tracking module with typed events, SSR-safe dispatcher, cohort detection
- [x] PostHog init + optional gtag (`AnalyticsProvider`)
- [x] Metric documented; dashboard explains funnel + dev event buttons
- [x] CI: lint + build on PR/push
- [x] Commitlint + Husky
- [x] `AGENTS.md`, this roadmap, git workflow doc
- [ ] Connect production deploy (e.g. Vercel) to `main`
- [ ] Create and link a PostHog funnel insight URL via `NEXT_PUBLIC_POSTHOG_INTENT_INSIGHT_URL`

## Shipping process

Follow [GIT_WORKFLOW.md](./GIT_WORKFLOW.md): **PR → merge → delete branch**.

## Next run priority order

Execution order for the next implementation run is documented in [INTENT_REVIEW_AND_PRIORITIES.md](./INTENT_REVIEW_AND_PRIORITIES.md). Follow the numbered sequence under **Next-run implementation order (strict)**.
