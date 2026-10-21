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
              alt="Teens walking a pine trail at Traditions with shotguns carried safely"
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
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
              <span className="text-[#a75235] text-sm tracking-[0.3em] uppercase">Why we built it</span>
              <span className="h-[1px] w-12 md:w-20 bg-[#162838]/20"></span>
            </div>
            <h2 className="text-3xl md:text-4xl text-[#162838]" style={heading}>
              Time together, outdoors
            </h2>
            <div className="flex justify-center mt-4 mb-6">
              <span className="h-[1px] w-16 bg-[#a75235]"></span>
            </div>
            <p className="text-[#333333] text-lg md:text-xl leading-relaxed">
              We&apos;re parents too, and some of our favorite days are the ones spent out here with our
              families. Walking the course together, slowing down under the pines, and ending the afternoon
              along the Little Salkehatchie River. Those shared days are why we built Traditions: a
              place where families can put the phones away, enjoy the outdoors, and make memories together.
            </p>
          </div>
        </section>

        {/* Pathway */}
        <section className="py-16 md:py-24 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center mb-12 md:mb-16">
              <div>
                <Eyebrow>Family time</Eyebrow>
                <h2 className="text-3xl md:text-4xl text-[#162838] mb-6" style={heading}>
                  From first visit to friends for life
                </h2>
                <p className="text-[#333333] text-lg leading-relaxed">
                  Some of the best friendships we know started out here, between children and between
                  parents too. Families who come out once tend to come back, and before long every visit
                  here feels like time with old friends. Here is how that starts.
                </p>
              </div>
              <div className="relative w-full aspect-[1600/1269] rounded-lg overflow-hidden">
                <Picture
                  name="families-stand"
                  alt="Two teen friends smiling under a shooting stand roof, one holding a shotgun pointed safely upward"
                  imgClassName="absolute inset-0 w-full h-full object-cover object-[50%_28%]"
                />
              </div>
            </div>
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Visit together",
                  body: "Book a complimentary tour and see the property as a family.",
                },
                {
                  title: "Walk the course",
                  body: "Wander the trails and stations side by side, at your own pace, with time to talk along the way.",
                },
                {
                  title: "Slow down by the river",
                  body: "Fresh air, tall pines and quiet afternoons along the Little Salkehatchie River.",
                },
                {
                  title: "Make memories",
                  body: "Shared days, friendships that last, and family membership when you are ready.",
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
                  "Families together, with an experienced instructor nearby.",
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
                Every visit starts with safety, so the whole family can relax and enjoy the day together.
                And there is real peace of mind in knowing where your children are and who they&apos;re with.
                Instruction and a youth team are also offered here.
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
              Book a complimentary tour and spend an afternoon on the property as a family. We would love to show you around.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/tour#book"
                className="inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#8e4429] transition-colors rounded-lg"
                style={heading}
              >
                Book a Tour
              </a>
            </div>
          </div>
        </section>
        <p className="py-4 text-center text-xs text-[#6b6b6b] bg-[#f5f2ec]">Some images digitally edited.</p>
      </main>
      <Footer />
    </>
  );
}
