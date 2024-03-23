#!/bin/bash
action=$1 # patch or minor

git add -A
git commit -m "CD/CI -> Create patch for $action"
npm version "$action"
# Get app version
tag=$(awk -F'\"' '/\"version\": \".+\"/{ print $4; exit; }' package.json)
# Upload git changes to remote
git push
git push origin "v$tag"
