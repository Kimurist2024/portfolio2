import { AboutMe } from "@/components/AboutMe";
import { Contact } from "@/components/Contact";
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
      <div className="lg:flex">
        <div className="lg:fixed lg:inset-y-0 lg:left-0 lg:z-10 lg:w-2/5">
          <SidePanel />
        </div>

        <main className="relative w-full lg:ml-[40%] lg:w-3/5">
          {/* Opening statement */}
          <section className="px-6 pt-24 pb-4 lg:px-14 lg:pt-28">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-[var(--color-text-muted)]">
              Portfolio — 2026
            </p>
            <p className="mt-5 max-w-2xl font-serif text-[clamp(1.6rem,1rem+2.2vw,2.6rem)] italic leading-[1.2] text-[var(--color-text)]">
              Build what others imagine.
            </p>
          </section>

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
