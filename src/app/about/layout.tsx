import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Our Story, Mission & Founders",
  description:
    "Learn about Traditions Field Club, a veteran-owned sporting clays club in South Carolina's Lowcountry. Founded by Brian Seifrit and Jim Nicholson, we're dedicated to preserving Southern outdoor traditions for families and future generations.",
  openGraph: {
    title: "About Us — Our Story, Mission & Founders",
    description:
      "Learn about Traditions Field Club, a veteran-owned sporting clays club in South Carolina's Lowcountry. Founded by Brian Seifrit and Jim Nicholson, we're dedicated to preserving Southern outdoor traditions for families and future generations.",
    url: "https://traditionsfieldclub.com/about",
  },
  alternates: {
    canonical: "https://traditionsfieldclub.com/about",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
