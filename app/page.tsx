"use client";

import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import TickerTape from "./components/TickerTape";
import SearchBar from "./sections/SearchBar";
import FeaturedProperties from "./sections/FeaturedProperties";
import About from "./sections/About";
import Cities from "./sections/Cities";
import Services from "./sections/Services";
import HowItWorks from "./sections/HowItWorks";
import Stats from "./sections/Stats";
import Testimonials from "./sections/Testimonials";
import Newsletter from "./sections/Newsletter";
import CTA from "./sections/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TickerTape />
      <SearchBar />
      <FeaturedProperties />
      <About />
      <Cities />
      <Services />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <Newsletter />
      <CTA />
      <Footer />
    </main>
  );
}
