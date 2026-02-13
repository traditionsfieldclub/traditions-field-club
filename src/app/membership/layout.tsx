import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership — Individual, Family, Corporate & Exclusive Plans",
  description:
    "Join Traditions Field Club with membership options for individuals, families, and businesses. 7-day access from sunrise to sunset, clay credits, member events, guest passes, and volunteer perks. Located in South Carolina's Lowcountry.",
  openGraph: {
    title: "Membership — Individual, Family, Corporate & Exclusive Plans",
    description:
      "Join Traditions Field Club with membership options for individuals, families, and businesses. 7-day access from sunrise to sunset, clay credits, member events, guest passes, and volunteer perks. Located in South Carolina's Lowcountry.",
    url: "https://traditionsfieldclub.com/membership",
  },
  alternates: {
    canonical: "https://traditionsfieldclub.com/membership",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
