# TaskFlow AI

TaskFlow AI is a production-shaped multi-tenant SaaS project management platform built with React, TypeScript, Express, Prisma, PostgreSQL, JWT rotation, Stripe, Cloudinary, Docker, and CI/CD templates.

## Quick Start

```bash
npm install
npm run db:generate
npm run test
npm run build
```

For local development with authentication:

```bash
docker compose up postgres -d
npm run db:push
npm run db:seed
```

Create `apps/api/.env` from `apps/api/.env.example` and `apps/web/.env` from `apps/web/.env.example`.

Run the API and web app in two terminals:

```bash
npm run dev --workspace @taskflow/api
npm run dev --workspace @taskflow/web
```

Open `http://localhost:5173`.

Demo credentials after seeding:

- Email: `demo@taskflow.ai`
- Password: `TaskFlow123!`

## Apps

- `apps/api`: Express API, clean architecture, Prisma schema, services, repositories, tests.
- `apps/web`: Vite React SaaS frontend with auth, workspace dashboard, project/task management, billing, admin, and dark mode.

## Architecture

See `docs/ARCHITECTURE.md`, `docs/ERD.md`, and `docs/DEPLOYMENT.md`.
