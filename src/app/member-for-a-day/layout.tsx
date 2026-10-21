import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member for a Day: Book Your Day",
  description:
    "Try Traditions Field Club for $100 per shooter, all in: a warm-up at the 5-Stand and a guided round on our signature stands, 50 shots in all, with shotgun rental, shells, and eye and ear protection included. About an hour to an hour and a half. Book your date online.",
  alternates: { canonical: "https://traditionsfieldclub.com/member-for-a-day" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
