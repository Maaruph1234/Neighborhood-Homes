export type BadgeType = "sale" | "land" | "construction";
export type PropertyType = "house" | "land";

export interface Property {
  id: number;
  name: string;
  location: string;
  city: "Abuja" | "Lagos" | "Kebbi";
  price: string;
  badge: string;
  badge_type: BadgeType;
  type: PropertyType;
  beds: number;
  baths: number;
  sqm: number;
  image: string;
  description?: string;
  featured: boolean;
  created_at: string;
}

export interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  recipient: "homes" | "solicitors";
  property_id?: number;
  property_name?: string;
  read: boolean;
  created_at: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  image?: string;
  featured: boolean;
  created_at: string;
}
