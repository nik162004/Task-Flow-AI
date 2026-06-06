# Deployment

## Frontend on Vercel

1. Create a Vercel project for `apps/web`.
2. Set `VITE_API_URL` to the Railway backend URL.
3. Build command: `npm run build --workspace @taskflow/web`.
4. Output directory: `apps/web/dist`.

## Backend on Railway

1. Create a Railway service from the repository.
2. Attach PostgreSQL.
3. Set the variables from `apps/api/.env.example`.
4. Run `npm run db:migrate --workspace @taskflow/api`.
5. Start command: `npm run start --workspace @taskflow/api`.

## Docker

`docker compose up --build` runs Postgres, API, web, and Nginx locally.
