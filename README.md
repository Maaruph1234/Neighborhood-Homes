# Neighbourhood Homes Ecosystem Ltd
## Premium Real Estate Website — Next.js + Tailwind + Framer Motion

---

### 🚀 Quick Start

**1. Install dependencies**
```bash
npm install
```

**2. Start the development server**
```bash
npm run dev
```

**3. Open in browser**
```
http://localhost:3000
```

---

### 🛠 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 14.2.5 | Framework (App Router) |
| React | 18 | UI Library |
| TypeScript | 5 | Type Safety |
| Tailwind CSS | 3.4 | Utility Styling |
| Framer Motion | 11 | Animations |
| Lucide React | 0.400 | Icons |

---

### 📁 Project Structure

```
neighbourhood-homes/
├── app/
│   ├── components/
│   │   ├── FadeIn.tsx          # Reusable animation wrapper
│   │   ├── Footer.tsx          # Site footer
│   │   ├── Navbar.tsx          # Sticky nav with scroll effect
│   │   ├── PropertyCard.tsx    # Property listing card
│   │   ├── SectionLabel.tsx    # Gold eyebrow labels
│   │   └── TickerTape.tsx      # Scrolling marquee
│   ├── sections/
│   │   ├── Hero.tsx            # Full-screen hero with parallax
│   │   ├── SearchBar.tsx       # Property search form
│   │   ├── FeaturedProperties.tsx
│   │   ├── About.tsx           # Overlapping images + features
│   │   ├── Cities.tsx          # City grid
│   │   ├── Services.tsx        # Services with hover flip
│   │   ├── HowItWorks.tsx      # 4-step process
│   │   ├── Stats.tsx           # Animated counters
│   │   ├── Agents.tsx          # Agent cards
│   │   ├── Testimonials.tsx    # Client reviews
│   │   ├── Newsletter.tsx      # Email subscription
│   │   └── CTA.tsx             # Final call-to-action
│   ├── data.ts                 # All content data
│   ├── globals.css             # Global styles + fonts
│   ├── layout.tsx              # Root layout + metadata
│   └── page.tsx                # Main page assembly
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── package.json
```

---

### 🎨 Design System

**Color Palette**
- Navy Deep: `#071629`
- Navy: `#0B1F3A`
- Gold: `#C9A84C`
- Gold Light: `#E8C97A`
- Cream: `#F9F6F0`

**Typography**
- Headings: Cormorant Garamond (serif, loaded from Google Fonts)
- Body: DM Sans (loaded from Google Fonts)

---

### 🔧 Customisation

**Swap property data** → edit `app/data.ts`

**Change colours** → edit CSS variables in `app/globals.css` or color values in `tailwind.config.ts`

**Add pages** → create folders inside `app/` (e.g. `app/properties/page.tsx`)

---

### 📦 Build for Production

```bash
npm run build
npm start
```

---

### ⚠️ Notes

- Images are loaded from Unsplash CDN — replace with your own in `data.ts`
- Fonts load from Google Fonts — internet connection required in development
- The project uses Next.js App Router (no `pages/` directory)

---

## Environment

Create a `.env.local` in the project root (this file is gitignored). At minimum set:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key> # server-side only
ADMIN_SECRET=<random-string-for-admin>
```

Keep the service role key secret. Do not commit `.env.local` to git.

## Deployment

We recommend deploying to Vercel. Configure the same environment variables in the Vercel dashboard for your project (Settings → Environment Variables). After merging the branch, a Vercel deployment will automatically build the project.

Alternatively, to deploy manually:

```bash
npm run build
npm run start
```

## CI

Create a GitHub Actions workflow to validate pull requests. Example (optional):

`.github/workflows/ci.yml`:

```yaml
name: CI

on:
	pull_request:
		branches: [ main ]

jobs:
	build:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v4
			- name: Use Node.js
				uses: actions/setup-node@v4
				with:
					node-version: 20
			- run: npm ci
			- run: npm run build
```
