"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutHero from "./sections/AboutHero";
import OurStory from "./sections/OurStory";
import MissionValues from "./sections/MissionValues";
import Timeline from "./sections/Timeline";
import EcosystemSection from "./sections/EcosystemSection";
import TeamPreview from "./sections/TeamPreview";
import AboutCTA from "./sections/AboutCTA";

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <OurStory />
      <MissionValues />
      <Timeline />
      <EcosystemSection />
      <TeamPreview />
      <AboutCTA />
      <Footer />
    </main>
  );
}
