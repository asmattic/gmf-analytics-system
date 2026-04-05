import type { TrafficCohort } from './types';

export function detectCohort(): TrafficCohort {
  if (typeof window === 'undefined') {
    return 'organic';
  }
  const params = new URLSearchParams(window.location.search);
  if (params.get('gclid')) return 'google_paid';
  if (params.get('fbclid')) return 'meta_paid';
  return 'organic';
}
