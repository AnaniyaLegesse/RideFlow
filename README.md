# Server (Backend)

Overview

The `server` folder contains the backend API and administrative services powering RideFlow. It handles vehicle and booking data, authentication, and admin operations.

Getting Started (example)

1. Install dependencies: `npm install`
2. Create `.env` with values for `DATABASE_URL`, `JWT_SECRET`, and any provider keys.
3. Run dev server: `npm run dev` or `npm start`

Common Endpoints

- `GET /vehicles` — list and filter vehicles
- `GET /vehicles/:id` — vehicle details
- `POST /bookings` — create a booking
- `GET /bookings/:userId` — user booking records
- `POST /auth/login` — user login
- Admin routes under `/admin` for vehicle CRUD and booking management

Notes

Adapt the commands to your backend stack (Node/Express, Nest, Django, etc.). Include migration and seeding steps if a database schema is used.
