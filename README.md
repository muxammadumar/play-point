# PlayPoint

A Telegram Mini App for discovering free PC game clubs (internet cafes). Users browse clubs via map and list views with real-time data.

## Tech Stack

- **Frontend**: Vue 3 + Vite + Tailwind CSS + Pinia + Telegram Web App SDK
- **Backend**: NestJS + Prisma ORM + PostgreSQL (PostGIS)
- **Auth**: Telegram initData validation + JWT
- **Maps**: Leaflet / Mapbox GL JS

## Project Structure

```
apps/
├── api/       # NestJS backend
├── web/       # Vue 3 Telegram Mini App
└── admin/     # Admin dashboard (planned)
```

## Getting Started

### Prerequisites

- Node.js 20+
- Docker

### Setup

1. **Start the database**
   ```bash
   docker compose up -d
   ```

2. **Set up the backend**
   ```bash
   cd apps/api
   cp .env.example .env   # then fill in your values
   npm install
   npx prisma migrate dev
   npm run start:dev
   ```

3. **Set up the frontend**
   ```bash
   cd apps/web
   npm install
   npm run dev
   ```

### Environment Variables (`apps/api/.env`)

```
DATABASE_URL=postgresql://playpoint:playpoint@localhost:5433/playpoint?schema=public
TELEGRAM_BOT_TOKEN=your_bot_token
JWT_SECRET=your_secret
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/auth/telegram` | Authenticate with Telegram initData |
| GET | `/profile` | Get current user (requires JWT) |

## License

MIT
