#!/usr/bin/env bash
# Prints scripts/resume/resume-{en,es}.html to public/resume/*.pdf with headless Chrome.
set -euo pipefail
cd "$(dirname "$0")"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
for l in en es; do
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=6000 \
    --print-to-pdf="../../public/resume/jp-samano-resume-$l.pdf" "file://$PWD/resume-$l.html" 2>/dev/null
  echo "public/resume/jp-samano-resume-$l.pdf"
done
