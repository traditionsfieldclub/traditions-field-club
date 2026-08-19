import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Waiver — Liability Release Form",
  description:
    "Complete the Traditions Field Club liability waiver and release form before your visit. Required for all participants in sporting clays activities.",
  openGraph: {
    title: "Sign Waiver — Liability Release Form",
    description:
      "Complete the Traditions Field Club liability waiver and release form before your visit. Required for all participants in sporting clays activities.",
    url: "https://traditionsfieldclub.com/waiver",
    images: [{ url: "https://traditionsfieldclub.com/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    title: "Sign Waiver — Liability Release Form",
    description:
      "Complete the Traditions Field Club liability waiver and release form before your visit.",
  },
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://traditionsfieldclub.com/waiver",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
