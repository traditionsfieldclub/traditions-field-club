'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "First Time", href: "/first-time" },
  { label: "Activities", href: "/activities" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Membership", href: "/membership" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileNavRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Standard dropdown behavior: clicking anywhere outside the open mobile menu closes it.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
    {/* Spacer for the fixed announcement bar — announcement height is dynamic (wraps to 2 lines
        on narrow screens). The header floats transparently over each page's own dark hero-style
        section, so only the announcement bar needs reserving here. The white bar + small logo
        are eliminated entirely, on every page, at every scroll depth — the client's explicit
        direction. White nav text/icon carry a drop-shadow for legibility further down each page. */}
    <div style={{ height: "var(--announcement-height, 36px)" }}></div>
    <header
      className="absolute left-0 right-0 z-50 bg-transparent border-transparent"
      style={{ top: "var(--announcement-height, 36px)" }}
    >
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-24 relative">
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
                    : "text-white hover:text-[#c4764e] [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]"
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

          {/* Mobile Menu Button - Absolute Right. Hidden while the menu is open — the
              close control lives on the panel itself instead of toggling in place. */}
          {!mobileMenuOpen && (
            <button
              className="lg:hidden transition-colors absolute right-0 -translate-y-[20px] text-white hover:text-[#c4764e]"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="h-9 w-9"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav ref={mobileNavRef} className="lg:hidden relative bg-white border-t border-gray-100 px-4 pb-4 -mt-[98px]">
          {/* Close button lives on the panel itself */}
          <button
            className="absolute top-3 right-4 text-[#162838] hover:text-[#a75235] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
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
