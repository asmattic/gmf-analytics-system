export {};

declare global {
  interface Window {
    clarity?: {
      (...args: unknown[]): void;
      q?: unknown[];
    };
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
