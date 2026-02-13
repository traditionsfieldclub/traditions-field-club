interface TurnstileWidget {
  reset: (container?: HTMLElement | string) => void;
  getResponse: (container?: HTMLElement | string) => string | undefined;
  remove: (container?: HTMLElement | string) => void;
}

interface Window {
  turnstile?: TurnstileWidget;
  onTurnstileCallback?: (token: string) => void;
}
