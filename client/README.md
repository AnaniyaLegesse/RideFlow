```m
# RideFlow – Frontend (Car Rental Platform with Crypto Payments)

**Live Demo:** [https://ride-floww.vercel.app/](https://ride-floww.vercel.app/)

RideFlow is a modern car rental marketplace frontend that connects to a backend API. It features a public catalog, instant MetaMask ETH payments, manual crypto payment flow, user dashboard, and an admin panel with sales agent support.

---

## Features

### For Customers
- Browse vehicles with advanced filtering (category, transmission, fuel type, seats, price)
- Instant ETH payment via MetaMask (on-chain transaction, automatic booking creation)
- Manual crypto payment – copy deposit address, send crypto from any wallet, notify admin for verification
- User dashboard with bookings, account management, and crypto wallet info
- Public blog with articles about crypto payments and vehicle guides

### For Admins & Sales Agents
- Fleet overview – analytics (revenue, bookings, fleet composition)
- Vehicle management – create, edit, delete vehicles (upload images)
- Blog publisher – create, edit, delete blog posts (image URL)
- Booking management – view all bookings, update status (pending, confirmed, completed, cancelled)
- User management – view users, edit roles, activate/deactivate accounts
- Manual payment verification – review submitted transaction hashes and approve bookings
- Book on behalf of customers – both admins and sales agents can create bookings for any user

### Crypto Integration
- MetaMask – connect wallet, pay ETH, booking auto-confirmed after on-chain receipt
- Manual – copy deposit address, send crypto from any wallet/exchange, then notify admin

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
- Node.js v20+
- npm or yarn
- MetaMask extension (for ETH payment testing)

### Environment Variables

Create `.env.local` in the root:

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

4. Open [http://localhost:3000](http://localhost:3000)

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

1. **MetaMask**
   - Install MetaMask, switch to Sepolia network
   - Get free test ETH from [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
   - On checkout, connect wallet, click "Pay with ETH" – approve transaction
   - Booking is created automatically after on-chain confirmation

2. **Manual Crypto**
   - Choose USDC/ETH/BTC/SOL, copy the deposit address
   - Send test tokens from any wallet (or simulate by clicking "I have sent the payment")
   - Admin or sales agent approves the payment in `/admin/bookings`

3. **Demo Booking** (no wallet needed)
   - Click "Request Booking (Manual Approval)" – booking created as pending
   - Admin or agent can confirm or cancel it

---

## Role-Based Access (Summary)

| Action                                     | Customer | Sales Agent | Admin |
|--------------------------------------------|----------|-------------|-------|
| Browse vehicles, create own bookings       | Yes      | Yes         | Yes   |
| View own bookings                          | Yes      | Yes         | Yes   |
| View all bookings (any user)               | No       | Yes         | Yes   |
| Update booking status (confirm/cancel)     | No       | Yes         | Yes   |
| Create booking for another customer        | No       | Yes         | Yes   |
| Manage vehicles (CRUD)                     | No       | Yes         | Yes   |
| Manage blog posts                          | No       | No          | Yes   |
| Manage users (roles, activate/deactivate)  | No       | No          | Yes   |
| View analytics & fleet overview            | No       | Yes         | Yes   |
| Verify manual crypto payments              | No       | Yes         | Yes   |

---

## Deployment to Vercel

```bash
vercel --prod
```

Set the environment variable `NEXT_PUBLIC_API_BASE_URL` to your production backend URL.

---

## Key Dependencies

- `next` – React framework
- `react` + `react-dom`
- `wagmi` + `viem` – Ethereum wallet connection
- `@tanstack/react-query` – data fetching
- `lucide-react` – icons
- `tailwindcss` – styling

---

## Known Limitations (Frontend)

- Blog images must be entered as direct image URLs (file upload not yet implemented)
- Vehicle fields `plateNumber`, `batteryOrFuel`, `currentLocation` are placeholders (backend needs extension)
- ETH price conversion uses CoinGecko API (free, rate may be delayed)
- Manual crypto payments rely on admin/agent verification (no automatic blockchain listener)

---

## License

Proprietary – all rights reserved. For demonstration purposes only.

---

Built with care by the RideFlow Team  
Live demo: [https://ride-floww.vercel.app/](https://ride-floww.vercel.app/)
```
:/