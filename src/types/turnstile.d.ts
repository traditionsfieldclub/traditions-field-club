interface TurnstileRenderOptions {
  sitekey: string;
  callback?: (token: string) => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact";
}

interface TurnstileWidget {
  render: (container: HTMLElement | string, options: TurnstileRenderOptions) => string;
  reset: (widgetId?: string | HTMLElement) => void;
  getResponse: (widgetId?: string | HTMLElement) => string | undefined;
  remove: (widgetId?: string | HTMLElement) => void;
}

interface Window {
  turnstile?: TurnstileWidget;
}
