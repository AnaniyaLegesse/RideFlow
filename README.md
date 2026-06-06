# 🚗 RideFlow — Car Rental Marketplace with Crypto Payments

<p align="center">
  <img src="https://i.postimg.cc/28SLfzJ5/Screenshot-2026-06-06-at-10-38-08-PM.png" alt="RideFlow Screenshot" width="100%" />
</p>

<p align="center">
  <strong>Modern car rental marketplace with cryptocurrency payments, role-based access control, fleet management, booking workflows, analytics, and a complete admin dashboard.</strong>
</p>

<p align="center">
  <a href="https://ride-floww.vercel.app/">Live Demo</a> •
  <a href="https://github.com/AnaniyaLegesse/RideFlow">Frontend Repository</a> •
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

https://upbeat-smile-production.up.railway.app/api

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

# 📄 License

**Proprietary — All Rights Reserved**

This project is intended for demonstration and portfolio purposes only.

---

<div align="center">

### 🚗 Built by the RideFlow Team

Frontend:
https://ride-floww.vercel.app/

Backend:
https://upbeat-smile-production.up.railway.app/api

</div>
