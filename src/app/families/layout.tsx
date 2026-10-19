import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Families: Where Families Grow Together",
  description:
    "Friends become family at Traditions Field Club. With a coach alongside them, teens learn safe gun handling, focus and patience, and our youth clays team practices here on weekday afternoons. Book a complimentary tour.",
  alternates: { canonical: "https://traditionsfieldclub.com/families" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
