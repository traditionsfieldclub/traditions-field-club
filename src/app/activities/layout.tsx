import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities — Sporting Clays & 5-Stand",
  description:
    "Experience world-class sporting clays at Traditions Field Club in Ruffin, SC. Two courses — 15-station and 12-station — plus a 5-Stand facility coming soon. Certified instruction available for all skill levels.",
  openGraph: {
    title: "Activities — Sporting Clays & 5-Stand",
    description:
      "Experience world-class sporting clays at Traditions Field Club in Ruffin, SC. Two courses — 15-station and 12-station — plus a 5-Stand facility coming soon. Certified instruction available for all skill levels.",
    url: "https://traditionsfieldclub.com/activities",
    images: [{ url: "https://traditionsfieldclub.com/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    title: "Activities — Sporting Clays & 5-Stand",
    description:
      "Two sporting clays courses in Ruffin, SC — 5-Stand coming soon. Certified instruction for all levels.",
  },
  alternates: {
    canonical: "https://traditionsfieldclub.com/activities",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
