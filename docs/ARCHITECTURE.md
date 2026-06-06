# Architecture

TaskFlow AI is organized as a TypeScript monorepo.

## Backend

- Express exposes versioned routes under `/api/v1`.
- Controllers validate input with Zod and delegate to services.
- Services enforce tenant boundaries and business rules.
- Repositories wrap Prisma and can be swapped for test doubles.
- Middleware handles authentication, organization scoping, rate limiting, CSRF, secure headers, logging, and errors.

## Frontend

- React Router defines public auth routes and protected app routes.
- React Query owns server state.
- Zustand owns session, theme, and active organization state.
- Tailwind and shadcn-inspired components provide accessible, responsive SaaS UI primitives.

## Tenancy

Every tenant-owned record contains `organizationId`. API requests use membership checks and active organization context before reading or mutating project, task, billing, notification, audit, and file records.

## External Providers

Stripe, Cloudinary, Google OAuth, and SMTP are configured through environment variables. The application ships with safe local mocks/stubs for test mode.
