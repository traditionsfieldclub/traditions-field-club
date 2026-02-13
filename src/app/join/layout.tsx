import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join — Apply for Membership",
  description:
    "Apply to become a member of Traditions Field Club. Fill out our membership application for individual, family, corporate, or exclusive membership at our sporting clays club in South Carolina's Lowcountry.",
  openGraph: {
    title: "Join — Apply for Membership",
    description:
      "Apply to become a member of Traditions Field Club. Fill out our membership application for individual, family, corporate, or exclusive membership at our sporting clays club in South Carolina's Lowcountry.",
    url: "https://traditionsfieldclub.com/join",
  },
  alternates: {
    canonical: "https://traditionsfieldclub.com/join",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
