import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Map of Traditions: Interactive Property Map",
  description:
    "Explore Traditions Field Club: the Riverside and Evergreen sporting clays courses, the 5-Stand, the pavilion, and the Little Salkehatchie River.",
  alternates: { canonical: "https://traditionsfieldclub.com/map" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
