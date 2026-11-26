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

RUN apk add --no-cache nodejs tini
WORKDIR /app
COPY package.json ./package.json
COPY api ./api
COPY src/js/modelos.js ./src/js/modelos.js
COPY scripts/iniciar.sh ./iniciar.sh
RUN chmod +x ./iniciar.sh

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx-seguridad.inc /etc/nginx/conf.d/seguridad.inc
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/dist/nginx-redirects.inc /etc/nginx/conf.d/rutas.inc
COPY --from=build /app/dist/nginx-csp.inc /etc/nginx/conf.d/csp.inc
RUN rm /usr/share/nginx/html/nginx-redirects.inc /usr/share/nginx/html/nginx-csp.inc

# Sin root: nginx y la API corren como el usuario `nginx` (uid 101). Se quita la directiva `user` (solo
# sirve para un proceso maestro con privilegios), el pid va a /tmp y se le dan al usuario los directorios
# donde nginx escribe. El puerto 80 funciona sin root porque Docker deja net.ipv4.ip_unprivileged_port_start=0
# dentro del contenedor (verificado en el Docker de desarrollo y en el del servidor).
RUN sed -i -E -e '/^user /d' -e 's#^pid .*#pid /tmp/nginx.pid;#' /etc/nginx/nginx.conf \
 && chown -R nginx:nginx /var/cache/nginx /var/log/nginx /app \
 && chmod -R a+rX /usr/share/nginx/html /etc/nginx/conf.d
USER nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --spider -q http://127.0.0.1/ && wget -qO- http://127.0.0.1:3001/api/health >/dev/null || exit 1

ENTRYPOINT ["/sbin/tini", "-g", "--"]
CMD ["/app/iniciar.sh"]
