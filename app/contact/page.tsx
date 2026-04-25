"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactHero from "./sections/ContactHero";
import ContactMain from "./sections/ContactMain";
import ContactOffices from "./sections/ContactOffices";
import ContactFAQ from "./sections/ContactFAQ";

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactHero />
      <ContactMain />
      <ContactOffices />
      <ContactFAQ />
      <Footer />
    </main>
  );
}
