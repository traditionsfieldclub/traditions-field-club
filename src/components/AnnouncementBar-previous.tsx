'use client';

export default function AnnouncementBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60]">
      <a
        href="/roadmap#progress"
        className="block bg-[#162838] text-[#f5f2ec] py-2 text-center hover:bg-[#1e3a50] transition-colors"
      >
        <span
          className="text-xs font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: "var(--font-heading), serif" }}
        >
          🔨 SEE OUR PROGRESS — Click here
        </span>
      </a>
    </div>
  );
}
