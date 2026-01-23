'use client';

import { useState } from 'react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Backdrop - click to close (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Floating Button Container - Mobile only */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        {/* Options Menu */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 mb-2 flex flex-col gap-3 items-end">
            {/* Email Option */}
            <a
              href="mailto:info@traditionsfieldclub.com"
              className="flex items-center gap-3 bg-white text-[#162838] pl-4 pr-3 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              <span className="text-sm font-medium whitespace-nowrap">Email Us</span>
              <div className="w-10 h-10 bg-[#162838] rounded-full flex items-center justify-center group-hover:bg-[#a75235] transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </a>

            {/* Call Option */}
            <a
              href="tel:+1-xxx-xxx-xxxx"
              className="flex items-center gap-3 bg-white text-[#162838] pl-4 pr-3 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              <span className="text-sm font-medium whitespace-nowrap">Call Us</span>
              <div className="w-10 h-10 bg-[#162838] rounded-full flex items-center justify-center group-hover:bg-[#a75235] transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </a>
          </div>
        )}

        {/* Main FAB Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
            isOpen
              ? 'bg-[#333333] rotate-0'
              : 'bg-[#a75235] hover:bg-[#8a4229]'
          }`}
          aria-label={isOpen ? 'Close contact options' : 'Open contact options'}
        >
          {isOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
