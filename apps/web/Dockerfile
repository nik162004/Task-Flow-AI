FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY apps/web/package.json apps/web/package.json
RUN npm install --workspace @taskflow/web

FROM deps AS build
COPY tsconfig.base.json ./
COPY apps/web apps/web
RUN npm run build --workspace @taskflow/web

FROM nginx:1.27-alpine
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
