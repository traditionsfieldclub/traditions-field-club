import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import FadeImage from "@/components/FadeImage";

const heading = { fontFamily: "var(--font-heading), serif" };

const visit = [
  {
    title: "Pull in",
    text: "Pull in and park. Give yourself a few extra minutes; the drive through the Lowcountry is part of it.",
  },
  {
    title: "One of us meets you",
    text: "Jim or Brian will be there to say hello, show you around and answer whatever questions you have.",
  },
  {
    title: "Sign the waiver",
    text: "Everyone who shoots signs our waiver. You can do it at the club, or sign it online ahead of time.",
  },
  {
    title: "A safety walk-through",
    text: "Before anyone loads a shell, we go over safe gun handling, how a station works and how we move between stands. Brian is a certified shooting instructor.",
  },
  {
    title: "A guided round on the course",
    text: "We walk the course with you, stand by stand. Take your time. Ask anything. Nobody is keeping score unless you want to.",
  },
  {
    title: "Finish at the 5-Stand",
    text: "We wrap up at the 5-Stand, where targets come from several directions and it is easy to shoot a few more.",
  },
];

const bring = [
  { label: "Valid ID", note: "Required for every shooter" },
  { label: "Closed-toe shoes", note: "Required on the course" },
  { label: "Clothes for the weather", note: "You will be outside and walking" },
  { label: "Your own shotgun", note: "Optional; shotgun rental is included with Member for a Day" },
];

const included = [
  "Shotgun rental",
  "Shells",
  "Eye and ear protection",
];

const faqs = [
  {
    question: "What does a first visit cost?",
    answer:
      "A tour of Traditions is complimentary: no cost, no commitment. If you want to shoot, Member for a Day is $100 per shooter. Shotgun rental, shells, and eye and ear protection all included.",
  },
  {
    question: "Where are you?",
    answer:
      "Traditions is a private sporting clays and outdoor club, a scenic drive through the Lowcountry, about an hour from Hilton Head, Bluffton, Beaufort and Edisto.",
  },
  {
    question: "Do I need experience?",
    answer:
      "No. Beginners are welcome. We start with a safety walk-through and stay with you on the course.",
  },
  {
    question: "How long should I plan for?",
    answer:
      "A tour takes about an hour. A Member for a Day visit runs roughly 2 hours, including the safety walk-through, a guided round and time at the 5-Stand.",
  },
  {
    question: "Can I bring my children?",
    answer:
      "Yes. Shooters under 18 are welcome when accompanied by a parent or guardian at all times.",
  },
  {
    question: "What if I don't have a shotgun?",
    answer:
      "You don't need one. Member for a Day includes shotgun rental, shells, and eye and ear protection.",
  },
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-4">
      <span className={`h-[1px] w-12 md:w-20 ${light ? "bg-[#f5f2ec]/30" : "bg-[#162838]/20"}`}></span>
      <span className={`text-sm tracking-[0.3em] uppercase ${light ? "text-[#f5f2ec]/70" : "text-[#a75235]"}`}>{children}</span>
      <span className={`h-[1px] w-12 md:w-20 ${light ? "bg-[#f5f2ec]/30" : "bg-[#162838]/20"}`}></span>
    </div>
  );
}

function Rule() {
  return (
    <div className="flex justify-center my-5">
      <span className="h-[1px] w-16 bg-[#a75235]"></span>
    </div>
  );
}

const btnPrimary =
  "inline-block bg-[#a75235] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] transition-colors rounded-lg text-center";
const btnOutline =
  "inline-block border-2 border-[#162838] text-[#162838] px-8 py-3 font-semibold tracking-wide hover:bg-[#162838] hover:text-[#f5f2ec] transition-colors rounded-lg text-center";
const btnLight =
  "inline-block bg-transparent border-2 border-[#f5f2ec] text-[#f5f2ec] px-8 py-3 font-semibold tracking-wide hover:bg-[#f5f2ec] hover:text-[#4d5c47] transition-colors rounded-lg text-center";

