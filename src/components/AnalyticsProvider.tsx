"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] };

function initGoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!gaId) {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", gaId);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);
}

function initMicrosoftClarity() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  if (!clarityId || window.clarity) {
    return;
  }

  const clarityFn: ClarityFn = (...args: unknown[]) => {
    clarityFn.q = clarityFn.q ?? [];
    clarityFn.q.push(args);
  };

  window.clarity = clarityFn;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${clarityId}`;
  document.head.appendChild(script);
}

function initSentryBrowser() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) {
    return;
  }

  Sentry.init({
    dsn,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ?? process.env.NODE_ENV,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
  });
}

export function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host =
      process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
    if (key) {
      posthog.init(key, {
        api_host: host,
        person_profiles: "identified_only",
      });
    }

    initGoogleAnalytics();
    initMicrosoftClarity();
    initSentryBrowser();
  }, []);

  return children;
}
