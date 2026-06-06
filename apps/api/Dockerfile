FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY apps/api/package.json apps/api/package.json
RUN npm install --workspace @taskflow/api

FROM deps AS build
COPY tsconfig.base.json ./
COPY apps/api apps/api
RUN npm run db:generate --workspace @taskflow/api && npm run build --workspace @taskflow/api

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/apps/api/dist apps/api/dist
COPY --from=build /app/apps/api/prisma apps/api/prisma
COPY apps/api/package.json apps/api/package.json
CMD ["node", "apps/api/dist/src/server.js"]
