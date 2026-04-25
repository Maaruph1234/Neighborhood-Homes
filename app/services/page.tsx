"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServicesHero from "./sections/ServicesHero";
import ServicesOverview from "./sections/ServicesOverview";
import ServiceDetail from "./sections/ServiceDetail";
import SolicitorsBand from "./sections/SolicitorsBand";
import ServicesCTA from "./sections/ServicesCTA";

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <ServicesHero />
      <ServicesOverview />
      <ServiceDetail />
      <SolicitorsBand />
      <ServicesCTA />
      <Footer />
    </main>
  );
}
