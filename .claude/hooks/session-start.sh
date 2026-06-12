#!/bin/bash
# SessionStart hook — bootstrap the Hyperframes video toolchain.
#
# Claude Code on the web starts each container clean (no node_modules, FFmpeg,
# Chrome, or poppler). This runs the idempotent studio setup so the authoring →
# render → verify loop works the moment the session opens — no manual `npm run
# setup` needed. Local clones already have the toolchain, so this is web-only.
set -euo pipefail

# Only bootstrap in remote (Claude Code on the web) containers.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# setup-studio.sh is idempotent — it skips anything already installed.
bash "$CLAUDE_PROJECT_DIR/scripts/setup-studio.sh"

# Make a local .env (gitignored) available to the session, so secrets like
# RUNWAYML_API_SECRET can live on your machine instead of in the repo. The
# preferred place is the environment's variable config; this is a fallback.
if [ -f "$CLAUDE_PROJECT_DIR/.env" ] && [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  while IFS= read -r line; do
    case "$line" in ''|\#*) continue ;; esac
    echo "export $line" >> "$CLAUDE_ENV_FILE"
  done < "$CLAUDE_PROJECT_DIR/.env"
fi

# Non-fatal reminder if the AI b-roll key isn't configured anywhere.
if [ -z "${RUNWAYML_API_SECRET:-}" ] && ! grep -q '^RUNWAYML_API_SECRET=' "$CLAUDE_PROJECT_DIR/.env" 2>/dev/null; then
  echo "ℹ️  RUNWAYML_API_SECRET not set — AI b-roll ('npm run gen') is disabled until you add it."
  echo "   Set it in the environment config (Manage environments → variables), or a local .env."
fi
