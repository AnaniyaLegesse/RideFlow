# RideFlow Backend API

Car rental and marketplace REST API.

- **Live API:** https://upbeat-smile-production.up.railway.app/api
- **API Docs:** https://upbeat-smile-production.up.railway.app/api/docs

---

## Requirements

- Node.js v20+
- Git

---

## Setup

```bash
git clone https://github.com/Amanuel088/RideFlow.git
cd RideFlow
npm install
cp .env.example .env
npx prisma generate
npm run dev
```

Visit http://localhost:4000/api/health to confirm it works.

---

## Environment Variables

Fill in `.env` with these values. Ask the backend team for the actual credentials.

```env
NODE_ENV=development
PORT=4000
APP_NAME=CarRentalBackend

DATABASE_URL=        # PostgreSQL pooler URL (Neon or Supabase)
DIRECT_URL=          # PostgreSQL direct URL
MONGODB_URI=         # MongoDB Atlas connection string
JWT_SECRET=          # Any long random string
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## API Endpoints

All endpoints are prefixed with `/api`. Protected routes require `Authorization: Bearer <token>`.

### Auth
```
POST   /auth/register       Create account
POST   /auth/login          Login — returns JWT token
GET    /auth/me             Get logged-in user (protected)
```

### Vehicles
```
GET    /vehicles            List vehicles (filters below)
GET    /vehicles/:id        Get one vehicle
POST   /vehicles            Create vehicle (admin, agent)
PUT    /vehicles/:id        Update vehicle (admin, agent)
DELETE /vehicles/:id        Delete vehicle (admin only)
```

### Bookings
```
POST   /bookings            Create booking (protected)
GET    /bookings/my         My bookings (protected)
GET    /bookings/:id        Get one booking (protected)
PATCH  /bookings/:id/status Update status (protected)
GET    /bookings            All bookings (admin, agent)
```

### Inquiries
```
POST   /inquiries           Submit inquiry (protected)
GET    /inquiries/my        My inquiries (protected)
GET    /inquiries/:id       Get one inquiry (protected)
POST   /inquiries/:id/reply Reply to inquiry (protected)
PATCH  /inquiries/:id/status Update status (admin, agent)
GET    /inquiries           All inquiries (admin, agent)
```

### Analytics (admin only)
```
GET    /analytics/overview
GET    /analytics/revenue
GET    /analytics/most-booked
GET    /analytics/fleet
GET    /analytics/recent-bookings
```

---

## Vehicle Filters

```
GET /api/vehicles?category=suv&fuelType=electric&minPrice=50&maxPrice=200&isAvailable=true&page=1&limit=10
```

Categories: `economy` `compact` `suv` `luxury` `van` `electric` `convertible`
Fuel types: `petrol` `diesel` `electric` `hybrid`
Transmission: `manual` `automatic`

---

## Roles

| Role | Access |
|---|---|
| `customer` | Browse, book, inquire |
| `sales_agent` | + manage vehicles and inquiries |
| `admin` | Full access including analytics |

To set a role (run in your database SQL editor):
```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

---

## Notes

- Prices are in **EUR**
- Dates format: `YYYY-MM-DD`
- Vehicle IDs are MongoDB strings — User and booking IDs are integers
- Image uploads use `multipart/form-data`, everything else uses `application/json`
- Full interactive docs at `/api/docs` — test every endpoint from the browser
