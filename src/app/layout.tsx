import type { Metadata } from "next";
import { Nanum_Myeongjo, Lato } from "next/font/google";
import "./globals.css";
import FloatingContact from "@/components/FloatingContact";

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
  title: "Traditions Field Club",
  description: "A premier sporting clays and outdoor club in South Carolina",
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
      </body>
    </html>
  );
}
