import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities — Sporting Clays & 5-Stand",
  description:
    "Experience world-class sporting clays and 5-stand shooting at Traditions Field Club in Ruffin, SC. 12-station sporting clays course and a dedicated 5-stand facility. Certified instruction available for all skill levels.",
  openGraph: {
    title: "Activities — Sporting Clays & 5-Stand",
    description:
      "Experience world-class sporting clays and 5-stand shooting at Traditions Field Club in Ruffin, SC. 12-station sporting clays course and a dedicated 5-stand facility. Certified instruction available for all skill levels.",
    url: "https://traditionsfieldclub.com/activities",
    images: [{ url: "https://traditionsfieldclub.com/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    title: "Activities — Sporting Clays & 5-Stand",
    description:
      "12-station sporting clays and 5-stand in Ruffin, SC. Certified instruction for all levels.",
  },
  alternates: {
    canonical: "https://traditionsfieldclub.com/activities",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
