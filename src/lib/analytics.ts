declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type GAEvent =
  | "contact_submit"
  | "membership_apply"
  | "waiver_signed"
  | "newsletter_signup"
  | "cta_click";

export function trackEvent(event: GAEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}
