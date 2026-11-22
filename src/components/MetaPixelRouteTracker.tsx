"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[];
      loaded: boolean;
      version: string;
      push: (...args: unknown[]) => void;
    };
    _fbq?: Window["fbq"];
  }
}

export default function MetaPixelRouteTracker() {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (typeof window.fbq !== "function") return;
    window.fbq("track", "PageView");
  }, [pathname]);

  return null;
}
