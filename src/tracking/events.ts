import { detectCohort } from './cohort';
import { trackEvent } from './dispatcher';

function base() {
  return {
    timestamp: Date.now(),
    cohort: detectCohort()
  };
}

export function trackTicketClick(location: string) {
  trackEvent({
    event: 'cta_click_ticket',
    ...base(),
    cta_location: location
  });
}

export function trackScroll(percent: 50 | 75) {
  trackEvent({
    event: 'engagement_scroll',
    ...base(),
    scroll_percent: percent
  });
}
