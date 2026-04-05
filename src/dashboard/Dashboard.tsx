"use client";

import {
  trackContentViewArtist,
  trackScroll,
  trackTicketClick,
} from "@/tracking/events";
import { detectCohort } from "@/tracking/cohort";

const cohorts = [
  { id: "google_paid" as const, label: "Google paid", hint: "?gclid=1" },
  { id: "meta_paid" as const, label: "Meta paid", hint: "?fbclid=1" },
  { id: "organic" as const, label: "Organic", hint: "default" },
];

export function Dashboard() {
  const activeCohort = detectCohort();
  const insightUrl = process.env.NEXT_PUBLIC_POSTHOG_INTENT_INSIGHT_URL;

  return (
    <div className="mx-auto flex min-h-full max-w-4xl flex-col gap-10 px-6 py-12">
      <header className="space-y-2 border-b border-zinc-200 pb-8 dark:border-zinc-800">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          GMF Analytics System
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Intent → click
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Internal view for the north-star metric{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-900">
            intent_to_click_rate
          </code>
          . Wire PostHog using the env vars below, then open your saved funnel
          insight.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Metric (PostHog)
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Funnel: session had{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
              engagement_scroll
            </code>{" "}
            with{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
              scroll_percent = 75
            </code>
            , then{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-900">
              cta_click_ticket
            </code>{" "}
            in the same session. Rate = conversions ÷ scroll-75 sessions. See{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              docs/metrics.md
            </span>{" "}
            in the repository for the full definition.
          </p>
          {insightUrl ? (
            <a
              className="mt-4 inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              href={insightUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open PostHog insight
            </a>
          ) : (
            <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
              Set{" "}
              <code className="font-mono text-xs">
                NEXT_PUBLIC_POSTHOG_INTENT_INSIGHT_URL
              </code>{" "}
              to link this button to your saved funnel.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Traffic cohorts
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Detected from URL params on this page. Current:{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {activeCohort}
            </span>
          </p>
          <ul className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            {cohorts.map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-zinc-100 px-3 py-2 dark:border-zinc-900"
              >
                <span className="font-medium text-zinc-800 dark:text-zinc-200">
                  {c.label}
                </span>
                <code className="text-xs text-zinc-500">{c.hint}</code>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 p-6 dark:border-zinc-700 dark:bg-zinc-900/40">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Dev: fire core events
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Sends to PostHog (if configured) and gtag (if GA id is set).
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
            onClick={() => trackScroll(50)}
          >
            Scroll 50%
          </button>
          <button
            type="button"
            className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
            onClick={() => trackScroll(75)}
          >
            Scroll 75%
          </button>
          <button
            type="button"
            className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
            onClick={() => trackTicketClick("dashboard_dev")}
          >
            Ticket CTA
          </button>
          <button
            type="button"
            className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
            onClick={() => trackContentViewArtist("demo-artist")}
          >
            Artist view
          </button>
        </div>
      </section>
    </div>
  );
}
