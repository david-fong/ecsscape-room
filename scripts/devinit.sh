#!/bin/sh
# This script is run as the npm postinstall lifecycle script.
#set -e

declare -r root="$(dirname "${BASH_SOURCE[0]}")/.."
git config --local 'core.hooksPath' "${root}/scripts/githooks"
#git config --local 'core.fsmonitor' 'scripts/githooks/fsmonitor-watchman'
