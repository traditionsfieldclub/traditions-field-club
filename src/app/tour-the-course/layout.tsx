import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour the Course: Interactive Course Map",
  description:
    "Explore Traditions Field Club station by station: two sporting clays courses, Riverside stands along the Salkehatchie, and a 5-Stand with fourteen machines.",
  alternates: { canonical: "https://traditionsfieldclub.com/tour-the-course" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
