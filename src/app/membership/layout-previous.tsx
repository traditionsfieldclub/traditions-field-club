import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership — Individual, Family, Corporate & Exclusive Plans",
  description:
    "Join Traditions Field Club with membership options for individuals, families, and businesses. 7-day access from sunrise to sunset, member events, and guest passes. Located in South Carolina's Lowcountry.",
  openGraph: {
    title: "Membership — Individual, Family, Corporate & Exclusive Plans",
    description:
      "Join Traditions Field Club with membership options for individuals, families, and businesses. 7-day access from sunrise to sunset, member events, and guest passes. Located in South Carolina's Lowcountry.",
    url: "https://traditionsfieldclub.com/membership",
    images: [{ url: "https://traditionsfieldclub.com/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    title: "Membership — Individual, Family, Corporate & Exclusive Plans",
    description:
      "Join Traditions Field Club. 7-day access, member events, guest passes — Lowcountry sporting clays, 5-stand.",
  },
  alternates: {
    canonical: "https://traditionsfieldclub.com/membership",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
