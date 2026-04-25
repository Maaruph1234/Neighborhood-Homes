-- ============================================================
-- NEIGHBOURHOOD HOMES ECOSYSTEM — SUPABASE SCHEMA
-- Run this entire script in your Supabase SQL Editor once.
-- ============================================================

-- PROPERTIES
create table if not exists public.properties (
  id          bigserial primary key,
  name        text not null,
  location    text not null,
  city        text not null check (city in ('Abuja', 'Lagos', 'Kaduna', 'Kano')),
  price       text not null,
  badge       text not null,
  badge_type  text not null check (badge_type in ('sale', 'land', 'construction')),
  type        text not null check (type in ('house', 'land')),
  beds        int not null default 0,
  baths       int not null default 0,
  sqm         int not null default 0,
  image       text not null default '',
  description text,
  featured    boolean not null default false,
  created_at  timestamptz default now()
);

-- ENQUIRIES
create table if not exists public.enquiries (
  id            bigserial primary key,
  name          text not null,
  email         text not null,
  phone         text not null default '',
  interest      text not null default '',
  message       text not null,
  recipient     text not null check (recipient in ('homes', 'solicitors')) default 'homes',
  property_id   bigint references public.properties(id) on delete set null,
  property_name text,
  read          boolean not null default false,
  created_at    timestamptz default now()
);

-- TESTIMONIALS
create table if not exists public.testimonials (
  id         bigserial primary key,
  name       text not null,
  role       text not null,
  text       text not null,
  image      text default '',
  featured   boolean not null default true,
  created_at timestamptz default now()
);

-- STORAGE BUCKET for property images
insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict do nothing;

-- RLS (Row Level Security) — allow public reads, restrict writes to authenticated users

alter table public.properties enable row level security;
alter table public.enquiries enable row level security;
alter table public.testimonials enable row level security;

-- Properties: anyone can read, only authenticated users can write
create policy "Public can read properties"
  on public.properties for select using (true);
create policy "Auth users can insert properties"
  on public.properties for insert to authenticated with check (true);
create policy "Auth users can update properties"
  on public.properties for update to authenticated using (true);
create policy "Auth users can delete properties"
  on public.properties for delete to authenticated using (true);

-- Enquiries: only authenticated users can read/write
create policy "Auth users can read enquiries"
  on public.enquiries for select to authenticated using (true);
create policy "Public can insert enquiries"
  on public.enquiries for insert with check (true);
create policy "Auth users can update enquiries"
  on public.enquiries for update to authenticated using (true);
create policy "Auth users can delete enquiries"
  on public.enquiries for delete to authenticated using (true);

-- Testimonials: anyone can read featured, only auth users can write
create policy "Public can read testimonials"
  on public.testimonials for select using (true);
create policy "Auth users can insert testimonials"
  on public.testimonials for insert to authenticated with check (true);
create policy "Auth users can update testimonials"
  on public.testimonials for update to authenticated using (true);
create policy "Auth users can delete testimonials"
  on public.testimonials for delete to authenticated using (true);

-- Storage: anyone can read, only authenticated users can upload
create policy "Public can read property images"
  on storage.objects for select using (bucket_id = 'property-images');
create policy "Auth users can upload property images"
  on storage.objects for insert to authenticated with check (bucket_id = 'property-images');
create policy "Auth users can delete property images"
  on storage.objects for delete to authenticated using (bucket_id = 'property-images');

-- SEED: add the existing properties from data.ts so the site shows them immediately
insert into public.properties (name, location, city, price, badge, badge_type, type, beds, baths, sqm, image, featured) values
  ('Maitama Heritage Residence', 'Maitama, Abuja', 'Abuja', '₦185M', 'For Sale', 'sale', 'house', 5, 4, 420, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80', true),
  ('Asokoro Grand Villa', 'Asokoro, Abuja', 'Abuja', '₦320M', 'Under Construction', 'construction', 'house', 6, 6, 680, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80', true),
  ('Ikoyi Luxury Terrace', 'Ikoyi, Lagos', 'Lagos', '₦220M', 'For Sale', 'sale', 'house', 4, 4, 380, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=700&q=80', true),
  ('Lekki Phase 1 Duplex', 'Lekki Phase 1, Lagos', 'Lagos', '₦95M', 'For Sale', 'sale', 'house', 4, 3, 290, 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=80', false),
  ('Kaduna GRA Residential Plot', 'GRA, Kaduna', 'Kaduna', '₦18M', 'Land', 'land', 'land', 0, 0, 900, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=80', false),
  ('Wuse II Commercial Plot', 'Wuse II, Abuja', 'Abuja', '₦45M', 'Land', 'land', 'land', 0, 0, 600, 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=700&q=80', false),
  ('Kano New Estate Development', 'Nassarawa GRA, Kano', 'Kano', '₦62M', 'Under Construction', 'construction', 'house', 3, 3, 240, 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80', false),
  ('Victoria Island Corner Plot', 'Victoria Island, Lagos', 'Lagos', '₦130M', 'Land', 'land', 'land', 0, 0, 1200, 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=700&q=80', false),
  ('Garki Diplomat Mansion', 'Garki, Abuja', 'Abuja', '₦250M', 'For Sale', 'sale', 'house', 6, 5, 560, 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&q=80', true),
  ('Kaduna South Family Home', 'Kaduna South, Kaduna', 'Kaduna', '₦55M', 'For Sale', 'sale', 'house', 4, 3, 300, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&q=80', false),
  ('Kano Commercial Land', 'Fagge, Kano', 'Kano', '₦28M', 'Land', 'land', 'land', 0, 0, 750, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=80', false);

-- SEED: add existing testimonials
insert into public.testimonials (name, role, text, image, featured) values
  ('Mr. Jerry Tunde', 'Business Executive, Abuja', 'Working with Neighbourhood Homes was the best decision I made this year. They found me a stunning property in Maitama within two weeks. Honest, efficient and truly professional.', 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&q=80', true),
  ('Mrs. Ngozi Abara', 'Business Owner, Lagos', 'I invested in two properties through NHE and the ROI has been exceptional. Their investment analysis team is second to none in Nigeria. I trust them completely with my portfolio.', 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80', true),
  ('Alhaji Isah Bamanga', 'Investor, Kaduna', 'Neighbourhood Homes helped me secure a prime commercial plot in Kaduna. The documentation process was seamless — Neighbourhood Solicitors handled everything perfectly.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', true);
