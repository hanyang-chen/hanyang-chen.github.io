#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."
source scripts/env.sh
# Polling catches edits made from Windows editors on the WSL /mnt/d mount.
exec bundle exec jekyll serve --host 127.0.0.1 --force_polling "$@"
