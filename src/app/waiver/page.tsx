import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

export default function Waiver() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-[#a75235] py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-3xl md:text-4xl font-semibold text-[#f5f2ec] tracking-wide"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Sign Waiver
            </h1>
            <p className="text-lg text-[#f5f2ec] max-w-2xl mx-auto opacity-90 mt-4">
              Complete the required waiver before your visit
            </p>
          </div>
        </section>

        {/* Content Placeholder */}
        <section className="py-12 md:py-16 bg-[#f5f2ec]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-8 md:p-12 text-center">
              <h2
                className="text-xl md:text-2xl text-[#162838] mb-4"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Digital Waiver Coming Soon
              </h2>
              <p className="text-[#333333] mb-6">
                This page will feature our digital waiver form for members and guests. The waiver includes liability release, safety acknowledgment, and parental consent for minors.
              </p>
              <p className="text-sm text-[#666666]">
                For now, please contact us at{" "}
                <a href="mailto:info@traditionsfieldclub.com" className="text-[#a75235] hover:underline">
                  info@traditionsfieldclub.com
                </a>{" "}
                for waiver information.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
