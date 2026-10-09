#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."
mkdir -p .tools
if [[ ! -e .tools/runtime ]]; then
  probe_dir="$(mktemp -d "$PWD/.tools/case-check.XXXXXX")"
  touch "$probe_dir/UPPER"
  if [[ -e "$probe_dir/upper" ]]; then
    # Linux compiler headers require distinct upper/lowercase filenames.
    project_key="$(printf '%s' "$PWD" | sha256sum | cut -c1-16)"
    runtime_dir="${XDG_DATA_HOME:-$HOME/.local/share}/jekyll-envs/$project_key"
    mkdir -p "$runtime_dir"
    ln -s "$runtime_dir" .tools/runtime
  else
    mkdir -p .tools/runtime
  fi
  rm -r -- "$probe_dir"
fi
runtime_dir="$(cd .tools/runtime && pwd -P)"
if [[ ! -x "$runtime_dir/ruby/bin/ruby" ]]; then
  if ! command -v conda >/dev/null 2>&1; then
    echo 'Install Miniconda or Miniforge first, then run this script again.' >&2
    exit 1
  fi
  mkdir -p "$runtime_dir/conda-pkgs" "$runtime_dir/cache"
  CONDA_PKGS_DIRS="$runtime_dir/conda-pkgs" XDG_CACHE_HOME="$runtime_dir/cache" \
    conda env create --prefix "$runtime_dir/ruby" --file environment.yml --yes
fi
source scripts/env.sh
if ! command -v bundle >/dev/null 2>&1; then
  gem install bundler --version '~> 2.6' --no-document
fi
bundle install
bundle exec jekyll build
