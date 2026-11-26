#!/usr/bin/env bash
# Bake every 3D clip into public/anim3d/clips.
#
#   npm run anim3d
#
# Requires: node, ffmpeg, Brave (set BRAVE=/path/to/chrome to override).
# Frames land in .cache/anim3d and are safe to delete.
set -euo pipefail
cd "$(dirname "$0")/../.."

IDS=$(node -e "const c=require('./tools/anim3d/clips.json'); console.log(c.clips.map(x=>x.id).join(','))")
OUT=.cache/anim3d

rm -rf "$OUT"
node tools/anim3d/render.mjs --clips "$IDS" --all --w 800 --h 600 --theme both --out "$OUT"

mkdir -p public/anim3d/clips
for theme in light dark; do
  for id in ${IDS//,/ }; do
    ffmpeg -hide_banner -loglevel error -y -framerate 30 -i "$OUT/$theme/$id/%04d.png" \
      -vf "scale=640:480:flags=lanczos" \
      -c:v libwebp_anim -lossless 0 -quality 75 -preset drawing -loop 0 \
      "public/anim3d/clips/$id-$theme.webp"

    frames=$(find "$OUT/$theme/$id" -name '*.png' | wc -l)
    idx=$(node -e 'const [id, frames] = process.argv.slice(1); const c = require("./tools/anim3d/clips.json").clips.find(x => x.id === id); console.log(Math.min(frames - 1, Math.round((c.still ?? 0) * frames)))' "$id" "$frames")
    ffmpeg -hide_banner -loglevel error -y -i "$OUT/$theme/$id/$(printf '%04d' "$idx").png" \
      -vf "scale=640:480:flags=lanczos" \
      -c:v libwebp -lossless 0 -quality 92 \
      "public/anim3d/clips/$id-still-$theme.webp"

    echo "  $id-$theme.webp ($frames frames, still $idx)"
  done
done

du -sh public/anim3d/clips
