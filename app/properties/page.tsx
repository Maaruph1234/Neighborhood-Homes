"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertiesHero from "./sections/PropertiesHero";
import PropertiesListing from "./sections/PropertiesListing";

export default function PropertiesPage() {
  return (
    <main>
      <Navbar />
      <PropertiesHero />
      <PropertiesListing />
      <Footer />
    </main>
  );
}
