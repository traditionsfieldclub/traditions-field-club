import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-[#3d5a45] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#f5f2ec] mb-4 tracking-wide"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              About Us
            </h1>
            <p className="text-lg md:text-xl text-[#f5f2ec] max-w-2xl mx-auto opacity-90">
              Our story, mission, and the people behind Traditions Field Club
            </p>
          </div>
        </section>

        {/* Content Placeholder */}
        <section className="py-16 md:py-24 bg-[#f5f2ec]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-8 md:p-12 text-center">
              <h2
                className="text-2xl md:text-3xl text-[#162838] mb-4"
                style={{ fontFamily: "var(--font-heading), serif" }}
              >
                Content Coming Soon
              </h2>
              <p className="text-[#333333] max-w-xl mx-auto">
                This page will feature information about the club owners, our mission, vision, and the story behind Traditions Field Club.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
