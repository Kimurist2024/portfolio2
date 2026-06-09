import { AboutMe } from "@/components/AboutMe";
import { Contact } from "@/components/Contact";
import { CredibilityStrip } from "@/components/CredibilityStrip";
import { ExperienceList } from "@/components/ExperienceList";
import { Footer } from "@/components/Footer";
import { Intro } from "@/components/Intro";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SidePanel } from "@/components/SidePanel";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WritingList } from "@/components/WritingList";

export default function Home() {
  return (
    <>
      <Intro />
      <SmoothScroll />

      {/* Fixed identity panel (left) + scrollable activity (right) */}
      <div id="top" className="lg:flex">
        <div className="lg:fixed lg:inset-y-0 lg:left-0 lg:z-10 lg:w-2/5">
          <SidePanel />
        </div>

        <main className="relative w-full lg:ml-[40%] lg:w-3/5">
          {/* Opening statement — what this page is */}
          <section className="px-[var(--gutter)] pt-24 pb-12 lg:pt-28 lg:pb-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
              Portfolio — 2026
            </p>
            <h2 className="mt-6 max-w-2xl font-serif text-[var(--text-section)] font-normal italic leading-[1.18] text-[var(--color-text)]">
              研究・インターン・コンペティション、
              <br className="hidden sm:block" />
              つくってきたものの記録。
            </h2>
          </section>

          <CredibilityStrip />
          <AboutMe />
          <ExperienceList />
          <ProjectGrid />
          <WritingList />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
}
