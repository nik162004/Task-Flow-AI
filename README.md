# TaskFlow AI

TaskFlow AI is a production-shaped multi-tenant SaaS project management platform built with React, TypeScript, Express, Prisma, PostgreSQL, JWT rotation, Stripe, Cloudinary, Docker, and CI/CD templates.

## Quick Start

```bash
npm install
npm run db:generate
npm run test
npm run build
```

For local Postgres:

```bash
docker compose up postgres -d
npm run db:migrate
npm run db:seed
```

## Apps

- `apps/api`: Express API, clean architecture, Prisma schema, services, repositories, tests.
- `apps/web`: Vite React SaaS frontend with auth, workspace dashboard, project/task management, billing, admin, and dark mode.

## Architecture

See `docs/ARCHITECTURE.md`, `docs/ERD.md`, and `docs/DEPLOYMENT.md`.
