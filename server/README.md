# 🚀 RideFlow Backend API

Production backend for the RideFlow car rental & marketplace platform. Built with Node.js, Express, PostgreSQL (Supabase), MongoDB (Atlas), and a Web3 layer for on-chain rental agreements.

## 📡 Live API

| Resource | URL |
|----------|-----|
| **Base URL** | `https://rideflow-production-492a.up.railway.app/api` |
| **Swagger Docs** | `https://rideflow-production-492a.up.railway.app/api/docs` |
| **Health Check** | `https://rideflow-production-492a.up.railway.app/api/health` |

## ⚙️ Tech Stack

- **Runtime:** Node.js / Express
- **Databases:** PostgreSQL (Prisma) + MongoDB (Mongoose)
- **Auth:** JWT (bcrypt, role-based access)
- **File Storage:** Cloudinary
- **Blockchain:** Solidity smart contract on Sepolia (ethers.js, Infura)
- **Docs:** Swagger (OpenAPI 3.0)
- **Deployment:** Railway

## 🛠️ Local Setup

```bash
git clone https://github.com/AnaniyaLegesse/RideFlow.git
cd RideFlow/server
npm install
cp .env.example .env   # fill in your real values
npx prisma generate
npm run dev

✨ Key Features

    Auth – Register, login, role-based middleware (customer, sales_agent, admin)

    Vehicles – CRUD with image upload & filtering

    Bookings – Conflict prevention, status tracking, automatic price calculation

    Inquiries – Sales inquiry hub with replies

    Admin Analytics – Revenue, fleet stats, most-booked vehicles

    User Management – Admin can change roles, deactivate/delete users

    Blog – Full CRUD for blog posts

    Web3 Audit Trail – Every confirmed booking is recorded on the Sepolia blockchain

    Payment Integration – Smart contract payAndRecord accepts ETH via MetaMask

🔗 Smart Contract

    Network: Sepolia testnet

    Address: 0x631cE6A52097B8cda2657cBB7D0090d296468620 (Etherscan)

    Functions: recordAgreement, payAndRecord (payable), withdraw, getAgreement

