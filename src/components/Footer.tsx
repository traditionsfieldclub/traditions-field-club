import Image from "next/image";
import Link from "next/link";
import FooterNewsletter from "./FooterNewsletter";

const navLinks = [
  { label: "First Time", href: "/first-time" },
  { label: "Activities", href: "/activities" },
  { label: "About", href: "/about" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Membership", href: "/membership" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#162838] text-[#f5f2ec]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* Mobile Layout (single column, centered) */}
        <div className="lg:hidden space-y-10 text-center">
          {/* Logo & About */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="Traditions Field Club"
                width={140}
                height={52}
                className="h-[80px] w-auto brightness-0 invert mx-auto"
              />
            </Link>
            <p className="text-base opacity-75 leading-relaxed max-w-[300px] mx-auto">
              A premier sporting clays and outdoor club in the heart of South Carolina&apos;s Lowcountry.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold uppercase tracking-widest mb-4 text-[#a75235]">
              Contact
            </h3>
            <ul className="space-y-3 text-base">
              <li>
                <a
                  href="mailto:info@traditionsfieldclub.com"
                  className="opacity-75 hover:opacity-100 hover:text-[#a75235] transition-colors"
                >
                  info@traditionsfieldclub.com
                </a>
              </li>
              <li className="opacity-75">
                Coming Soon
              </li>
              <li className="opacity-75">
                TBD
              </li>
              <li className="pt-2">
                <a
                  href="https://instagram.com/traditionsfieldclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 opacity-75 hover:opacity-100 hover:text-[#a75235] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>@traditionsfieldclub</span>
                </a>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-[#f5f2ec]/10">
              <p className="text-base opacity-75 mb-4">
                Sunrise to Sunset
              </p>
              <Link
                href="/waiver"
                className="inline-block bg-[#a75235] text-[#f5f2ec] px-10 py-3 rounded text-base font-semibold uppercase tracking-widest hover:bg-[#8a4229] transition-colors duration-200"
              >
                Sign Waiver
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-base font-semibold uppercase tracking-widest mb-4 text-[#a75235]">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base opacity-75 hover:opacity-100 hover:text-[#a75235] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <FooterNewsletter />
          </div>
        </div>

        {/* Desktop Layout (4 columns) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & About */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="Traditions Field Club"
                width={120}
                height={45}
                className="h-[60px] w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm opacity-75 leading-relaxed max-w-[200px]">
              A premier sporting clays and outdoor club in South Carolina&apos;s Lowcountry.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 text-[#a75235]">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-75 hover:opacity-100 hover:text-[#a75235] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact, Hours & Actions */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 text-[#a75235]">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:info@traditionsfieldclub.com"
                  className="opacity-75 hover:opacity-100 hover:text-[#a75235] transition-colors"
                >
                  info@traditionsfieldclub.com
                </a>
              </li>
              <li className="opacity-75">
                Coming Soon
              </li>
              <li className="opacity-75">
                TBD
              </li>
              <li className="pt-2">
                <a
                  href="https://instagram.com/traditionsfieldclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 opacity-75 hover:opacity-100 hover:text-[#a75235] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>@traditionsfieldclub</span>
                </a>
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-[#f5f2ec]/10">
              <p className="text-sm opacity-75 mb-3">
                Sunrise to Sunset
              </p>
              <Link
                href="/waiver"
                className="inline-block bg-[#a75235] text-[#f5f2ec] px-6 py-2 rounded-md text-sm font-medium uppercase tracking-wider hover:bg-[#8a4229] transition-colors duration-200"
              >
                Sign Waiver
              </Link>
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div>
            <FooterNewsletter />
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#f5f2ec]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center text-center gap-3 lg:flex-row lg:justify-between lg:text-left text-sm opacity-60">
            <p>
              &copy; 2026 Traditions Field Club. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy-policy"
                className="hover:opacity-100 hover:text-[#a75235] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:opacity-100 hover:text-[#a75235] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
            <p>
              Website by{" "}
              <a
                href="https://forgeddigitaldesign.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-100 hover:text-[#a75235] transition-colors"
              >
                Forged Digital Design
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
