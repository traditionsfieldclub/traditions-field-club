"use client";

import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Picture from "@/components/Picture";
import AcuityEmbed from "@/components/AcuityEmbed";

export default function MemberForADay() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main id="main" className="flex-grow bg-[#f5f2ec]">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[#162838]">
            <Picture name="sunset-mfad" alt="" imgClassName="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#162838]/70"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#f5f2ec] mb-4 tracking-wide"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Member for a Day
            </h1>
            <p className="text-lg md:text-xl text-[#f5f2ec] max-w-2xl mx-auto opacity-90">
              $100 per shooter, all in. Starting Tuesday, October 20.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            <div className="lg:col-span-2">
              <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Try it first</span>
              <h2
                className="text-3xl md:text-4xl text-[#162838] mt-2 mb-4"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Your day on the property
              </h2>
              <p className="text-2xl text-[#162838] font-semibold mb-4">$100 per shooter, all in</p>
              <p className="text-[#333333] leading-relaxed mb-6">
                Spend a day on the property the way our members do. Starting Tuesday, October 20.
              </p>
              <ul className="space-y-3 text-[#333333] mb-6">
                {[
                  "A guided outing with our team",
                  "50 targets at select signature stations",
                  "Shotgun and shells",
                  "Eye and ear protection",
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
                Join within 30 days and your $100 goes toward your Prime membership.
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
                  <Picture name="photo-shooter-stand" alt="A guest mounting a shotgun at a stand" imgClassName="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="relative h-[160px] rounded-lg overflow-hidden">
                  <Picture name="sunset-mfad" alt="Sunset over a shooting stand at Traditions Field Club" imgClassName="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div id="book" className="lg:col-span-3 bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-6 md:p-8 scroll-mt-32">
              <h2
                className="text-2xl md:text-3xl text-[#162838] mb-2"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Book your day
              </h2>
              <p className="text-[#333333] mb-6">
                Pick your date and time below. $100 per shooter, paid securely when you book. Bringing friends? Add up to 3 more shooters.
              </p>

              <AcuityEmbed appointmentType="99504429" title="Book Member for a Day" />
            </div>
          </div>
        </section>
        {/* Tour Traditions */}
        <section id="tour" className="pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm border border-[#e8e4dc] border-l-4 border-l-[#4d5c47] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
              <div className="flex-grow text-center md:text-left">
                <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Not ready to shoot?</span>
                <h2
                  className="text-2xl md:text-3xl text-[#162838] mt-2 mb-2"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Tour Traditions
                </h2>
                <p className="text-[#333333] leading-relaxed">
                  A complimentary guided look at the property, about one hour with no shooting: the pavilion,
                  the 5-Stand, a stretch of the Riverside course, and a short talk about our founding class.
                  Small groups of up to four.
                </p>
                <p className="text-sm text-[#666666] italic mt-2">No cost, no commitment.</p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="/tour#book"
                  className="inline-block w-full md:w-auto border-2 border-[#a75235] text-[#a75235] px-8 py-3 text-center font-semibold tracking-wide hover:bg-[#a75235] hover:text-[#f5f2ec] transition-colors rounded-lg"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Tour Traditions
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
