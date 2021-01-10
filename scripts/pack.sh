#!/bin/sh
set -e
declare -r root="$(dirname "${BASH_SOURCE[0]}")/.."
declare -r dist="${root}/dist"
declare -r scripts="$(dirname "${BASH_SOURCE[0]}")"

time node --title="pack ecsscpage-room" "${scripts}/pack.js"

if [[ "$NODE_ENV" = 'production' ]]
then
    # Make sure dist has files needed for release:
    cp "${scripts}/webpack/templates/stage.sh"   "${dist}/stage.sh"
    cp "${root}/.gitattributes"                  "${dist}/.gitattributes"
    cp "${root}/.gitattributes"                  "${dist}/client/.gitattributes"
    echo '/.ts/'                               > "${dist}/.gitignore"
    echo 'gitdir: ../.git/worktrees/dist'      > "${dist}/.git"        # for repair purposes.
    echo 'gitdir: ../../.git/worktrees/client' > "${dist}/client/.git" # for repair purposes.
    echo '' > "${dist}/client/.nojekyll"
fi
