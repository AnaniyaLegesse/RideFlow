# 🚗 RideFlow - Car Rental Marketplace with Crypto Payments

<p align="center">
  <img src="https://i.postimg.cc/28SLfzJ5/Screenshot-2026-06-06-at-10-38-08-PM.png" alt="RideFlow Screenshot" width="100%" />
</p>

<p align="center">
  <strong>Modern car rental marketplace with cryptocurrency payments, role-based access control, fleet management, booking workflows, analytics, and a complete admin dashboard.</strong>
</p>

<p align="center">
  <a href="https://ride-floww.vercel.app/">Live Demo</a> •
  <a href="https://github.com/AnaniyaLegesse/RideFlow/tree/main/client">Frontend Repository</a> •
  <a href="https://rideflow-production-492a.up.railway.app/api/docs">API Documentation</a> 
</p>

---

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue?logo=postgresql)
![MongoDB](https://img.shields.io/badge/MongoDB-green?logo=mongodb)
![Prisma](https://img.shields.io/badge/Prisma-black?logo=prisma)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)
![Railway](https://img.shields.io/badge/Backend-Railway-purple?logo=railway)

---

## 📖 Overview

RideFlow is a full-stack car rental marketplace that enables customers to browse vehicles, create bookings, and complete payments using cryptocurrency. The platform includes dedicated dashboards for customers, sales agents, and administrators, providing comprehensive fleet management, booking workflows, analytics, and user administration.

The frontend is built with **Next.js 15** and **TypeScript**, while the backend provides a REST API powered by **Node.js**, **Prisma**, **PostgreSQL**, and **MongoDB**.

---

## ✨ Features

### Customer Features

- Browse vehicles with advanced filtering
- Vehicle detail pages and booking flow
- User account management
- Booking history dashboard
- Cryptocurrency payments via MetaMask
- Manual crypto payment submissions
- Public blog and educational content

### Sales Agent Features

- Manage vehicles
- View and manage bookings
- Approve manual payment requests
- Handle customer inquiries
- Fleet performance visibility

### Administrator Features

- Complete fleet management (CRUD)
- User management and role assignment
- Booking administration
- Blog management
- Revenue analytics
- Fleet analytics
- Manual crypto payment verification
- System-wide access control

---

## 💳 Crypto Payment Support

| Method | Description |
|----------|-------------|
| MetaMask ETH | Instant blockchain transaction with automatic booking confirmation |
| Manual Crypto | Customer submits payment proof for admin approval |

### Supported Assets

- ETH
- BTC
- USDC
- SOL

---

## 🏗 System Architecture

```text
┌──────────────────────┐
│      Frontend        │
│  Next.js 15 + TS     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      REST API        │
│ Express + Prisma     │
└──────────┬───────────┘
           │
     ┌─────┴─────┐
     ▼           ▼
 PostgreSQL    MongoDB
 Users         Vehicles
 Bookings      Content
 Analytics
```

---

# 🖥 Frontend

## Live Demo

https://ride-floww.vercel.app/

## Tech Stack

| Layer | Technology |
|---------|------------|
| Framework | Next.js 15 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State Management | React Hooks |
| Data Fetching | React Query |
| Wallet Integration | wagmi + viem |
| Deployment | Vercel |

---

## Frontend Setup

### Requirements

- Node.js v20+
- npm or yarn

### Installation

```bash
git clone https://github.com/AnaniyaLegesse/RideFlow.git
cd rideflow-frontend

npm install
```

### Environment Variables

Create:

```env
.env.local
```

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url/api
NEXT_PUBLIC_SITE_URL=https://rideflow-production-492a.up.railway.app/api/
```

### Run Development Server

```bash
npm run dev
```

Visit:

```text
http://localhost:3000
```

---

## Frontend Structure

```text
src/
├── app/
│   ├── admin/
│   ├── dashboard/
│   ├── blog/
│   ├── fleetcatalog/
│   ├── login/
│   └── signup/
│
├── components/
├── features/
├── hooks/
├── lib/
└── styles/
```

---

# ⚙ Backend

## Live API

https://rideflow-production-492a.up.railway.app/api/docs

## API Documentation

https://rideflow-production-492a.up.railway.app/api/docs

---

## Tech Stack

| Layer | Technology |
|---------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| ORM | Prisma |
| Database | PostgreSQL |
| Secondary Database | MongoDB |
| Authentication | JWT |
| File Storage | Cloudinary |
| Deployment | Railway |

---

## Backend Setup

### Requirements

- Node.js v20+
- Git

### Installation

```bash
git clone https://github.com/Amanuel088/RideFlow.git
cd RideFlow

npm install

cp .env.example .env

npx prisma generate

npm run dev
```

### Health Check

```text
http://localhost:4000/api/health
```

---

## Backend Environment Variables

```env
NODE_ENV=development
PORT=4000

APP_NAME=CarRentalBackend

DATABASE_URL=
DIRECT_URL=

MONGODB_URI=

JWT_SECRET=
JWT_EXPIRES_IN=7d

BCRYPT_ROUNDS=12

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

# 🔌 API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

## Vehicles

```http
GET    /api/vehicles
GET    /api/vehicles/:id
POST   /api/vehicles
PUT    /api/vehicles/:id
DELETE /api/vehicles/:id
```

## Bookings

```http
POST   /api/bookings
GET    /api/bookings/my
GET    /api/bookings/:id
PATCH  /api/bookings/:id/status
GET    /api/bookings
```

## Inquiries

```http
POST   /api/inquiries
GET    /api/inquiries/my
GET    /api/inquiries/:id
POST   /api/inquiries/:id/reply
PATCH  /api/inquiries/:id/status
GET    /api/inquiries
```

## Analytics

```http
GET /api/analytics/overview
GET /api/analytics/revenue
GET /api/analytics/most-booked
GET /api/analytics/fleet
GET /api/analytics/recent-bookings
```

---

# 👥 Role-Based Access

| Permission | Customer | Sales Agent | Admin |
|------------|----------|------------|--------|
| Browse Vehicles | ✅ | ✅ | ✅ |
| Create Booking | ✅ | ✅ | ✅ |
| View Own Bookings | ✅ | ✅ | ✅ |
| View All Bookings | ❌ | ✅ | ✅ |
| Manage Vehicles | ❌ | ✅ | ✅ |
| Manage Blog | ❌ | ❌ | ✅ |
| Manage Users | ❌ | ❌ | ✅ |
| View Analytics | ❌ | ✅ | ✅ |
| Verify Payments | ❌ | ✅ | ✅ |

---

# 🧪 Testing Crypto Payments

## MetaMask (Sepolia Testnet)

1. Install MetaMask
2. Switch to the Sepolia test network
3. Get free test ETH from a faucet
4. Connect wallet during checkout
5. Click **Pay with ETH**
6. Booking is automatically confirmed after transaction verification

## Manual Crypto Payment

1. Select ETH, BTC, USDC, or SOL
2. Copy the deposit address
3. Send payment from your preferred wallet
4. Submit payment confirmation
5. Admin verifies the transaction
6. Booking status is updated

---

# 🔍 Vehicle Filters

Example:

```http
GET /api/vehicles?category=suv&fuelType=electric&minPrice=50&maxPrice=200&isAvailable=true&page=1&limit=10
```

### Categories

- economy
- compact
- suv
- luxury
- van
- electric
- convertible

### Fuel Types

- petrol
- diesel
- electric
- hybrid

### Transmission

- manual
- automatic

---

# 🚀 Deployment

## Frontend

```bash
vercel --prod
```

## Backend

Deploy using Railway and configure the required environment variables.

---

# ⚠ Known Limitations

- Blog images currently require URL input
- Vehicle placeholder fields are pending backend support
- CoinGecko pricing data may experience minor delays
- Manual crypto payments require administrator verification
- Automated blockchain payment monitoring is not yet implemented

---

# 🔎 SEO & Metadata Configuration

RideFlow's frontend is built on Next.js 15 App Router, which means metadata is configured per-route using the `Metadata` API and `generateMetadata()` for dynamic pages. This section documents every layer of SEO implemented on the platform — from base meta tags through to structured data, sitemaps, and social sharing previews — so the configuration can be maintained, extended, and audited consistently.

## Why This Matters for RideFlow

RideFlow sits in a low-competition keyword niche — vehicle rental combined with cryptocurrency payments. Search terms like `rent a car with crypto`, `pay car rental with MetaMask`, and `vehicle rental ETH payment` currently have little to no dedicated competition. Correct technical SEO is the difference between RideFlow being fully indexed and ranking for this niche, or being invisible to search engines entirely.

> **Critical architectural note:** Every route under `src/app/` that needs to be indexed (homepage, `/fleetcatalog`, `/fleetcatalog/[id]`, `/blog`, `/blog/[slug]`, `/faq`) **must remain a Server Component**. Do not add `'use client'` to any `page.tsx` file in these routes — doing so causes Googlebot to receive an empty HTML shell, since the content would only render after client-side JavaScript executes. All interactive logic (filters, accordions, wallet connection buttons, booking forms) must be isolated into separate Client Components inside `src/features/**`, imported and rendered by the Server Component page. This is the single most important rule in this section.

---

## Meta Tags

### Root Layout Metadata

Base metadata is defined once in `src/app/layout.tsx` and inherited by every page via the `title.template` pattern. Individual pages override `title` and `description` as needed.

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ride-floww.vercel.app'
const SITE_NAME = 'RideFlow'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} — Browse, Rent & Buy Vehicles. Pay with Crypto`,
    template: `%s | ${SITE_NAME}`,
  },

  description:
    'RideFlow is a car rental marketplace with cryptocurrency payments. Browse SUVs, sedans, electric and luxury vehicles. Pay with ETH, BTC, USDC or SOL via MetaMask or manual transfer.',

  keywords: [
    'car rental marketplace',
    'rent a car with crypto',
    'pay car rental with MetaMask',
    'ETH car rental',
    'BTC vehicle booking',
    'USDC car payment',
    'vehicle rental Sepolia testnet',
    'crypto car marketplace',
    'electric car rental',
    'luxury car rental',
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: 'automotive',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },
}
```

### Per-Page Metadata (Static Routes)

Each static route exports its own `metadata` object, which is merged with and overrides the root layout's title template.

| Route | Title | Robots |
|---|---|---|
| `/` (homepage) | `RideFlow — Browse, Rent & Buy Vehicles. Pay with Crypto` | `index, follow` |
| `/fleetcatalog` | `Browse All Vehicles — Filter by Category, Fuel & Price` | `index, follow` |
| `/blog` | `Blog — Vehicle Rental Tips, Crypto Payments & Web3 Guides` | `index, follow` |
| `/faq` | `FAQ — Rentals, Crypto Payments & Blockchain Explained` | `index, follow` |
| `/login`, `/signup` | `Login` / `Sign Up` | `noindex, nofollow` |
| `/dashboard/**` | `My Dashboard` | `noindex, nofollow` |
| `/admin/**` | `Admin` | `noindex, nofollow` |

Example for `src/app/fleetcatalog/page.tsx`:

```typescript
// src/app/fleetcatalog/page.tsx
import type { Metadata } from 'next'
import { FleetCatalogClient } from '@/features/fleet-catalog/components/FleetCatalogClient'

export const metadata: Metadata = {
  title: 'Browse All Vehicles — Filter by Category, Fuel & Price',
  description:
    'Rent or buy from RideFlow\'s full fleet. Filter by category, fuel type, transmission, and price. Pay with ETH, BTC, USDC, or SOL.',
  alternates: { canonical: '/fleetcatalog' },
}

// Vehicle data is fetched server-side; filter params require a fresh response per request
export const dynamic = 'force-dynamic'

export default function FleetCatalogPage() {
  return <FleetCatalogClient />
}
```

### Dynamic Page Metadata (`generateMetadata`)

Vehicle detail pages and blog posts use `generateMetadata()` to build unique metadata per record, fetched server-side from the API documented above.

```typescript
// src/app/fleetcatalog/[id]/page.tsx
import type { Metadata } from 'next'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/${params.id}`, {
    next: { revalidate: 3600 }, // ISR — revalidate hourly
  })
  const vehicle = await res.json()

  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} — Rent from $${vehicle.pricePerDay}/day`
  const description = `${vehicle.year} ${vehicle.make} ${vehicle.model} — ${vehicle.category}, ${vehicle.fuelType}, ${vehicle.seats} seats. Rent from $${vehicle.pricePerDay}/day. Pay with crypto via MetaMask.`

  return {
    title,
    description,
    alternates: { canonical: `/fleetcatalog/${params.id}` },
    openGraph: {
      title,
      description,
      images: [{ url: vehicle.images?.[0] ?? '/og-fleet.jpg', width: 1200, height: 630, alt: title }],
    },
  }
}
```

