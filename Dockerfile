# syntax=docker/dockerfile:1

# ---- Build ----------------------------------------------------------------
FROM node:20-alpine AS build

WORKDIR /app

# Instalar dependencias con el lockfile, sin tocar la red mas de lo necesario.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Runtime --------------------------------------------------------------
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --spider -q http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
