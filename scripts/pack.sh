#!/bin/sh
set -e
declare -r root="$(dirname "${BASH_SOURCE[0]}")/.."
declare -r dist="${root}/dist"
declare -r scripts="$(dirname "${BASH_SOURCE[0]}")"

echo
time node -r esm --title="pack ecsscpage-room" "${scripts}/pack.js"