export default function FirstTime() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AnnouncementBar />
      <Header />

      <main id="main" className="flex-grow">
        {/* Hero */}
        <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end">
          <FadeImage
            src="/media/first-time-hero.webp"
            alt="Sunset over a field and longleaf pines at Traditions Field Club"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#162838]/85 via-[#162838]/35 to-transparent"></div>
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#162838]/70 to-transparent"></div>
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 md:pb-20 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#f5f2ec] mb-4 tracking-wide" style={heading}>
              Your First Visit
            </h1>
            <p className="text-lg md:text-xl text-[#f5f2ec] max-w-2xl mx-auto opacity-90">
              New to sporting clays, or just new to Traditions. Here is what a first visit looks like and how to start.
            </p>
          </div>
        </section>

        {/* Two ways to start */}
        <section id="start" className="py-16 md:py-20 bg-[#f5f2ec]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <Eyebrow>Two Ways to Start</Eyebrow>
              <h2 className="text-3xl md:text-4xl text-[#162838]" style={heading}>Come See It, or Come Shoot</h2>
              <Rule />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-7 md:p-9 flex flex-col">
                <p className="text-[#a75235] text-sm tracking-[0.2em] uppercase mb-2">Complimentary</p>
                <h3 className="text-2xl md:text-3xl text-[#162838] mb-3" style={heading}>Tour Traditions</h3>
                <p className="text-[#333333] leading-relaxed mb-4">
                  Walk the grounds with one of us, see the courses and the pavilion, and get your questions answered.
                </p>
                <ul className="text-[#333333] space-y-1 mb-7">
                  <li>About an hour</li>
                  <li>No cost, no commitment</li>
                </ul>
                <a href="/tour#book" className={`${btnOutline} mt-auto`} style={heading}>Book a Tour</a>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-[#e8e4dc] p-7 md:p-9 flex flex-col">
                <p className="text-[#a75235] text-sm tracking-[0.2em] uppercase mb-2">$100 per shooter</p>
                <h3 className="text-2xl md:text-3xl text-[#162838] mb-3" style={heading}>Member for a Day</h3>
                <p className="text-[#333333] leading-relaxed mb-4">
                  Shoot the course the way our members do, with one of us alongside you.
                </p>
                <ul className="text-[#333333] space-y-1 mb-7">
                  <li>Shotgun rental, shells, and eye and ear protection all included</li>
                </ul>
                <a href="/member-for-a-day#book" className={`${btnPrimary} mt-auto`} style={heading}>Book Member for a Day</a>
              </div>
            </div>
          </div>
        </section>

        {/* Welcome from Jim and Brian */}
        <section id="welcome" className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <Eyebrow>Welcome</Eyebrow>
              <h2 className="text-3xl md:text-4xl text-[#162838]" style={heading}>You&apos;ll Be Shooting With Us</h2>
              <Rule />
              <p className="text-lg text-[#333333] leading-relaxed max-w-2xl mx-auto">
                Traditions is our club. When you come out for the first time, one of us will be the person who meets you.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              {[
                { name: "Jim Nicholson", src: "/media/first-time-jim.webp", alt: "Jim Nicholson at a shooting stand at Traditions Field Club", role: "Co-founder" },
                { name: "Brian Seifrit", src: "/media/first-time-brian.webp", alt: "Brian Seifrit at a shooting stand at Traditions Field Club", role: "Co-founder" },
              ].map((p) => (
                <figure key={p.name} className="text-center">
                  <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-sm">
                    <FadeImage src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 50vw, 460px" className="object-cover" />
                  </div>
                  <figcaption className="mt-4">
                    <span className="block text-xl md:text-2xl text-[#162838]" style={heading}>{p.name}</span>
                    <span className="block text-sm tracking-[0.2em] uppercase text-[#a75235] mt-1">{p.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* The first visit */}
        <section id="visit" className="py-16 md:py-24 bg-[#f5f2ec]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Eyebrow>What to Expect</Eyebrow>
              <h2 className="text-3xl md:text-4xl text-[#162838]" style={heading}>How a First Visit Goes</h2>
              <Rule />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start">
              <ol className="space-y-7">
                {visit.map((v, i) => (
                  <li key={v.title} className="flex gap-5">
                    <span className="w-10 h-10 rounded-full bg-[#162838] text-[#f5f2ec] flex items-center justify-center flex-shrink-0 font-semibold" style={heading}>
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-xl text-[#162838] mb-1" style={heading}>{v.title}</h3>
                      <p className="text-[#333333] leading-relaxed">{v.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative col-span-2 aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                  <FadeImage src="/media/first-time-stand-sunset.webp" alt="A covered shooting stand at sunset on the course" fill sizes="(max-width: 768px) 100vw, 560px" className="object-cover" />
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                  <FadeImage src="/media/first-time-shooter-adult.webp" alt="A shooter with eye and ear protection taking a shot from a stand" fill sizes="(max-width: 768px) 50vw, 280px" className="object-cover" />
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm">
                  <FadeImage src="/media/first-time-bridge.webp" alt="A footbridge over the river on the Riverside course" fill sizes="(max-width: 768px) 50vw, 280px" className="object-cover" />
                </div>
                <p className="col-span-2 text-xs italic text-[#333333]/60 text-right">Some images digitally edited.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What to bring */}
        <section id="bring" className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <Eyebrow>Be Prepared</Eyebrow>
              <h2 className="text-3xl md:text-4xl text-[#162838]" style={heading}>What to Bring</h2>
              <Rule />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ul className="space-y-4 text-[#333333]">
                {bring.map((b) => (
                  <li key={b.label} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#4d5c47] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f5f2ec]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span><strong>{b.label}</strong>: {b.note}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-[#f5f2ec] border border-[#4d5c47]/20 rounded-lg p-6">
                <h3 className="text-lg text-[#162838] mb-3" style={heading}>Included With Member for a Day</h3>
                <ul className="space-y-2 text-[#333333]">
                  {included.map((x) => (
                    <li key={x} className="flex items-start gap-2">
                      <span className="text-[#a75235]">&#8226;</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-[#333333]/80 mt-4">$100 per shooter.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 md:py-24 bg-[#f5f2ec]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <Eyebrow>Common Questions</Eyebrow>
              <h2 className="text-3xl md:text-4xl text-[#162838]" style={heading}>First Time FAQs</h2>
              <Rule />
            </div>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details key={f.question} className="group bg-white rounded-lg shadow-sm border border-[#e8e4dc] overflow-hidden">
                  <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#f5f2ec]/50">
                    <span className="text-lg text-[#162838] font-semibold" style={heading}>{f.question}</span>
                    <svg className="w-5 h-5 text-[#a75235] transition-transform group-open:rotate-180 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-5 text-[#333333] leading-relaxed border-t border-[#e8e4dc]">
                    <p className="pt-4">{f.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="py-16 md:py-20 bg-[#4d5c47]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Eyebrow light>Get Started</Eyebrow>
            <h2 className="text-3xl md:text-4xl text-[#f5f2ec]" style={heading}>Ready for Your First Visit?</h2>
            <Rule />
            <p className="text-[#f5f2ec] opacity-90 max-w-2xl mx-auto mb-8">
              Book a complimentary tour or a Member for a Day, and sign the waiver ahead of time if you like. We&apos;ll see you out there.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <a href="/tour#book" className={btnLight} style={heading}>Book a Tour</a>
              <a href="/member-for-a-day#book" className={btnPrimary} style={heading}>Book Member for a Day</a>
              <a href="/waiver" className={btnLight} style={heading}>Sign Our Waiver</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
