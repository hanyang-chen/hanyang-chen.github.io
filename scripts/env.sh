#!/usr/bin/env bash
# Source this file to use the project's Ruby without changing your global setup.
JEKYLL_PROJECT_ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
if [[ ! -x "$JEKYLL_PROJECT_ROOT/.tools/runtime/ruby/bin/ruby" ]]; then
  echo 'Ruby environment missing. Run: bash scripts/setup.sh' >&2
  return 1
fi
export PATH="$JEKYLL_PROJECT_ROOT/.tools/runtime/ruby/bin:$JEKYLL_PROJECT_ROOT/.tools/runtime/gems/bin:$PATH"
export GEM_HOME="$JEKYLL_PROJECT_ROOT/.tools/runtime/gems"
export GEM_PATH="$GEM_HOME:$JEKYLL_PROJECT_ROOT/.tools/runtime/ruby/lib/ruby/gems/3.3.0"
export BUNDLE_GEMFILE="$JEKYLL_PROJECT_ROOT/Gemfile"
export BUNDLE_APP_CONFIG="$JEKYLL_PROJECT_ROOT/.bundle"
export BUNDLE_PATH="$JEKYLL_PROJECT_ROOT/.tools/runtime/bundle"