### Robots Meta on Private Routes

Apply `robots: { index: false, follow: false }` once on each protected route's parent `layout.tsx` so it cascades automatically to every nested page:

```typescript
// src/app/dashboard/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Dashboard',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
}
```

Apply the same pattern to `src/app/admin/layout.tsx`. This protects `/dashboard/*` and `/admin/*` in a single file each, without needing to repeat the setting on every nested route.

---

## Open Graph Metadata (Facebook, LinkedIn, etc.)

Open Graph tags control how RideFlow links render when shared on Facebook, LinkedIn, WhatsApp, Telegram, Discord, and most messaging apps. Defaults are set in the root layout; pages override `openGraph.title`, `description`, and `images` as needed.

```typescript
// src/app/layout.tsx (continued)
export const metadata: Metadata = {
  // ...previous fields
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Browse, Rent & Buy Vehicles. Pay with Crypto`,
    description:
      'Car rental marketplace with cryptocurrency payments. Browse the full fleet and pay with ETH, BTC, USDC or SOL.',
    images: [
      {
        url: '/og-default.jpg', // 1200x630px, place in /public
        width: 1200,
        height: 630,
        alt: 'RideFlow — Car Rental Marketplace with Crypto Payments',
      },
    ],
  },
}
```

For vehicle detail pages, the `openGraph.images` array should use the vehicle's actual photo (see `generateMetadata` example above) rather than the default image, so each share preview shows the specific car.

### Recommended Open Graph Image Specs

| Page Type | Image Path | Dimensions | Content |
|---|---|---|---|
| Homepage | `/public/og-default.jpg` | 1200×630px | RideFlow logo + tagline on brand background |
| Fleet Catalog | `/public/og-fleet.jpg` | 1200×630px | Fleet collage or hero vehicle |
| Vehicle Detail | dynamic, from `vehicle.images[0]` | varies | The actual vehicle photo |
| Blog | `/public/og-blog.jpg` | 1200×630px | Blog branding |
| Blog Post | dynamic, from `post.coverUrl` | varies | The article's cover image |

---

## Twitter / X Card Metadata

```typescript
// src/app/layout.tsx (continued)
export const metadata: Metadata = {
  // ...previous fields
  twitter: {
    card: 'summary_large_image',
    site: '@rideflow',       // 🔧 replace with the real handle once registered
    creator: '@rideflow',
    title: `${SITE_NAME} — Rent & Buy Vehicles. Pay with Crypto`,
    description:
      'Browse the full fleet and pay with ETH, BTC, USDC or SOL via MetaMask or manual transfer.',
    images: ['/og-default.jpg'],
  },
}
```

`summary_large_image` is used rather than `summary` because it renders a full-width image preview — significantly higher click-through than the small thumbnail used by the default `summary` card, which matters for a visual product like vehicle listings.

---

## Web App Manifest

Create `public/site.webmanifest`:

```json
{
  "name": "RideFlow — Car Rental Marketplace",
  "short_name": "RideFlow",
  "description": "Car rental marketplace with cryptocurrency payments",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#01192D",
  "theme_color": "#0B5E96",
  "orientation": "portrait-primary",
  "icons": [
    { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

Reference it from the root layout's metadata:

```typescript
// src/app/layout.tsx (continued)
export const metadata: Metadata = {
  // ...previous fields
  manifest: '/site.webmanifest',
}
```

`background_color` and `theme_color` use RideFlow's deep navy (`#01192D`) and primary blue (`#0B5E96`) so the splash screen and OS-level UI (browser tab color on Android, status bar tint) matches the brand even before the app shell renders.

---

## Structured Data (JSON-LD / Schema.org)

Structured data is injected per-page using `<script type="application/ld+json">` with `dangerouslySetInnerHTML`. All scripts go inside Server Components so they are present in the initial HTML response.

### Organization / LocalBusiness Schema (Root Layout)

Renders once, site-wide, inside `src/app/layout.tsx`:

```typescript
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['AutoRental', 'Organization'],
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    'Car rental marketplace enabling vehicle rentals and purchases with cryptocurrency payments via MetaMask or manual transfer.',
  paymentAccepted: 'Credit Card, ETH, BTC, USDC, SOL',
  currenciesAccepted: 'USD, ETH, BTC, USDC, SOL',
  sameAs: [
    // 🔧 add real social profiles once published
  ],
}
```

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
/>
```

### WebSite Schema with SearchAction (Homepage)

Enables Google's Sitelinks Search Box beneath RideFlow's search result:

```typescript
// src/app/page.tsx
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/fleetcatalog?category={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}
```

### Car / Vehicle Schema (Vehicle Detail Pages)

Lets Google display price, availability, and vehicle attributes directly in search results:

```typescript
// src/app/fleetcatalog/[id]/page.tsx
function buildVehicleSchema(vehicle: Vehicle, vehicleUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    brand: { '@type': 'Brand', name: vehicle.make },
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    fuelType: vehicle.fuelType,
    vehicleSeatingCapacity: vehicle.seats,
    vehicleTransmission: vehicle.transmission,
    image: vehicle.images,
    url: vehicleUrl,
    offers: {
      '@type': 'Offer',
      price: vehicle.pricePerDay,
      priceCurrency: 'USD',
      availability: vehicle.isAvailable
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: vehicleUrl,
      acceptedPaymentMethod: [
        'https://schema.org/CreditCard',
        'https://schema.org/Cryptocurrency',
      ],
    },
  }
}
```

### BreadcrumbList Schema (Vehicle Detail, Blog Post)

```typescript
function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Usage on a vehicle detail page:
const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', url: SITE_URL },
  { name: 'Fleet Catalog', url: `${SITE_URL}/fleetcatalog` },
  { name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`, url: vehicleUrl },
])
```

### FAQPage Schema (`/faq`)

> **Critical:** `acceptedAnswer.text` must be plain text only — no HTML tags, no lists, no markdown. Malformed answers fail schema validation and disqualify the page from FAQ rich results.

```typescript
// src/app/faq/page.tsx — Server Component, no 'use client'
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I pay with cryptocurrency on RideFlow?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Connect your MetaMask wallet at checkout, approve the transaction, and your booking is confirmed automatically once the payment is verified on-chain. Alternatively, you can send ETH, BTC, USDC, or SOL manually to a deposit address and submit proof for admin verification.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which cryptocurrencies does RideFlow accept?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RideFlow accepts ETH via MetaMask for instant confirmation, as well as manual payments in ETH, BTC, USDC, and SOL that are verified by an administrator before the booking is finalized.',
      },
    },
    // ...remaining FAQ items, following the same plain-text pattern
  ],
}
```

### BlogPosting Schema (Blog Posts)

```typescript
// src/app/blog/[slug]/page.tsx
function buildBlogPostingSchema(post: BlogPost, postUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverUrl,
    datePublished: post.publishedAt, // ISO 8601 format, e.g. "2026-06-18"
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
  }
}
```

### Schema Validation Checklist

| Schema | Page | Validation Tool |
|---|---|---|
| Organization / AutoRental | All pages (root layout) | [validator.schema.org](https://validator.schema.org) |
| WebSite + SearchAction | Homepage | [search.google.com/test/rich-results](https://search.google.com/test/rich-results) |
| Car | `/fleetcatalog/[id]` | Rich Results Test |
| FAQPage | `/faq` | Rich Results Test |
| BlogPosting | `/blog/[slug]` | Rich Results Test |
| BreadcrumbList | Vehicle detail, blog post | Rich Results Test |

---

## Sitemap Generation

Next.js App Router generates `sitemap.xml` automatically from `src/app/sitemap.ts`. Static routes are listed directly; dynamic routes (vehicles, blog posts) are fetched from the API at build/request time.

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ride-floww.vercel.app'
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/fleetcatalog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  // Fetch all vehicle IDs for dynamic /fleetcatalog/[id] routes
  const vehiclesRes = await fetch(`${API_BASE}/vehicles?limit=1000`)
  const { vehicles } = await vehiclesRes.json()
  const vehicleRoutes: MetadataRoute.Sitemap = vehicles.map((v: { id: string; updatedAt: string }) => ({
    url: `${SITE_URL}/fleetcatalog/${v.id}`,
    lastModified: new Date(v.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Fetch all published blog slugs for dynamic /blog/[slug] routes
  const blogRes = await fetch(`${API_BASE}/blog?status=published`)
  const { posts } = await blogRes.json()
  const blogRoutes: MetadataRoute.Sitemap = posts.map((p: { slug: string; updatedAt: string }) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...vehicleRoutes, ...blogRoutes]
}
```

This serves the full sitemap at `https://ride-floww.vercel.app/sitemap.xml`. Submit this URL to Google Search Console after each major content update (new vehicles, new blog posts), or rely on the periodic re-crawl once the property is verified.

---

## Robots.txt Configuration

```typescript
// src/app/robots.ts
import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ride-floww.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/admin/',
          '/checkout',
          '/login',
          '/signup',
          '/api/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
```

This generates `robots.txt` at the site root automatically. The `disallow` list matches the `noindex` routes documented in the **Meta Tags** section above — both layers of protection should always stay in sync when new private routes are added.

---

## Favicons and App Icons

Place the following files in `public/`, generated from the RideFlow logo (the navy-and-teal car/Bitcoin mark) using a tool such as [realfavicongenerator.net](https://realfavicongenerator.net):

```text
public/
├── favicon.ico                  # 48x48, classic browser tab icon
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png         # 180x180, iOS home screen
├── android-chrome-192x192.png   # Android home screen / manifest
└── android-chrome-512x512.png   # Android splash screen / manifest
```

Reference them in the root layout metadata:

```typescript
// src/app/layout.tsx (continued)
export const metadata: Metadata = {
  // ...previous fields
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}
```

---

## Social Sharing Preview Images

| Image | Path | Size | Used By |
|---|---|---|---|
| Default OG image | `/public/og-default.jpg` | 1200×630px | Open Graph + Twitter fallback, homepage |
| Fleet catalog OG image | `/public/og-fleet.jpg` | 1200×630px | `/fleetcatalog` |
| Blog index OG image | `/public/og-blog.jpg` | 1200×630px | `/blog` |
| Vehicle photos | dynamic, from vehicle record | varies, min 1200px wide | `/fleetcatalog/[id]` |
| Blog cover images | dynamic, from blog post record | varies, min 1200px wide | `/blog/[slug]` |

**Design guidance:** use RideFlow's deep navy (`#01192D`) as the background, the brand blue (`#0B5E96`) and teal (`#6CCCD5`) as accent colors, and keep all critical text (logo, tagline, page-specific copy) within the centre-safe 1200×600px area, since some platforms crop the top/bottom edges of the 630px-tall canvas.

Verify every preview after deployment using:
- [opengraph.xyz](https://www.opengraph.xyz)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

---

## PWA-Related Metadata

In addition to `site.webmanifest` above, add the following to the root layout's `viewport` export (Next.js 15 separates `viewport` from `metadata`):

```typescript
// src/app/layout.tsx
import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0B5E96' },
    { media: '(prefers-color-scheme: dark)', color: '#01192D' },
  ],
}
```

For iOS-specific home screen behaviour, add to `metadata`:

```typescript
export const metadata: Metadata = {
  // ...previous fields
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE_NAME,
  },
}
```

RideFlow does not currently ship a service worker or offline caching layer. If full PWA install-ability is added later (e.g. via `next-pwa`), this section should be extended with `serviceWorker` registration details and an offline fallback route.

---

## Search Engine Indexing Recommendations

1. **Verify ownership in Google Search Console** using the HTML verification file method, placing the file in `public/` so it's served at `https://ride-floww.vercel.app/<verification-file>.html`.
2. **Submit `sitemap.xml`** under Search Console → Sitemaps immediately after the first production deploy.
3. **Request indexing manually** for the homepage, `/fleetcatalog`, `/blog`, and `/faq` via URL Inspection → Request Indexing, rather than waiting for Google's natural crawl schedule.
4. **Monitor the Coverage report** weekly for the first month to catch crawl errors early, particularly on dynamic vehicle and blog routes.
5. **Re-submit the sitemap** after any bulk content change (e.g. adding 10+ vehicles or several blog posts at once).
6. **Check the Enhancements → FAQ report** in Search Console after a few weeks to confirm the `/faq` page is earning rich result impressions.
7. **Set up Bing Webmaster Tools** in addition to Google — it accepts the same `sitemap.xml` and has near-zero setup cost once GSC is configured.
8. **Avoid duplicate content** across `category` filter URLs (e.g. `/fleetcatalog?category=suv`) by keeping `alternates.canonical` pointed at the unfiltered `/fleetcatalog` URL, unless filtered views are intentionally meant to rank independently.

---

## Performance & Core Web Vitals (SEO-Adjacent)

Since Core Web Vitals are a direct Google ranking factor, the following implementation choices directly support the SEO work above:

- Use `next/image` for all vehicle photos and blog cover images — never raw `<img>` tags — to get automatic `srcset`, lazy loading, and explicit width/height (preventing Cumulative Layout Shift).
- Set `priority` on the single largest above-the-fold image per page (e.g. the hero image on a vehicle detail page) to improve Largest Contentful Paint.
- Use `next/font` (already implied by the Next.js 15 setup) with `display: 'swap'` to avoid invisible text during font load.
- Run `npx lighthouse https://ride-floww.vercel.app --view` periodically and target a Performance and SEO score of 90+ on both metrics for all public routes.

| Check | Tool | Target |
|---|---|---|
| Page SEO score | Chrome Lighthouse | 100 / 100 |
| Largest Contentful Paint | [PageSpeed Insights](https://pagespeed.web.dev) | < 2.5s |
| Cumulative Layout Shift | PageSpeed Insights | < 0.1 |
| Mobile usability | [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) | Pass |

---

# 📄 License

**Proprietary - All Rights Reserved**

This project is intended for demonstration and portfolio purposes only.

---

<div align="center">

### 🚗 Built by the RideFlow Team

Frontend:
https://ride-floww.vercel.app/

Backend:
https://rideflow-production-492a.up.railway.app/api/docs

</div>
