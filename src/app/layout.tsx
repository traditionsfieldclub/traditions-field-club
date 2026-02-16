import type { Metadata } from "next";
import { Nanum_Myeongjo, Lato } from "next/font/google";
import "./globals.css";
import FloatingContact from "@/components/FloatingContact";
import JsonLd from "@/components/JsonLd";

const nanumMyeongjo = Nanum_Myeongjo({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const lato = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://traditionsfieldclub.com"),
  title: {
    default:
      "Traditions Field Club | Premier Sporting Clays Club in South Carolina",
    template: "%s | Traditions Field Club",
  },
  description:
    "Traditions Field Club is a veteran-owned sporting clays, 5-stand, and archery club in South Carolina's Lowcountry near Ruffin, SC. Family-friendly memberships, certified instruction, and corporate events. Open 7 days, sunrise to sunset.",
  keywords: [
    "sporting clays South Carolina",
    "5-stand shooting",
    "archery range SC",
    "shooting club Lowcountry",
    "veteran owned sporting club",
    "family friendly shooting range",
    "clay shooting Ruffin SC",
    "outdoor club near Charleston",
    "sporting clays near Hilton Head",
    "corporate team building shooting",
    "youth shooting programs SC",
  ],
  authors: [{ name: "Traditions Field Club" }],
  creator: "Traditions Field Club",
  openGraph: {
    title:
      "Traditions Field Club | Premier Sporting Clays Club in South Carolina",
    description:
      "Traditions Field Club is a veteran-owned sporting clays, 5-stand, and archery club in South Carolina's Lowcountry near Ruffin, SC. Family-friendly memberships, certified instruction, and corporate events. Open 7 days, sunrise to sunset.",
    url: "https://traditionsfieldclub.com",
    siteName: "Traditions Field Club",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://traditionsfieldclub.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Traditions Field Club — Sporting Clays in South Carolina's Lowcountry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Traditions Field Club | Premier Sporting Clays Club in South Carolina",
    description:
      "Traditions Field Club is a veteran-owned sporting clays, 5-stand, and archery club in South Carolina's Lowcountry near Ruffin, SC. Family-friendly memberships, certified instruction, and corporate events. Open 7 days, sunrise to sunset.",
    images: ["https://traditionsfieldclub.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://traditionsfieldclub.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${nanumMyeongjo.variable} ${lato.variable} antialiased overflow-x-hidden w-full max-w-full`}
        style={{ fontFamily: "var(--font-body), sans-serif" }}
      >
        {children}
        <FloatingContact />
        <JsonLd />
      </body>
    </html>
  );
}
