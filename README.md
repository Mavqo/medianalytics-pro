# MediAnalytics Pro

Professional dashboard concept for **physiotherapy and wellness centers**, designed to present patients, appointments, operational trends, and business insights in a structured and credible way.

The project is positioned as a vertical product prototype rather than a generic admin panel. It is meant to support clinics and wellness teams that need a clearer interface for daily operations, data overview, and service management.

## Project Goal

Build a strong frontend foundation for a healthcare-oriented dashboard that can be used for product demos, concept validation, and future development into a full internal platform or SaaS product.

## What It Includes

- overview dashboard with KPIs and charts
- patient management views with status and search
- appointment-focused sections
- dedicated areas for billing, analytics, therapists, treatments, and inventory
- notification flows and structured navigation
- custom visual theme tailored to the MediAnalytics identity
- responsive layout designed for desktop-first operational use

## Tech Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `shadcn/ui`
- `Recharts`
- `Zustand`

## Current Scope

At the moment, the repository mainly represents an advanced frontend prototype with realistic demo data and a UI structure ready to be connected to production services later on.

It works well for:

- product presentations
- portfolio positioning
- early-stage feature validation
- future evolution into a clinic operations dashboard

## Local Development

With `npm`:

```bash
npm install
npm run dev
```

With `bun`:

```bash
bun install
bun run dev
```

Production build:

```bash
npm run build
npm run start
```

## Project Structure

```text
src/
├── app/              Next.js routing and pages
├── components/       Shared UI and layout components
├── config/           Navigation and dashboard configuration
├── features/         Domain-oriented feature modules
├── lib/              Demo data and utility logic
├── styles/           Global theme and visual variants
└── hooks/            Custom hooks
```

## Positioning

MediAnalytics Pro is intended as a focused digital product concept for the health and wellness space, combining strong presentation, clear information hierarchy, and a structure that can grow into a real operational dashboard.
