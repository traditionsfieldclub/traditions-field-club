"use client";

import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Picture from "@/components/Picture";
import AcuityEmbed from "@/components/AcuityEmbed";

export default function TourTraditions() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main id="main" className="flex-grow bg-[#f5f2ec]">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[#162838]">
            <Picture name="forest-trails-aerial" alt="" imgClassName="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#162838]/70"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#f5f2ec] mb-4 tracking-wide"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Tour Traditions
            </h1>
            <p className="text-lg md:text-xl text-[#f5f2ec] max-w-2xl mx-auto opacity-90">
              Complimentary tour. No cost, no commitment.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            <div className="lg:col-span-2">
              <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">See it first</span>
              <h2
                className="text-3xl md:text-4xl text-[#162838] mt-2 mb-4"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                A guided look at the property
              </h2>
              <p className="text-2xl text-[#162838] font-semibold mb-4">Complimentary tour, about one hour</p>
              <p className="text-[#333333] leading-relaxed mb-6">
                No shooting, just a walk through what we&apos;re building. Small groups of up to four, a scenic drive
                through the Lowcountry, about an hour from Hilton Head, Bluffton, Beaufort and Edisto.
              </p>
              <ul className="space-y-3 text-[#333333] mb-6">
                {[
                  "The pavilion",
                  "The 5-Stand and its fourteen machines",
                  "A stretch of the Riverside course",
                  "A short talk about our founding class",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#4d5c47] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-[#666666] italic mb-6">
                Ready to shoot? Try <a href="/member-for-a-day" className="text-[#a75235] not-italic font-semibold hover:underline">Member for a Day</a> instead.
              </p>
              <p className="text-[#333333] mb-6">
                Prefer to talk it through? Call us at{" "}
                <a href="tel:+18433218152" className="text-[#a75235] font-semibold hover:underline">
                  (843) 321-8152
                </a>
                .
              </p>
              <div className="hidden lg:grid grid-cols-2 gap-3">
                <div className="relative h-[160px] rounded-lg overflow-hidden">
                  <Picture name="sunset-trail" alt="A trail through the Traditions Field Club property at sunset" imgClassName="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="relative h-[160px] rounded-lg overflow-hidden">
                  <Picture name="sunset-stand" alt="A covered stand at Traditions Field Club at sunset" imgClassName="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div id="book" className="lg:col-span-3 bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-6 md:p-8 scroll-mt-32">
              <h2
                className="text-2xl md:text-3xl text-[#162838] mb-2"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Book your tour
              </h2>
              <p className="text-[#333333] mb-6">
                Pick a date and time below. Complimentary tour, no cost, no commitment.
              </p>

              <AcuityEmbed appointmentType="99505297" title="Book a Tour Traditions visit" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
