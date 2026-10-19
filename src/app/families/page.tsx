"use client";

import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Picture from "@/components/Picture";
import FadeImage from "@/components/FadeImage";

const heading = { fontFamily: "var(--font-heading), serif" };

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <span className="h-[1px] w-8 md:w-12 bg-[#a75235]"></span>
      <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">{children}</span>
    </div>
  );
}

export default function Families() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main id="main" className="flex-grow bg-[#f5f2ec]">
        {/* Hero */}
        <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[#162838]">
            <FadeImage
              src="/images/recreation_hiking_trail_group.webp"
              alt=""
              fill
              priority
              className="object-cover object-[center_70%]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#162838]/60"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[#f5f2ec] text-sm tracking-[0.3em] uppercase opacity-90">Families</span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#f5f2ec] mt-3 mb-4 tracking-wide"
              style={heading}
            >
              Where Families Grow Together
            </h1>
            <p className="text-xl md:text-2xl text-[#f5f2ec] italic opacity-90" style={heading}>
              Friends become family.
            </p>
          </div>
        </section>

        {/* Our story */}
        <section className="py-16 md:py-24 bg-white overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative h-[420px] md:h-[500px] rounded-lg overflow-hidden">
              <FadeImage
                src="/images/recreation_hiking_trail_group.webp"
                alt="Teens walking a pine trail at Traditions with shotguns carried safely"
                fill
                className="object-cover object-[center_70%]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <Eyebrow>Why we built it</Eyebrow>
              <h2 className="text-3xl md:text-4xl text-[#162838] mb-6" style={heading}>
                Their sport, found here
              </h2>
              <p className="text-[#333333] text-lg leading-relaxed">
                Not every child finds their sport on a field or a court. We&apos;ve watched ours find it
                here. With a coach alongside them, teens learn safe gun handling, focus and patience, and
                they start to carry themselves differently. We&apos;re parents too, and watching our own
                teens grow into confident young adults out here is one of the reasons we built Traditions.
              </p>
            </div>
          </div>
        </section>

        {/* Pathway */}
        <section className="py-16 md:py-24 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center mb-12 md:mb-16">
              <div>
                <Eyebrow>The pathway</Eyebrow>
                <h2 className="text-3xl md:text-4xl text-[#162838] mb-6" style={heading}>
                  From first visit to friends for life
                </h2>
                <p className="text-[#333333] text-lg leading-relaxed">
                  Some of the best friendships we know started out here. These young people have each
                  other&apos;s backs. They show up, stay focused, and spend their time outdoors with people
                  who care about them. Here is how that starts.
                </p>
              </div>
              <div className="relative h-[300px] md:h-[360px] rounded-lg overflow-hidden">
                <Picture
                  name="families-friends"
                  alt="Three friends standing arm in arm in the woods at Traditions"
                  imgClassName="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "First visit",
                  body: "Come out together. Book a complimentary tour and see the property as a family.",
                },
                {
                  title: "Learn with a coach",
                  body: "Safe gun handling, focus and patience, with an NSCA Level 1 Instructor alongside.",
                },
                {
                  title: "Join the team",
                  body: "Our youth clays team practices here on weekday afternoons, with Brian coaching.",
                },
                {
                  title: "Grow together",
                  body: "Friendships that last, parents out on the course too, and family membership when you are ready.",
                },
              ].map((step, n) => (
                <li key={step.title} className="bg-white rounded-lg border border-[#e8e4dc] shadow-sm p-6">
                  <span
                    className="w-10 h-10 rounded-full bg-[#a75235] text-[#f5f2ec] flex items-center justify-center text-lg mb-4"
                    style={heading}
                  >
                    {n + 1}
                  </span>
                  <h3 className="text-xl text-[#162838] mb-2" style={heading}>
                    {step.title}
                  </h3>
                  <p className="text-[#333333] leading-relaxed">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* For parents */}
        <section className="py-16 md:py-24 bg-white overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative h-[420px] md:h-[500px] rounded-lg overflow-hidden">
              <Picture
                name="first-time-brian"
                alt="Brian Seifrit, NSCA Level 1 Instructor, wearing eye and ear protection on the course"
                imgClassName="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div>
              <Eyebrow>For parents</Eyebrow>
              <h2 className="text-3xl md:text-4xl text-[#162838] mb-6" style={heading}>
                Safety first, always
              </h2>
              <ul className="space-y-4 text-[#333333] text-lg mb-6">
                {[
                  "Eyes and ears on, every time.",
                  "Muzzle up and pointed in a safe direction.",
                  "A coach alongside them.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#4d5c47] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#333333] text-lg leading-relaxed">
                And there is real peace of mind in knowing where your children are and who they&apos;re with.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-[#4d5c47]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl text-[#f5f2ec] mb-4" style={heading}>
              Come out together
            </h2>
            <p className="text-[#f5f2ec] text-lg opacity-90 mb-8">
              Book a complimentary tour, ask us about the youth team, or spend a day on the property as Member for a Day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/tour#book"
                className="inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#8e4429] transition-colors rounded-lg"
                style={heading}
              >
                Book a Tour
              </a>
              <a
                href="/contact?topic=lessons"
                className="inline-block border-2 border-[#f5f2ec] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#f5f2ec] hover:text-[#4d5c47] transition-colors rounded-lg"
                style={heading}
              >
                Ask About the Youth Team
              </a>
              <a
                href="/member-for-a-day#book"
                className="inline-block border-2 border-[#f5f2ec] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#f5f2ec] hover:text-[#4d5c47] transition-colors rounded-lg"
                style={heading}
              >
                Member for a Day
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
