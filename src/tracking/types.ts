export type EventName =
  | 'cta_click_ticket'
  | 'engagement_scroll'
  | 'content_view_artist';

export type TrafficCohort =
  | 'google_paid'
  | 'meta_paid'
  | 'organic';

export interface BaseEvent {
  event: EventName;
  timestamp: number;
  cohort: TrafficCohort;
}

export interface TicketClickEvent extends BaseEvent {
  event: 'cta_click_ticket';
  cta_location: string;
}

export interface ScrollEvent extends BaseEvent {
  event: 'engagement_scroll';
  scroll_percent: 50 | 75;
}

export interface ContentViewArtistEvent extends BaseEvent {
  event: 'content_view_artist';
  artist_id: string;
}

export type CoreEvent = TicketClickEvent | ScrollEvent;

/** All events dispatched to PostHog / gtag from this module */
export type TrackedEvent = CoreEvent | ContentViewArtistEvent;
