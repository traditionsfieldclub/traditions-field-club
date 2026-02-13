import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Roadmap — Building the Future of Traditions",
  description:
    "See the development roadmap for Traditions Field Club. From Phase 1 sporting clays and archery to a future barn-style lodge, trails, camping, and pro shop. Follow our journey building a premier outdoor destination in South Carolina.",
  openGraph: {
    title: "Our Roadmap — Building the Future of Traditions",
    description:
      "See the development roadmap for Traditions Field Club. From Phase 1 sporting clays and archery to a future barn-style lodge, trails, camping, and pro shop. Follow our journey building a premier outdoor destination in South Carolina.",
    url: "https://traditionsfieldclub.com/roadmap",
  },
  alternates: {
    canonical: "https://traditionsfieldclub.com/roadmap",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
