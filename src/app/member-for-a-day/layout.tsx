import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member for a Day: Book Your Day",
  description:
    "Try Traditions Field Club for $100 all-in: a guided outing, 50 targets, shotgun, shells, and eye and ear protection. Request your date and we'll confirm within one business day.",
  alternates: { canonical: "https://traditionsfieldclub.com/member-for-a-day" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
