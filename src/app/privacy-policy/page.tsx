import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-[#162838] py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-3xl md:text-4xl font-semibold text-[#f5f2ec] tracking-wide"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Privacy Policy
            </h1>
          </div>
        </section>

        {/* Content Placeholder */}
        <section className="py-12 md:py-16 bg-[#f5f2ec]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-8 md:p-12">
              <p className="text-[#333333] mb-6">
                <strong>Last Updated:</strong> January 2026
              </p>
              <h2
                className="text-xl md:text-2xl text-[#162838] mb-4"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Content Coming Soon
              </h2>
              <p className="text-[#333333]">
                This page will contain our full privacy policy, including information about data collection, usage, storage, and your rights.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
