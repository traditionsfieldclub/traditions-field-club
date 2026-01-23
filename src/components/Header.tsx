'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Activities", href: "/activities" },
  { label: "About", href: "/about" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Membership", href: "/membership" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center md:justify-between h-24 relative">
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
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[#162838] text-sm font-bold uppercase tracking-widest hover:text-[#a75235] transition-colors duration-200"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button - Absolute Right */}
          <button
            className="md:hidden text-[#162838] hover:text-[#a75235] transition-colors absolute right-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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
        <nav className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <div className="flex flex-col space-y-3 pt-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[#162838] text-sm font-bold uppercase tracking-widest hover:text-[#a75235] transition-colors duration-200 py-2"
                style={{ fontFamily: "var(--font-heading), serif" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
