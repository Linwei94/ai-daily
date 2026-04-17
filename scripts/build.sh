#!/usr/bin/env bash
# Build script: regenerate index.html from latest daily, refresh dashboard stats.
# Run after every /ai-daily or /graphify ingest.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

LATEST=$(ls daily/2*.html 2>/dev/null | sort -r | head -1)
if [ -z "$LATEST" ]; then echo "[build] no daily/* found, skip"; exit 0; fi
echo "[build] latest daily: $LATEST"

# Regenerate index.html from latest daily, rewrite ../  →  ./
sed -E 's|href="\.\./|href="./|g; s|src="\.\./|src="./|g; s|href="\./index\.html" class="link">📜|href="./daily/index.html" class="link">📜|g' "$LATEST" > index.html
echo "[build] index.html written from $LATEST"

# Stats
# Only count paper dirs that actually contain a paper.md (not empty placeholders)
PAPERS=$(find topics -mindepth 2 -maxdepth 2 -type d 2>/dev/null | while read d; do [ -f "$d/paper.md" ] && echo x; done | wc -l)
TOPICS=$(for d in topics/*/; do [ -d "$d" ] && find "$d" -name paper.md -print -quit 2>/dev/null | grep -q . && echo x; done | wc -l)
DAILIES=$(ls daily/2*.html 2>/dev/null | wc -l)
NODES=0
COMMUNITIES=0
if [ -f graph/global/graph.json ]; then
  NODES=$(python3 -c "import json; print(len(json.load(open('graph/global/graph.json')).get('nodes',[])))" 2>/dev/null || echo 0)
fi
if [ -f graph/global/GRAPH_REPORT.md ]; then
  COMMUNITIES=$(grep -c "^### Community " graph/global/GRAPH_REPORT.md 2>/dev/null || echo 0)
fi

# Patch dashboard stats in-place
python3 - <<PY
import re, pathlib
p = pathlib.Path('dashboard.html')
if not p.exists():
    raise SystemExit(0)
html = p.read_text()
for n, label in [($PAPERS,'Papers'),($TOPICS,'Topics'),($DAILIES,'Daily Issues'),($NODES,'Graph Nodes'),($COMMUNITIES,'Communities')]:
    html = re.sub(r'<div class="num">[^<]*</div><div class="label">'+re.escape(label)+r'</div>', f'<div class="num">{n}</div><div class="label">{label}</div>', html)
p.write_text(html)
print(f'[build] dashboard: papers={$PAPERS} topics={$TOPICS} dailies={$DAILIES} nodes={$NODES} communities={$COMMUNITIES}')
PY
