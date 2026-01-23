import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import VideoHero from "@/components/VideoHero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Header */}
      <Header />

      {/* Main Content - Placeholder */}
      <main className="flex-grow">
        {/* Hero Section with Video */}
        <VideoHero />

        {/* Content Section Placeholder */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-8 md:p-12 text-center">
              <h2
                className="text-2xl md:text-3xl text-[#162838] mb-4"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Content Coming Soon
              </h2>
              <p className="text-[#333333] max-w-xl mx-auto">
                This section will contain the main content of the website including
                club overview, shooting sports, membership preview, roadmap, and volunteer information.
              </p>
            </div>
          </div>
        </section>

        {/* Second Placeholder Section */}
        <section className="py-16 md:py-24 px-4 bg-[#e8e4dc]">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-8 md:p-12 text-center">
              <h2
                className="text-2xl md:text-3xl text-[#162838] mb-4"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Additional Content
              </h2>
              <p className="text-[#333333] max-w-xl mx-auto">
                Additional sections and features will be added here as development progresses.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
