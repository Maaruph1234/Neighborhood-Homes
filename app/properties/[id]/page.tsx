"use client";
import { notFound } from "next/navigation";
import { use } from "react";
import { properties } from "../../data";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PropertyGallery from "./sections/PropertyGallery";
import PropertyInfo from "./sections/PropertyInfo";
import PropertyEnquiry from "./sections/PropertyEnquiry";
import PropertyBreadcrumb from "./sections/PropertyBreadcrumb";

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = properties.find((p) => p.id === parseInt(id));
  if (!property) notFound();

  return (
    <main>
      <Navbar />
      <div className="pt-[80px] bg-white">
        <PropertyBreadcrumb property={property} />
        <PropertyGallery property={property} />
        <div className="px-[5vw] py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <PropertyInfo property={property} />
            </div>
            <div className="lg:col-span-1">
              <PropertyEnquiry property={property} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
