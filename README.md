# homebody

**Strong where you are.**

A free, local-first training library for the room you already have. No gym, no equipment shopping, no account, no audience. Just a floor, a wall, a chair, and a plan.

homebody is an original project: every exercise, program and animation here was written for this app. It is not a fork of openGym, does not use openGym's media, and is not affiliated with it. openGym was the inspiration — proof that a generous, well-organised exercise catalogue can be a public good. homebody takes that idea and points it at the smallest possible gym: home.

## What is inside

- **125 exercises** across warm-up, strength, core, cardio, mobility and balance.
- **72 hand-authored movement animations** drawn with a small SVG body rig, not video or copied media.
- **11 programs / 42 guided sessions**, from a four-session First Steps introduction to focused upper-body, lower-body, core, mobility, desk, quiet-apartment and travel plans.
- **6 quick sessions** of ten minutes or less for days when a program is too much to think about.
- **A guided player** with work and rest timers, sets, pause, skip, +10 seconds, keyboard controls and optional sound cues.
- **Progress without scoring**: sessions finished, minutes moved, a simple streak, saved exercises and a local history.
- **Works offline** once installed as a PWA. Your data never leaves the device.
- **No tracking, no accounts, no ads, no upload.**

## Design principles

1. **The room you have is enough.** The default answer is bodyweight. Equipment appears only where it genuinely changes the movement, and it is almost always something already in a home.
2. **Show the movement.** A still illustration cannot explain a hip hinge. The animations are built from joint angles so the shape of the movement reads at a glance.
3. **Local by default.** There is no backend. Progress lives in `localStorage` and can be exported or cleared in Settings.
4. **Calm, not shouty.** No streak guilt, no leaderboards, no before-and-after promises. Rest is part of the plan.
5. **Open by design.** The code and animations are here to be read, changed and shared.

## Getting started

Requires Node.js 20.19+ (or 22.12+).

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

```bash
npm run build     # production build in dist/
npm run preview   # serve the production build locally
npm run check     # validate the exercise, program and animation data
npm run lint      # oxlint
```

The service worker is registered only in a production build, so use `npm run preview` (or a static host) to test offline behaviour and installation. Serve the build from the site root.

## Using the app

- **Library** — search by name, body part, equipment, level, impact, space or quietness. Filters combine.
- **Exercise detail** — setup, movement, breathing, cues, common mistakes, easier and harder variations, and the animated figure.
- **Programs** — structured plans with a session list and total time. Each session opens in the player.
- **Quick sessions** — short plans of ten minutes or less on the home page, for mornings, desk breaks, quiet floors and travel.
- **Player** — the timer starts automatically. Space pauses, `→` skips a set, `←` goes back. `+10s` adds time. Ending early asks first and does not log a partial session.
- **Progress** — finished sessions, minutes, streak, this week's chart and a removable history. Saved exercises live here too.
- **Settings** — light/dark/system theme, sound cues, reduce-animation, your name, export or clear your local workout history, and install help.
- **Install** — in a supported browser, use the install option in the address bar or share menu. The app then opens standalone and works offline.

## Project structure

```text
src/
  data/
    exercises.js     125 exercises and their cues, timings and filters
    programs.js      11 programs, 42 sessions, duration helpers
    quick.js         6 ten-minute sessions
  rig/
    geometry.js      body proportions, two-bone IK, pose interpolation, viewBox fitting
    patterns.js      72 named movement patterns and their keyframes
    Figure.jsx       SVG renderer (body, props, ground)
    ExerciseFigure.jsx  animation loop, in-view handling, reduced-motion freeze
  lib/
    router.jsx       tiny hash router
    store.js         localStorage state, logs, stats, export/clear
    sound.js         synthesised cues (no audio files)
    motion.js        motion preference context
  components/        nav, exercise card, program card
  views/             home, library, detail, programs, player, progress, settings
  dev/Gallery.jsx    animation study, not part of the production routes
public/
  manifest.webmanifest, sw.js, icons
```

## Adding an exercise

Exercises are plain objects created with the `ex()` helper in `src/data/exercises.js`:

```js
ex('step-up', 'Step-up', 'stepUp', {
  category: 'Strength',
  focus: ['Quads', 'Glutes'],
  level: 1,
  impact: 'low',
  space: 'small',
  quiet: true,
  equipment: ['chair'],
  reps: '10 each side',
  work: 40,
  rest: 15,
  sets: 2,
  setup: 'Stand facing a stable chair or step.',
  move: 'Place one foot on the step and drive through the whole foot to stand tall.',
  breathe: 'Exhale as you stand; inhale as you lower.',
  cues: ['Keep the knee tracking over the toes', 'Stand tall at the top'],
  avoid: 'Do not push off the back foot.',
  easier: 'Use a lower step.',
  harder: 'Hold a backpack.',
})
```

`pattern` is the camelCase key of an animation in `src/rig/patterns.js` (the example uses `stepUp`). If the pattern does not exist yet, add it there and include it in the `patterns` object. Every exercise needs setup, move, breathe, cues, easier and harder text. `avoid` is optional and is shown on the detail page when present.

Programs live in `src/data/programs.js` and reference exercise IDs:

```js
s('basics', 'The basics', 'Full body', [
  { id: 'march-in-place', sets: 2 },
  { id: 'bodyweight-squat', sets: 2 },
])
```

Run `npm run check` to validate exercise IDs, animation patterns, program references and required text, then `npm run lint` and `npm run build` before opening a pull request.

## Privacy

Everything is stored under one `localStorage` key: `homebody.v1`. It contains settings, profile name, favourites, recent exercises and workout logs. There is no server, no analytics and no third-party request at runtime. Fonts and icons are bundled. Export your history as JSON or clear it in **Settings → Your data**.

## Accessibility

- Animation freezes when the system asks for reduced motion, or when **Reduce animation** is on in Settings.
- The player is keyboard-operable and announces timer phase changes.
- Text and controls use high-contrast ink/paper pairs in both themes.
- Touch targets and the mobile player are sized for one-handed use.

## Credits

- Inspired by [openGym](https://github.com/DuarteSantos8/openGym). No openGym code, catalogue data or exercise media is used here. openGym's exercise media is licensed only for openGym and is deliberately not copied into this project.
- Typefaces: [Fraunces](https://github.com/undercasetype/Fraunces) and [Manrope](https://github.com/sharanda/manrope), both under the SIL Open Font License.
- Icons: [Phosphor Icons](https://phosphoricons.com), MIT.
- Built with [React](https://react.dev) and [Vite](https://vite.dev).

## License

Copyright (C) 2026 homebody contributors.

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.

This program is distributed in the hope that it will be useful, but **without any warranty**; without even the implied warranty of merchantability or fitness for a particular purpose. See the [GNU Affero General Public License](LICENSE) for more details.

If you run a modified version of homebody as a network service, the AGPL requires you to offer its source to the people using it.
