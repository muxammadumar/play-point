# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PlayPoint v2 — a Telegram Mini App for discovering free PC game clubs (internet cafes). Users browse clubs via map and list views. Backend integrates with icafecloud.com for real-time data.

## Tech Stack

- **Frontend**: Vue 3 + Vite + Tailwind CSS + Pinia + Telegram Web App SDK
- **Backend**: NestJS + Prisma ORM + PostgreSQL
- **Admin Dashboard**: Vue 3 + PrimeVue/Naive UI
- **Maps**: Leaflet or Mapbox GL JS
- **Auth**: Telegram initData validation + JWT

## Architecture

Monorepo structure:
- `apps/api/` — NestJS backend API
- `apps/web/` — Vue 3 Telegram Mini App (user-facing)
- `apps/admin/` — Vue 3 Admin Dashboard
- `packages/shared/` — Shared TypeScript types and utilities

## Key Conventions

- Telegram Mini App must respect Telegram theme (dark/light mode via Web App SDK)
- User auth is handled via Telegram initData — no password-based auth
- Location-based queries use PostGIS extensions in PostgreSQL
- API docs available at `/api/docs` (Swagger)
