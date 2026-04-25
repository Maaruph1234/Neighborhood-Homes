import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Neighbourhood Homes Ecosystem Ltd | Premium Real Estate Nigeria",
  description: "Nigeria's premier property ecosystem — connecting discerning clients with exceptional properties across Abuja, Lagos, Kaduna, and Kano.",
  keywords: "real estate Nigeria, property Abuja, houses Lagos, luxury homes Nigeria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
