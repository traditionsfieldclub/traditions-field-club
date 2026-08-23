import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership — Prime & Corporate Plans",
  description:
    "Join Traditions Field Club with membership options for individuals, families, and businesses. 7-day access from sunrise to sunset and member events. Located in South Carolina's Lowcountry.",
  openGraph: {
    title: "Membership — Prime & Corporate Plans",
    description:
      "Join Traditions Field Club with membership options for individuals, families, and businesses. 7-day access from sunrise to sunset and member events. Located in South Carolina's Lowcountry.",
    url: "https://traditionsfieldclub.com/membership",
    images: [{ url: "https://traditionsfieldclub.com/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    title: "Membership — Prime & Corporate Plans",
    description:
      "Join Traditions Field Club. 7-day access, member events — Lowcountry sporting clays.",
  },
  alternates: {
    canonical: "https://traditionsfieldclub.com/membership",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
