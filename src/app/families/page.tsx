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

        {/* Friendships */}
        <section className="py-16 md:py-24 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="md:order-2 relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Picture
                name="families-friends"
                alt="Three friends standing arm in arm in the woods at Traditions"
                imgClassName="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="md:order-1">
              <Eyebrow>Friendships</Eyebrow>
              <h2 className="text-3xl md:text-4xl text-[#162838] mb-6" style={heading}>
                People who have each other&apos;s backs
              </h2>
              <p className="text-[#333333] text-lg leading-relaxed mb-4">
                Some of the best friendships we know started out here. These young people have each
                other&apos;s backs. They show up, stay focused, and spend their time outdoors with people
                who care about them.
              </p>
              <p className="text-[#333333] text-lg leading-relaxed">
                For parents, there is real peace of mind in knowing where your children are and who
                they&apos;re with.
              </p>
            </div>
          </div>
        </section>

        {/* Safety with a coach */}
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
              <Eyebrow>Safety first</Eyebrow>
              <h2 className="text-3xl md:text-4xl text-[#162838] mb-6" style={heading}>
                A coach alongside them
              </h2>
              <ul className="space-y-4 text-[#333333] text-lg">
                {[
                  "Eyes and ears on, every time.",
                  "Muzzle up and pointed in a safe direction.",
                  "An NSCA Level 1 Instructor alongside them.",
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
            </div>
          </div>
        </section>

        {/* Time together */}
        <section className="py-16 md:py-24 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="md:order-2 relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Picture
                name="first-time-bridge"
                alt="A footbridge over the creek on the property at Traditions"
                imgClassName="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="md:order-1">
              <Eyebrow>After the round</Eyebrow>
              <h2 className="text-3xl md:text-4xl text-[#162838] mb-6" style={heading}>
                Time together
              </h2>
              <p className="text-[#333333] text-lg leading-relaxed">
                The best part often comes after the last clay. Slow down, talk through the round, and
                enjoy the outdoors together.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-[#4d5c47]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl text-[#f5f2ec] mb-4" style={heading}>
              Come see it for yourself
            </h2>
            <p className="text-[#f5f2ec] text-lg opacity-90 mb-8">
              Take a complimentary tour, or spend a day on the property as Member for a Day.
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
