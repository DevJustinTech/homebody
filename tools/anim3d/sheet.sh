#!/usr/bin/env bash
# Flatten a folder of transparent PNG frames onto paper and tile them.
#   tools/anim3d/sheet.sh <frames-dir> <out.png> [columns]
set -euo pipefail
dir="$1"
out="$2"
cols="${3:-4}"
count=$(find "$dir" -name '*.png' | wc -l)
rows=$(( (count + cols - 1) / cols ))
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
i=0
for f in "$dir"/*.png; do
  ffmpeg -hide_banner -loglevel error -y -f lavfi -i color=c=0xf3f1ea:s=800x600 \
    -i "$f" -filter_complex "[0][1]overlay=format=auto" -frames:v 1 \
    "$tmp/$(printf '%04d' "$i").png"
  i=$((i+1))
done
ffmpeg -hide_banner -loglevel error -y -framerate 1 -i "$tmp/%04d.png" \
  -vf "scale=400:300,tile=${cols}x${rows}:padding=4:margin=4:color=0xf3f1ea" \
  -frames:v 1 "$out"
echo "$out ($count frames, ${cols}x${rows})"
