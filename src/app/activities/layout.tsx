import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities — Sporting Clays, 5-Stand & Archery",
  description:
    "Experience world-class sporting clays, 5-stand shooting, and archery at Traditions Field Club in Ruffin, SC. 12-station sporting clays course, dedicated 5-stand facility, and outdoor archery range. Certified instruction available for all skill levels.",
  openGraph: {
    title: "Activities — Sporting Clays, 5-Stand & Archery",
    description:
      "Experience world-class sporting clays, 5-stand shooting, and archery at Traditions Field Club in Ruffin, SC. 12-station sporting clays course, dedicated 5-stand facility, and outdoor archery range. Certified instruction available for all skill levels.",
    url: "https://traditionsfieldclub.com/activities",
  },
  alternates: {
    canonical: "https://traditionsfieldclub.com/activities",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
