import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Traditions Field Club. Learn how we collect, use, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy",
    description:
      "Privacy policy for Traditions Field Club. Learn how we collect, use, and protect your personal information.",
    url: "https://traditionsfieldclub.com/privacy-policy",
    images: [{ url: "https://traditionsfieldclub.com/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://traditionsfieldclub.com/privacy-policy",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
