import type { Metadata } from "next";
import { Nanum_Myeongjo, Nanum_Gothic } from "next/font/google";
import "./globals.css";
import FloatingContact from "@/components/FloatingContact";

const nanumMyeongjo = Nanum_Myeongjo({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const nanumGothic = Nanum_Gothic({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  title: "Traditions Field Club",
  description: "A premier sporting clays and outdoor club in South Carolina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nanumMyeongjo.variable} ${nanumGothic.variable} antialiased`}
        style={{ fontFamily: "var(--font-body), sans-serif" }}
      >
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
