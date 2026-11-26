# anim3d — baked 3D exercise clips

A small pipeline that turns the CC0 Mesh2Motion mannequin into the looping
demonstrations shown on the exercise page.

```
tools/anim3d/clips.json     which action, camera, trim and still frame
tools/anim3d/assets/*.glb   CC0 rig + 75 clips (vendored, see assets/README.md)
tools/anim3d/viewer.html    three.js scene (headless only)
tools/anim3d/viewer.js      skinning, framing, ink material, outline hull
tools/anim3d/render.mjs     drives Brave frame by frame, screenshots PNGs
tools/anim3d/build.sh       render + ffmpeg -> public/anim3d/clips/*.webp
```

`npm run anim3d` rebuilds every clip. It needs `node`, `ffmpeg` and a
Chromium-based browser (Brave by default; override with `BRAVE=/path/to/chrome`).
No Blender, no GPU: WebGL runs on SwiftShader in headless Chromium.

## How a clip is made

1. `viewer.js` loads the GLB, plays one action on an `AnimationMixer`, and
   samples the skinned mesh to frame the whole movement (not the rig's root
   bone, which would zoom the figure out).
2. Each frame is rendered orthographically at 800×600 with a four-step toon
   ramp, a dark ink material, a soft contact shadow, and an inverted-hull
   outline that shares the skeleton.
3. `render.mjs` seeks the mixer and screenshots the canvas for both themes:
   dark ink on paper, bone ink on near-black.
4. `build.sh` encodes the PNG sequence to a 640×480 animated WebP per theme and
   writes a still for reduced-motion/paused states.

The output is transparent, so the app's paper and theme colours show through.

## Adding an exercise

1. Find a clip in the rig with `node tools/anim3d/render.mjs --debug "Pushup"`
   (or list every action with `--debug ""` — see the `clip` block).
2. Add an entry to `clips.json`:
   ```json
   { "id": "myExercise", "action": "Clip Name", "yaw": 90, "pitch": 5, "margin": 1.22, "shadow": false }
   ```
   `yaw` 0 faces the figure, 90 is a side view. `start`/`end` trim the clip
   (0–1); `still` picks the poster frame.
3. Render a contact sheet to check it:
   ```
   node tools/anim3d/render.mjs --clips myExercise --frames 8 --w 800 --h 600 --out /tmp/check
   tools/anim3d/sheet.sh /tmp/check/myExercise /tmp/check/sheet.png
   ```
4. Run `npm run anim3d`, then add the pattern id to `src/rig/clips.js`
   and to the `CLIPS` list in `public/sw.js` so it is cached for offline use.

Only the *standard* variant of a pattern should get a clip. `src/rig/clips.js`
already refuses exercises with `anim.variant`, so a wall push-up keeps its 2D
rig rather than pretending to be a floor push-up.

## Coverage (August 2026)

The CC0 pack is a game animation set, not an exercise library. It covers:

| Pattern | Clip | Notes |
|---|---|---|
| `pushup` | Pushup | full rep, 1.54 s |
| `jumpingJack` | Jumping Jacks | full rep with a small jump, 1.25 s |
| `jog` | Run_Anime | one stride, 0.75 s |
| `shadowBox` | Fighting Left Jab | jab and reset, 0.92 s |

`Crawl` is a prone drag, not a bear crawl, and `Walk_Female` is a stroll, not a
march — neither is used. The other 68 patterns remain on the SVG rig until we
either record phone mocap (MediaPipe → the same pose pipeline) or license a
pack. Mixamo is not an option: its licence does not allow redistributing the
motion in an open-source app.

## Size

Animated WebP keeps alpha and works in every current browser, but alpha is
expensive: a 640×480 loop is roughly 130–340 KB. For four exercises × two
themes the folder is ~1.9 MB. If coverage grows to dozens of clips, revisit the
container: VP9 WebM with alpha is ~6× smaller (54 KB for the same push-up) but
Safari's alpha support is unreliable; baked-background MP4 is small but cannot
follow both themes without a second render and blend-mode tricks.
