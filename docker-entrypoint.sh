#!/bin/sh
set -e

export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export PORT="${PORT:-80}"

echo "Starting Riads Next.js on ${HOSTNAME}:${PORT}"
exec node server.js
