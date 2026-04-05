# Metrics

## intent_to_click_rate

**Definition:** Among sessions that include at least one `engagement_scroll` event with `scroll_percent = 75`, the fraction that also include at least one `cta_click_ticket` in the **same session**.

\[
\text{intent\_to\_click\_rate} = \frac{\text{sessions with scroll 75\% and ticket CTA}}{\text{sessions with scroll 75\%}}
\]

PostHog supplies session boundaries when using its JavaScript SDK; funnel steps should use the event names `engagement_scroll` (filter `scroll_percent = 75`) and `cta_click_ticket`.

**Supporting properties** on all tracked events include `cohort` (`google_paid` | `meta_paid` | `organic`), `timestamp`, and event-specific fields such as `cta_location` and `scroll_percent`.

The optional `content_view_artist` event supports content funnels but is not part of this core ratio unless you extend the definition.
