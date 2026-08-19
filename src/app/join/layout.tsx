import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join — Apply for Membership",
  description:
    "Apply to become a member of Traditions Field Club. Fill out our membership application for Prime or Corporate membership at our sporting clays club in South Carolina's Lowcountry.",
  openGraph: {
    title: "Join — Apply for Membership",
    description:
      "Fill out our membership application at Traditions Field Club. Sign up for Prime or Corporate membership at our sporting clays club in South Carolina's Lowcountry.",
    url: "https://traditionsfieldclub.com/join",
    images: [{ url: "https://traditionsfieldclub.com/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    title: "Join — Apply for Membership",
    description:
      "Sign up for Prime or Corporate membership at Traditions Field Club.",
  },
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://traditionsfieldclub.com/join",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
