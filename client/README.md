# 🚗 RideFlow — Car Rental Platform with Crypto Payments

> A modern car rental marketplace frontend with MetaMask ETH payments, manual crypto flows, role-based dashboards, and a full admin panel.

**Live Demo:** [ride-floww.vercel.app](https://ride-floww.vercel.app/)
&nbsp;|&nbsp;
**Repo:** [github.com/AnaniyaLegesse/RideFlow](https://github.com/AnaniyaLegesse/RideFlow)

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)
![License](https://img.shields.io/badge/License-Proprietary-red)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Testing Crypto Payments](#testing-crypto-payments-sepolia-testnet)
- [Role-Based Access](#role-based-access)
- [Deployment](#deployment-to-vercel)
- [Key Dependencies](#key-dependencies)
- [Known Limitations](#known-limitations)

---

## Features

### For Customers
- Browse vehicles with advanced filtering — category, transmission, fuel type, seats, price
- **Instant ETH payment** via MetaMask (on-chain transaction, booking auto-confirmed)
- **Manual crypto payment** — copy deposit address, send from any wallet, notify admin for verification
- User dashboard with bookings, account management, and crypto wallet info
- Public blog with articles about crypto payments and vehicle guides

### For Admins & Sales Agents
- **Fleet overview** — revenue analytics, booking stats, fleet composition
- **Vehicle management** — create, edit, delete vehicles with image uploads
- **Blog publisher** — create, edit, delete posts (image via URL)
- **Booking management** — view all bookings, update status (`pending` → `confirmed` → `completed` / `cancelled`)
- **User management** — view users, edit roles, activate/deactivate accounts
- **Manual payment verification** — review submitted transaction hashes, approve bookings
- **Book on behalf of customers** — admins and sales agents can create bookings for any user

### Crypto Integration
| Method | Flow |
|--------|------|
| **MetaMask** | Connect wallet → pay ETH → booking auto-confirmed after on-chain receipt |
| **Manual** | Copy deposit address → send from any wallet/exchange → admin approves |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS (custom design tokens) |
| State Management | React hooks (`useState`, `useEffect`, `useCallback`) |
| Web3 | wagmi + viem (MetaMask connection) |
| HTTP Client | Custom API client (fetch with auth token) |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js **v20+**
- npm or yarn
- [MetaMask](https://metamask.io/) browser extension (for ETH payment testing)

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url/api
NEXT_PUBLIC_SITE_URL=https://rideflow-production-492a.up.railway.app/api/
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/AnaniyaLegesse/RideFlow
cd rideflow-frontend
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run the development server**

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
├── app/                     # Next.js App Router pages
│   ├── admin/               # Admin & sales agent routes (fleet, blog, users, bookings)
│   ├── dashboard/           # User dashboard (bookings, account, crypto)
│   ├── blog/                # Public blog listing & detail
│   ├── fleetcatalog/        # Vehicle catalog + checkout
│   ├── login/               # Login page (with password visibility toggle)
│   └── signup/              # Signup page
├── components/              # Reusable UI components
│   ├── WalletButton.tsx     # Wallet connection & balance display
│   ├── BookingModal.tsx     # Success/error modals
│   └── EthPaymentButton.tsx # MetaMask payment button
├── features/                # Feature modules (admin, dashboard, fleet-catalog, blog)
├── hooks/                   # Custom hooks (useWalletConnection)
├── lib/                     # API client (api.ts)
└── styles/                  # Global CSS (Tailwind + custom tokens)
```

---

## Testing Crypto Payments (Sepolia Testnet)

### MetaMask (Instant)
1. Install MetaMask and switch to the **Sepolia** test network
2. Get free test ETH from the [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
3. On checkout, connect your wallet and click **"Pay with ETH"**
4. Approve the transaction — booking is created automatically after on-chain confirmation

### Manual Crypto
1. Choose USDC / ETH / BTC / SOL and copy the deposit address
2. Send test tokens from any wallet (or simulate by clicking **"I have sent the payment"**)
3. Admin or sales agent approves the payment in `/admin/bookings`

### Demo Booking (no wallet needed)
1. Click **"Request Booking (Manual Approval)"** — booking created as `pending`
2. Admin or agent can confirm or cancel it from the dashboard

---

## Role-Based Access

| Action | Customer | Sales Agent | Admin |
|--------|:--------:|:-----------:|:-----:|
| Browse vehicles, create own bookings | ✅ | ✅ | ✅ |
| View own bookings | ✅ | ✅ | ✅ |
| View all bookings (any user) | ❌ | ✅ | ✅ |
| Update booking status (confirm/cancel) | ❌ | ✅ | ✅ |
| Create booking for another customer | ❌ | ✅ | ✅ |
| Manage vehicles (CRUD) | ❌ | ✅ | ✅ |
| Manage blog posts | ❌ | ❌ | ✅ |
| Manage users (roles, activate/deactivate) | ❌ | ❌ | ✅ |
| View analytics & fleet overview | ❌ | ✅ | ✅ |
| Verify manual crypto payments | ❌ | ✅ | ✅ |

---

## Deployment to Vercel

```bash
vercel --prod
```

> Set the `NEXT_PUBLIC_API_BASE_URL` environment variable in your Vercel project settings to point to your production backend URL.

---

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `next` | React framework (App Router) |
| `react` / `react-dom` | UI rendering |
| `wagmi` + `viem` | Ethereum wallet connection |
| `@tanstack/react-query` | Data fetching & caching |
| `lucide-react` | Icon library |
| `tailwindcss` | Utility-first styling |

---

## Known Limitations

> These are current frontend constraints — backend extensions may be needed.

- **Blog images** must be entered as direct URLs — file upload not yet implemented
- **Vehicle fields** `plateNumber`, `batteryOrFuel`, and `currentLocation` are placeholders pending backend extension
- **ETH price conversion** uses the CoinGecko API (free tier — rate data may be slightly delayed)
- **Manual crypto payments** rely on admin/agent verification — no automatic blockchain listener is in place

---

## License

**Proprietary** — All rights reserved. For demonstration purposes only.

---

<div align="center">

Built with care by the **RideFlow Team**

[ride-floww.vercel.app](https://ride-floww.vercel.app/)

</div>
