# homebody plan

A working roadmap for the next few versions. homebody is deliberately a small, local-first app: every addition should keep it usable in a living room and cheap to host.

## North star

A complete, free home-training library for people who do not have a gym. The animation shows the movement, the writing keeps it safe, and the app stays useful offline with no account and no audience.

## Shipped in 0.1.0

- [x] 125 exercises across warm-up, strength, core, cardio, mobility and balance.
- [x] 72 original SVG movement patterns with a bendable-torso rig and household props.
- [x] 11 programs / 42 sessions and 6 quick sessions of ten minutes or less.
- [x] Library search and filters for body part, equipment, level, impact, space and quietness.
- [x] Guided player with work/rest timers, sets, pause, skip, +10s, keyboard controls, sound cues, wake lock and no-partial-log exit.
- [x] Local progress, streak, week chart, history, favourites and JSON export.
- [x] Light/dark themes, reduced-motion support and a mobile-first layout.
- [x] PWA manifest, icons, offline service worker and install support.
- [x] Data integrity check (`npm run check`), README and AGPL-3.0 license.

## Next

### 0.2 — deepen the library

- [ ] Grow the library toward 200 exercises, prioritising gaps rather than variations of what is already covered.
- [x] Add common-mistake (`avoid`) notes to every exercise where one is genuinely useful.
- [x] Bake 3D demonstrations for the four base movements the CC0 pack covers (push-up, jumping jacks, jog, shadow boxing), with the render pipeline in `tools/anim3d/`.
- [ ] Broaden 3D coverage past those four with phone mocap or a licensed pack; the SVG rig stays the fallback for every other pattern.
- [ ] Add a few seated, pregnancy-friendly and low-mobility options with clear caveats.
- [ ] Review every timing and cue with a second pass for safety and clarity.
- [ ] Add a simple body-map filter (front/back, tap a region) on top of the existing focus filter.

### 0.3 — better guidance

- [ ] Let a program remember the next unfinished session on this device.
- [ ] Add an optional rest-day suggestion between program sessions.
- [ ] Add a "what should I do today?" entry point based on time, energy and equipment.
- [ ] Add print/PDF-friendly session sheets for people who prefer paper.
- [ ] Add data import to match the existing JSON export.

### 0.4 — sharing and reach

- [ ] Add a shareable session summary image, generated locally with no upload.
- [ ] Add translations, starting with a small set of UI strings and keeping exercise text in the source language until reviewed.
- [ ] Document a root static-host deployment and a subpath build for GitHub Pages.
- [ ] Add a short in-app "How to use this" page for first-time visitors.

## Known gaps

- 125 exercises is a strong start, not openGym-scale catalogue coverage. Expand with care; do not pad the list with near-duplicates.
- Settings can export and clear history, but cannot import a previous export yet.
- The service worker uses a single cache name; bump it when changing the caching strategy.
- `npm run lint` still reports dev-only fast-refresh warnings and one intentional timer `setState` warning. Build and data checks pass.
- There is no automated browser test suite in the repository yet; the player and PWA have been checked with Playwright manually.
- The 3D lane covers 4 of 125 exercises. Animated WebP keeps transparency but costs 180–470 KB per loop per theme; the format needs revisiting before coverage grows.

## Guardrails

- Original animations only, or CC0 motion rendered by this project's own pipeline. Do not copy openGym media or any other licensed exercise footage.
- No backend, no analytics, no accounts and no third-party runtime requests.
- Every exercise needs setup, movement, breathing, cues, easier and harder text. `avoid` is optional but encouraged.
- Keep the app fully usable offline and on a small phone.
- Prefer plain, readable code and plain data over clever abstractions.
- New exercises and programs must pass `npm run check`.
- Keep the AGPL-3.0 license and credit the people whose typefaces and icons are bundled.

## How to help

Pick one unchecked item, open a small pull request, and include the exact commands you ran. If a cue could be clearer or safer, improving the words is as valuable as adding another exercise.
