import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for Traditions Field Club website and membership.",
  openGraph: {
    title: "Terms of Service",
    description:
      "Terms of service for Traditions Field Club website and membership.",
    url: "https://traditionsfieldclub.com/terms",
  },
  alternates: {
    canonical: "https://traditionsfieldclub.com/terms",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
