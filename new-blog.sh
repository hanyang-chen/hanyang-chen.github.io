#!/usr/bin/env bash
# Create a new blog folder under _blogs/.
# Usage:
#   ./new-blog.sh "My Blog Title" 2026-07-14
# Or run interactively:
#   ./new-blog.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
BLOGS_DIR="$ROOT/_blogs"

# Read title
if [ $# -ge 1 ]; then
  TITLE="$1"
else
  read -rp "Blog title: " TITLE
fi

if [ -z "$TITLE" ]; then
  echo "Error: title is required." >&2
  exit 1
fi

# Read date
if [ $# -ge 2 ]; then
  DATE="$2"
else
  DATE="$(date +%Y-%m-%d)"
  read -rp "Date [$DATE]: " INPUT_DATE
  DATE="${INPUT_DATE:-$DATE}"
fi

# Generate slug from title: lowercase, replace spaces/special chars with hyphen, collapse multiple hyphens
SLUG="$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')"

POST_DIR="$BLOGS_DIR/$SLUG"

if [ -d "$POST_DIR" ]; then
  echo "Error: directory already exists: $POST_DIR" >&2
  exit 1
fi

mkdir -p "$POST_DIR/images"

cat > "$POST_DIR/$SLUG.md" <<EOF
---
layout: post
title: "$TITLE"
date: $DATE
permalink: /blogs/$SLUG/
summary: "Write a short summary here. It will appear on the blog list page."
---

# $TITLE

Write your blog content here.

![Example image](images/example.png)
EOF

echo "Created new blog: $POST_DIR/"
echo "  - Markdown : $POST_DIR/$SLUG.md"
echo "  - Images   : $POST_DIR/images/"
echo "  - URL      : /blogs/$SLUG/"
