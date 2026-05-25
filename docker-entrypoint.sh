#!/bin/sh
set -e

export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export PORT="${PORT:-3000}"

echo "Starting Next.js on ${HOSTNAME}:${PORT}"
node server.js &
NODE_PID=$!

echo "Waiting for Next.js..."
READY=0
i=0
while [ "$i" -lt 60 ]; do
  if wget -q -O /dev/null "http://127.0.0.1:${PORT}/" 2>/dev/null; then
    READY=1
    break
  fi
  if ! kill -0 "$NODE_PID" 2>/dev/null; then
    echo "Next.js exited before becoming ready"
    wait "$NODE_PID" || true
    exit 1
  fi
  i=$((i + 1))
  sleep 1
done

if [ "$READY" -ne 1 ]; then
  echo "Next.js did not become ready in time"
  kill "$NODE_PID" 2>/dev/null || true
  exit 1
fi

echo "Next.js ready — starting nginx on :80 -> :${PORT}"
exec nginx -c /etc/nginx/nginx.conf -g "daemon off;"
