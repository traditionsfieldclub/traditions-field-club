import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Get in Touch",
  description:
    "Contact Traditions Field Club for membership inquiries, lessons, corporate events, volunteering, or general questions. Email info@traditionsfieldclub.com. Located in Ruffin, SC — 1.5 hours from Charleston, 1 hour from Hilton Head and Beaufort.",
  openGraph: {
    title: "Contact Us — Get in Touch",
    description:
      "Contact Traditions Field Club for membership inquiries, lessons, corporate events, volunteering, or general questions. Email info@traditionsfieldclub.com. Located in Ruffin, SC — 1.5 hours from Charleston, 1 hour from Hilton Head and Beaufort.",
    url: "https://traditionsfieldclub.com/contact",
  },
  alternates: {
    canonical: "https://traditionsfieldclub.com/contact",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
