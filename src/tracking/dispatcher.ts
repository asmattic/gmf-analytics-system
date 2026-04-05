export function trackEvent(event: any) {
  window.posthog?.capture(event.event, event);
  window.gtag?.('event', event.event, event);
}
