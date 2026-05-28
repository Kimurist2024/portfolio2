import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Journal } from "@/components/Journal";
import { Marquee } from "@/components/Marquee";
import { Navigation } from "@/components/Navigation";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Works } from "@/components/Works";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Navigation />
      <main className="relative w-full">
        <Hero />
        <Marquee />
        <About />
        <Works />
        <Journal />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
