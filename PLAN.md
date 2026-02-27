# PlayPoint v2 — Project Plan

## Context
Build a Telegram Mini App that helps gamers discover free PC game clubs (internet cafes). Users can browse clubs via map or list view. The app integrates with icafecloud.com (later phase). Start with Telegram Mini App only — no standalone mobile app initially.

## Tech Stack
- **Frontend**: Vue 3 + Vite + Tailwind CSS + Pinia + Telegram Web App SDK
- **Backend**: NestJS (Node.js) + Prisma ORM + PostgreSQL
- **Admin Dashboard**: Separate Vue 3 app (or route-guarded section) with PrimeVue/Naive UI
- **Maps**: Leaflet or Mapbox GL JS (for club location map)
- **Auth**: Telegram `initData` validation (no separate auth system needed for users)
- **Deployment**: Docker Compose for local dev (API + DB)

## Phase 1 — Foundation (Start Here)

### 1. Project Setup
- Initialize monorepo structure:
  ```
  play-point-v2/
  ├── apps/
  │   ├── api/          # NestJS backend
  │   ├── web/          # Vue 3 Telegram Mini App
  │   └── admin/        # Vue 3 Admin Dashboard
  ├── packages/
  │   └── shared/       # Shared types/utils
  ├── docker-compose.yml
  └── package.json
  ```
- Set up PostgreSQL via Docker
- Initialize NestJS app with Prisma

### 2. Database Schema (Core Tables)
- `users` — Telegram user data (telegram_id, name, avatar, language)
- `clubs` — Game club info (name, description, address, lat, lng, photos, working_hours, contact)
- `club_amenities` — What the club offers (PCs, consoles, VR, etc.)
- `reviews` — User reviews/ratings for clubs
- `favorites` — User bookmarked clubs

### 3. Backend API
- **Auth module**: Validate Telegram initData, issue JWT
- **Clubs module**: CRUD, search by location (PostGIS), filters
- **Users module**: Profile, favorites
- **Reviews module**: Create/read reviews

### 4. Telegram Mini App (Vue 3)
- Club list view with search/filters
- Map view with club markers (Leaflet)
- Club detail page (photos, info, reviews, directions)
- User favorites
- Telegram theme integration (dark/light mode)

## Phase 2 — Admin Dashboard
- Club management (add/edit/delete clubs)
- User management
- Review moderation
- Analytics (popular clubs, user activity)

## Phase 3 — icafecloud Integration
- Real-time PC availability from icafecloud API
- Show available seats per club
- Booking/reservation flow (if supported)

## Verification
- Run `docker-compose up` for local PostgreSQL
- NestJS API: test endpoints via Swagger (`/api/docs`)
- Vue Mini App: test in Telegram Bot via BotFather test environment
- Admin: test CRUD operations on clubs
