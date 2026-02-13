import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "First Time Visitors — What to Know Before You Visit",
  description:
    "Planning your first visit to Traditions Field Club? Everything you need to know about what to bring, safety requirements, what to expect, and how to get started with sporting clays, 5-stand, and archery in South Carolina.",
  openGraph: {
    title: "First Time Visitors — What to Know Before You Visit",
    description:
      "Planning your first visit to Traditions Field Club? Everything you need to know about what to bring, safety requirements, what to expect, and how to get started with sporting clays, 5-stand, and archery in South Carolina.",
    url: "https://traditionsfieldclub.com/first-time",
  },
  alternates: {
    canonical: "https://traditionsfieldclub.com/first-time",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
