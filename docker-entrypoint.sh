#!/bin/sh
set -e

export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export PORT="${PORT:-3000}"

echo "Starting Next.js on 127.0.0.1:${PORT}"
node server.js &

echo "Starting nginx on :80 -> :${PORT}"
exec nginx -c /etc/nginx/nginx.conf -g "daemon off;"
