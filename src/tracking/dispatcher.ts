import posthog from "posthog-js";
import type { TrackedEvent } from "./types";

export function trackEvent(tracked: TrackedEvent): void {
  if (typeof window === "undefined") {
    return;
  }

  const { event: eventName, ...payload } = tracked;

  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.capture(eventName, payload);
  }

  window.gtag?.("event", eventName, payload);
}
