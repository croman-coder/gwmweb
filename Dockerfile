# syntax=docker/dockerfile:1

# ---- Build ----------------------------------------------------------------
FROM node:20-alpine AS build

WORKDIR /app

# Instalar dependencias con el lockfile, sin tocar la red mas de lo necesario.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ARG VITE_SITE_URL=https://gwmweb.santarosa.lat
ARG VITE_NOINDEX=false
ARG VITE_LEADS_ENDPOINT
ARG VITE_GA_ID
ENV VITE_SITE_URL=$VITE_SITE_URL VITE_NOINDEX=$VITE_NOINDEX VITE_LEADS_ENDPOINT=$VITE_LEADS_ENDPOINT VITE_GA_ID=$VITE_GA_ID
RUN npm run build

# ---- Runtime --------------------------------------------------------------
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx-seguridad.inc /etc/nginx/conf.d/seguridad.inc
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/dist/nginx-redirects.inc /etc/nginx/conf.d/rutas.inc
RUN rm /usr/share/nginx/html/nginx-redirects.inc

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --spider -q http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
