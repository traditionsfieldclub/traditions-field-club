import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your First Visit to Traditions Field Club",
  description:
    "Your first visit to Traditions Field Club: a complimentary tour or Member for a Day at $100 per shooter, what a first visit looks like, what to bring, and common questions.",
  openGraph: {
    title: "Your First Visit to Traditions Field Club",
    description:
      "Your first visit to Traditions Field Club: a complimentary tour or Member for a Day at $100 per shooter, what a first visit looks like, what to bring, and common questions.",
    url: "https://traditionsfieldclub.com/first-time",
    images: [{ url: "https://traditionsfieldclub.com/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    title: "Your First Visit to Traditions Field Club",
    description:
      "A complimentary tour or Member for a Day at $100 per shooter. What a first visit looks like and what to bring.",
  },
  alternates: {
    canonical: "https://traditionsfieldclub.com/first-time",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
