'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "First Time", href: "/first-time" },
  { label: "Activities", href: "/activities" },
  { label: "About", href: "/about" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Membership", href: "/membership" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
    {/* Spacer for fixed announcement bar + header */}
    <div className="h-[132px]"></div>
    <header className="fixed top-[36px] left-0 right-0 z-50 bg-white border-b border-gray-200">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center lg:justify-between h-24 relative">
          {/* Logo - Centered on mobile, Left on desktop */}
          <Link href="/">
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
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`group text-xs xl:text-sm font-bold uppercase tracking-wide xl:tracking-widest transition-colors duration-200 relative whitespace-nowrap ${
                  pathname === item.href ? "text-[#a75235]" : "text-[#162838] hover:text-[#a75235]"
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
              className="bg-[#a75235] text-[#f5f2ec] text-xs xl:text-sm font-bold uppercase tracking-wide xl:tracking-widest px-3 xl:px-5 py-2 hover:bg-[#162838] transition-colors duration-200 rounded whitespace-nowrap"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Join Now
            </Link>
          </nav>

          {/* Mobile Menu Button - Absolute Right */}
          <button
            className="lg:hidden text-[#162838] hover:text-[#a75235] transition-colors absolute right-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="h-6 w-6"
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
        <nav className="lg:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <div className="flex flex-col space-y-3 pt-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-bold uppercase tracking-widest transition-colors duration-200 py-2 ${
                  pathname === item.href ? "text-[#a75235]" : "text-[#162838] hover:text-[#a75235]"
                }`}
                style={{ fontFamily: "var(--font-heading), serif" }}
                onClick={() => setMobileMenuOpen(false)}
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
              Join Now
            </Link>
          </div>
        </nav>
      )}
    </header>
    </>
  );
}
