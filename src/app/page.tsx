import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import ZoomParallaxSection from "@/components/sections/ZoomParallaxSection";
import Pricing from "@/components/sections/Pricing";
import AboutAnimation from "@/components/sections/AboutAnimation";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
import StatsStrip from "@/components/sections/StatsStrip";
import Contact from "@/components/sections/Contact";
import RealTimeClock from "@/components/RealTimeClock";

export default function Home() {
  return (
    <>
      <Hero />
      <RealTimeClock />
      <Services />
      <ZoomParallaxSection />
      <Pricing />
      <AboutAnimation />
      <Features />
      <Testimonials />
      <StatsStrip />
      {/* Contact + footer sweep container */}
      <div className="relative z-0 mb-[-100vh] bg-black">
        {/* Contact scrolls naturally — no sticky so full section (including map) is always visible */}
        <Contact />
        {/* h-[200vh] spacer: footer only starts appearing after 100vh of scroll past Contact
            (because mb-[-100vh] offsets 100vh, leaving 100vh of clean overlap animation) */}
        <div className="h-[200vh]" />
      </div>
    </>
  );
}

