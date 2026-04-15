# MediAnalytics Pro

Dashboard for physiotherapy and wellness centers. Patient management, appointments, billing, analytics, therapist views, inventory, and notifications.

Frontend prototype — realistic data, ready to wire up to a backend.

Built with Next.js 16, React 19, Tailwind CSS 4, shadcn/ui, Recharts, Zustand.

## Run locally

```bash
npm install && npm run dev
# or
bun install && bun run dev
```

Build: `npm run build && npm run start`

## Structure

```
src/
├── app/          Next.js routes and pages
├── components/   Shared UI and layout
├── config/       Nav and dashboard config
├── features/     Domain modules (patients, billing, etc.)
├── lib/          Data and utilities
├── styles/       Theme and variants
└── hooks/        Custom hooks
```
