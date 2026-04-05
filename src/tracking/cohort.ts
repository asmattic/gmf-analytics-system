export function detectCohort() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('gclid')) return 'google_paid';
  if (params.get('fbclid')) return 'meta_paid';
  return 'organic';
}
