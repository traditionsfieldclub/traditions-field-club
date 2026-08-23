import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Roadmap — Building the Future of Traditions",
  description:
    "See the development roadmap for Traditions Field Club. From Phase 1 sporting clays to a future Pavilion, hunting, fishing, and outdoor recreation. Follow our journey building a premier outdoor destination in South Carolina.",
  openGraph: {
    title: "Our Roadmap — Building the Future of Traditions",
    description:
      "See the development roadmap for Traditions Field Club. From Phase 1 sporting clays to a future Pavilion, hunting, fishing, and outdoor recreation. Follow our journey building a premier outdoor destination in South Carolina.",
    url: "https://traditionsfieldclub.com/roadmap",
    images: [{ url: "https://traditionsfieldclub.com/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    title: "Our Roadmap — Building the Future of Traditions",
    description:
      "Phase 1 sporting clays, future Pavilion, hunting, fishing, and outdoor recreation — our long-term vision in South Carolina's Lowcountry.",
  },
  alternates: {
    canonical: "https://traditionsfieldclub.com/roadmap",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
