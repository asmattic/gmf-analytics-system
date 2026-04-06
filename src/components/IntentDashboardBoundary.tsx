"use client";

import * as Sentry from "@sentry/nextjs";

export function IntentDashboardBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sentry.ErrorBoundary
      beforeCapture={(scope, _error, _componentStack) => {
        void _error;
        void _componentStack;
        scope.setTag("surface", "intent_dashboard");
        scope.setTag("metric", "intent_to_click_rate");
      }}
      fallback={({ error, resetError, eventId }) => (
        <div className="mx-auto flex min-h-full max-w-2xl flex-col gap-6 px-6 py-16">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/60 dark:bg-red-950/40">
            <h1 className="text-xl font-semibold text-red-900 dark:text-red-100">
              Dashboard error
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-red-800/90 dark:text-red-200/90">
              Something went wrong while rendering the intent dashboard. Real errors are
              sent to Sentry when{" "}
              <code className="rounded bg-red-100 px-1 py-0.5 text-xs dark:bg-red-900/60">
                NEXT_PUBLIC_SENTRY_DSN
              </code>{" "}
              is set.
            </p>
            {eventId ? (
              <p className="mt-3 text-xs text-red-800/80 dark:text-red-200/80">
                Sentry event id:{" "}
                <code className="rounded bg-red-100 px-1 py-0.5 dark:bg-red-900/60">
                  {eventId}
                </code>
              </p>
            ) : null}
            {error instanceof Error ? (
              <pre className="mt-4 max-h-40 overflow-auto rounded-lg bg-red-100/70 p-3 text-xs text-red-950 dark:bg-red-950/60 dark:text-red-50">
                {error.message}
              </pre>
            ) : null}
            <button
              type="button"
              className="mt-6 rounded-full border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-900 shadow-sm hover:bg-red-50 dark:border-red-800 dark:bg-red-950 dark:text-red-100 dark:hover:bg-red-900/60"
              onClick={resetError}
            >
              Try again
            </button>
          </div>
        </div>
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}
