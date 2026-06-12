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
