'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "First Time", href: "/first-time" },
  { label: "Activities", href: "/activities" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Membership", href: "/membership" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // On the homepage, the header starts transparent over the hero image (logo lives in
  // the hero itself there) and solidifies once the user scrolls past it, so nav stays
  // legible over the lighter sections further down the page.
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
    {/* Spacer for fixed announcement bar + header — announcement height is dynamic (wraps to 2 lines on narrow screens).
        On the homepage the header floats transparently over the hero, so only the announcement bar needs reserving. */}
    <div style={{ height: isHome ? "var(--announcement-height, 36px)" : "calc(var(--announcement-height, 36px) + 96px)" }}></div>
    <header
      className={`fixed left-0 right-0 z-50 transition-colors duration-300 ${
        isTransparent ? "bg-transparent border-transparent" : "bg-white border-b border-gray-200"
      }`}
      style={{ top: "var(--announcement-height, 36px)" }}
    >
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center h-24 relative ${isTransparent ? "justify-center" : "justify-center lg:justify-between"}`}>
          {/* Logo - hidden while transparent over the hero (the hero has its own large logo); reappears once solid, restoring the logo-left/nav-right layout */}
          <Link href="/" className={isTransparent ? "hidden" : ""}>
            <Image
              src="/logo.png"
              alt="Traditions Field Club"
              width={160}
              height={60}
              className="h-[75px] w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Right */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={handleNavClick(item.href)}
                className={`group text-sm xl:text-base font-bold uppercase tracking-wide xl:tracking-widest transition-colors duration-200 relative whitespace-nowrap ${
                  pathname === item.href
                    ? "text-[#a75235]"
                    : isTransparent
                    ? "text-white hover:text-[#c4764e]"
                    : "text-[#162838] hover:text-[#a75235]"
                }`}
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                {item.label}
                <span className={`absolute left-0 -bottom-1 h-[1px] bg-[#a75235] transition-all duration-300 ease-out ${
                  pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            ))}
            <Link
              href="/join"
              className="bg-[#a75235] text-[#f5f2ec] text-sm xl:text-base font-bold uppercase tracking-wide xl:tracking-widest px-4 xl:px-6 py-2 hover:bg-[#162838] transition-colors duration-200 rounded whitespace-nowrap"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Become A Member
            </Link>
          </nav>

          {/* Mobile Menu Button - Absolute Right */}
          <button
            className={`lg:hidden transition-colors absolute right-0 ${
              isTransparent ? "text-white hover:text-[#c4764e]" : "text-[#162838] hover:text-[#a75235]"
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="h-9 w-9"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="lg:hidden bg-white border border-gray-100 shadow-lg rounded-b-lg px-4 pb-4 max-w-[85%] mx-auto -mt-8">
          <div className="flex flex-col space-y-3 pt-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-bold uppercase tracking-widest transition-colors duration-200 py-2 ${
                  pathname === item.href ? "text-[#a75235]" : "text-[#162838] hover:text-[#a75235]"
                }`}
                style={{ fontFamily: "var(--font-heading), serif" }}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(item.href)(e);
                }}
              >
                {item.label}
              </Link>
            ))}
            {/* Join Button */}
            <Link
              href="/join"
              className="bg-[#a75235] text-[#f5f2ec] text-sm font-bold uppercase tracking-widest px-5 py-3 text-center hover:bg-[#162838] transition-colors duration-200 rounded mt-2"
              style={{ fontFamily: "var(--font-heading), serif" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Become A Member
            </Link>
          </div>
        </nav>
      )}
    </header>
    </>
  );
}
