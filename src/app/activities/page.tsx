import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

export default function Activities() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#3d5a45] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#f5f2ec] mb-4 tracking-wide"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Activities
            </h1>
            <p className="text-lg md:text-xl text-[#f5f2ec] max-w-2xl mx-auto opacity-90">
              Experience premier shooting sports in the heart of South Carolina&apos;s Lowcountry
            </p>
          </div>
        </section>

        {/* 5-Stand Section - Image Left */}
        <section id="5-stand" className="py-16 md:py-24 bg-[#f5f2ec] scroll-mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Image */}
              <div className="relative h-[300px] md:h-[400px] bg-[#e8e4dc] rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-[#162838]">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm uppercase tracking-widest opacity-60">Image Placeholder</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <h2
                  className="text-3xl md:text-4xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  5-Stand
                </h2>
                <p className="text-[#333333] mb-4 leading-relaxed">
                  Our dedicated 5-Stand facility offers an exciting and challenging shooting experience for all skill levels.
                  With five shooting stations and multiple trap machines presenting targets from various angles and distances,
                  you&apos;ll enjoy a dynamic round that tests your reflexes and marksmanship.
                </p>
                <p className="text-[#333333] mb-6 leading-relaxed">
                  Perfect for those looking to sharpen their skills or enjoy a quick session, 5-Stand provides the thrill
                  of sporting clays in a compact format. Whether you&apos;re a seasoned shooter or just getting started,
                  our well-maintained stations and quality targets ensure an exceptional experience every visit.
                </p>
                <ul className="space-y-2 text-[#333333]">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full"></span>
                    Five shooting stations with varied presentations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full"></span>
                    Multiple target combinations per station
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full"></span>
                    Suitable for beginners and experienced shooters
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Sporting Clays Section - Image Right */}
        <section id="sporting-clays" className="py-16 md:py-24 bg-white scroll-mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Content - First on mobile, second on desktop */}
              <div className="order-2 md:order-1">
                <h2
                  className="text-3xl md:text-4xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Sporting Clays
                </h2>
                <p className="text-[#333333] mb-4 leading-relaxed">
                  Often called &quot;golf with a shotgun,&quot; our sporting clays courses wind through the natural
                  beauty of South Carolina&apos;s southern fields. Each station presents unique target presentations
                  that simulate the flight patterns of various game birds, offering an authentic and immersive
                  shooting experience.
                </p>
                <p className="text-[#333333] mb-6 leading-relaxed">
                  Our courses feature 12 stations across beautifully maintained grounds, with plans to expand
                  to three full courses. The varying terrain and natural landscape create a truly memorable
                  shooting environment that connects you with the land and traditions of Southern outdoor sports.
                </p>
                <ul className="space-y-2 text-[#333333]">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full"></span>
                    12 stations across scenic terrain
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full"></span>
                    Realistic game bird flight simulations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full"></span>
                    Certified instruction available
                  </li>
                </ul>
              </div>

              {/* Image - Second on mobile, first on desktop */}
              <div className="relative h-[300px] md:h-[400px] bg-[#e8e4dc] rounded-lg overflow-hidden order-1 md:order-2">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-[#162838]">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm uppercase tracking-widest opacity-60">Image Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Archery Section - Image Left */}
        <section id="archery" className="py-16 md:py-24 bg-[#f5f2ec] scroll-mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Image */}
              <div className="relative h-[300px] md:h-[400px] bg-[#e8e4dc] rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-[#162838]">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm uppercase tracking-widest opacity-60">Image Placeholder</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <h2
                  className="text-3xl md:text-4xl text-[#162838] mb-4"
                  style={{ fontFamily: "var(--font-heading), serif" }}
                >
                  Archery
                </h2>
                <p className="text-[#333333] mb-4 leading-relaxed">
                  Discover the timeless art of archery at our dedicated outdoor range. Whether you&apos;re
                  drawn to traditional recurve bows, modern compounds, or want to introduce your family
                  to this rewarding discipline, our archery facilities provide a safe and welcoming
                  environment for archers of all ages and abilities.
                </p>
                <p className="text-[#333333] mb-6 leading-relaxed">
                  Our range is designed with youth and beginners in mind, featuring proper safety measures
                  and distance markers for progressive skill development. Experienced archers will appreciate
                  our well-maintained targets and the peaceful setting that allows for focused practice
                  amidst nature.
                </p>
                <ul className="space-y-2 text-[#333333]">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full"></span>
                    Youth and family-friendly programs
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full"></span>
                    Beginner instruction available
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#a75235] rounded-full"></span>
                    Safe, well-maintained outdoor range
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-[#162838]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="text-3xl md:text-4xl text-[#f5f2ec] mb-4"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Ready to Experience Traditions?
            </h2>
            <p className="text-[#f5f2ec] opacity-90 max-w-2xl mx-auto mb-8">
              Join our community of outdoor enthusiasts and become part of something special.
              We&apos;re currently accepting interest for memberships.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 rounded-md font-medium uppercase tracking-widest hover:bg-[#8a4229] transition-colors duration-200"
            >
              Get In Touch
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
