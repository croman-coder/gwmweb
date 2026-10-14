#!/bin/sh
set -eu
node /app/api/server.mjs &
api_pid=$!
nginx -g 'daemon off;' &
nginx_pid=$!
trap 'kill "$api_pid" "$nginx_pid" 2>/dev/null || true; wait || true' EXIT TERM INT
while kill -0 "$api_pid" 2>/dev/null && kill -0 "$nginx_pid" 2>/dev/null; do sleep 1; done
exit 1
