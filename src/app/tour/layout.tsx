import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour Traditions: Complimentary Property Tour",
  description:
    "A complimentary guided look, about one hour, at Traditions Field Club: the pavilion, the 5-Stand, a stretch of the Riverside course, and a short talk about our founding class. No cost, no commitment.",
  alternates: { canonical: "https://traditionsfieldclub.com/tour" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
