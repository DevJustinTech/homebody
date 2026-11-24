// Programs are sequences of library exercises. A session is a single workout;
// the player walks through it set by set.
//
// Keep this file plain data. Anything that needs to be computed (duration,
// equipment, level) is derived below so there is one source of truth.

import { exerciseById } from './exercises.js'

const s = (id, name, focus, exercises) => ({ id, name, focus, exercises })

export const programs = [
  {
    id: 'first-steps',
    name: 'First Steps',
    tagline: 'Start where you are.',
    description:
      'Four short, gentle sessions for anyone new to training or coming back after a long break. No equipment, no jumping, and nothing that needs you to get on the floor unless you want to.',
    level: 1,
    weeks: 2,
    equipment: [],
    focus: ['Full body', 'Strength', 'Mobility'],
    sessions: [
      s('basics', 'The basics', 'Full body', [
        { id: 'march-in-place', sets: 2 },
        { id: 'bodyweight-squat', sets: 2, reps: '8–10' },
        { id: 'wall-pushup', sets: 2, reps: '8–12' },
        { id: 'glute-bridge', sets: 2, reps: '10' },
        { id: 'bird-dog', sets: 2, reps: '6 each side' },
        { id: 'childs-pose', sets: 1 },
      ]),
      s('push-and-stand', 'Push and stand', 'Full body', [
        { id: 'arm-circles', sets: 1 },
        { id: 'chair-squat', sets: 2, reps: '8' },
        { id: 'incline-pushup', sets: 2, reps: '8' },
        { id: 'calf-raise', sets: 2, reps: '12' },
        { id: 'dead-bug', sets: 2, reps: '6 each side' },
        { id: 'hamstring-stretch', sets: 1 },
      ]),
      s('hinge-and-reach', 'Hinge and reach', 'Full body', [
        { id: 'march-in-place', sets: 2 },
        { id: 'good-morning', sets: 2, reps: '8' },
        { id: 'reverse-lunge', sets: 2, reps: '6 each side' },
        { id: 'wall-pushup', sets: 2, reps: '10' },
        { id: 'superman', sets: 2, reps: '8' },
        { id: 'cat-cow', sets: 1 },
      ]),
      s('full-body-flow', 'Full body flow', 'Full body', [
        { id: 'step-touch', sets: 1 },
        { id: 'bodyweight-squat', sets: 2, reps: '10' },
        { id: 'incline-pushup', sets: 2, reps: '8' },
        { id: 'glute-bridge', sets: 2, reps: '12' },
        { id: 'plank', sets: 2, work: 20 },
        { id: 'childs-pose', sets: 1 },
      ]),
    ],
  },
  {
    id: 'strong-where-you-are',
    name: 'Strong Where You Are',
    tagline: 'A complete strength habit at home.',
    description:
      'Five balanced sessions that cover pushing, pulling, squatting, hinging and carrying your own weight. Uses a chair, a towel or backpack, and a wall. Progress by slowing the reps down before adding load.',
    level: 2,
    weeks: 4,
    equipment: ['chair', 'towel', 'backpack', 'wall'],
    focus: ['Strength', 'Full body'],
    sessions: [
      s('full-body-a', 'Full body A', 'Full body', [
        { id: 'arm-circles', sets: 1 },
        { id: 'bodyweight-squat', sets: 3, reps: '12' },
        { id: 'pushup', sets: 3, reps: '8–12' },
        { id: 'reverse-lunge', sets: 2, reps: '8 each side' },
        { id: 'towel-row', sets: 3, reps: '12' },
        { id: 'glute-bridge', sets: 3, reps: '12' },
        { id: 'plank', sets: 2, work: 30 },
      ]),
      s('full-body-b', 'Full body B', 'Full body', [
        { id: 'step-touch', sets: 1 },
        { id: 'sumo-squat', sets: 3, reps: '12' },
        { id: 'incline-pushup', sets: 3, reps: '10' },
        { id: 'split-squat', sets: 2, reps: '8 each side' },
        { id: 'backpack-row', sets: 3, reps: '10' },
        { id: 'hip-thrust', sets: 3, reps: '12' },
        { id: 'dead-bug', sets: 2, reps: '8 each side' },
      ]),
      s('full-body-c', 'Full body C', 'Full body', [
        { id: 'jog-in-place', sets: 1 },
        { id: 'tempo-squat', sets: 3, reps: '8' },
        { id: 'tempo-pushup', sets: 3, reps: '6–8' },
        { id: 'step-up', sets: 2, reps: '8 each side' },
        { id: 'band-row', sets: 3, reps: '12' },
        { id: 'single-leg-glute-bridge', sets: 2, reps: '8 each side' },
        { id: 'side-plank', sets: 2, work: 20 },
      ]),
      s('upper-focus', 'Upper body', 'Upper body', [
        { id: 'arm-circles', sets: 1 },
        { id: 'pushup', sets: 3, reps: '8–12' },
        { id: 'backpack-row', sets: 3, reps: '10' },
        { id: 'overhead-press', sets: 3, reps: '10' },
        { id: 'chair-dip', sets: 2, reps: '8' },
        { id: 'lateral-raise', sets: 2, reps: '12' },
        { id: 'hollow-hold', sets: 2, work: 20 },
      ]),
      s('lower-focus', 'Lower body', 'Lower body', [
        { id: 'leg-swings', sets: 1 },
        { id: 'backpack-squat', sets: 3, reps: '10' },
        { id: 'backpack-lunge', sets: 2, reps: '8 each side' },
        { id: 'single-leg-rdl', sets: 2, reps: '8 each side' },
        { id: 'hip-thrust', sets: 3, reps: '12' },
        { id: 'calf-raise', sets: 3, reps: '15' },
        { id: 'side-plank', sets: 2, work: 20 },
      ]),
    ],
  },
  {
    id: 'core-foundation',
    name: 'Core Foundation',
    tagline: 'Breathe, brace, move.',
    description:
      'Four core sessions that teach you to keep the ribs stacked and the lower back calm while the arms and legs move. Floor-based, quiet, and easy on the neck.',
    level: 1,
    weeks: 3,
    equipment: [],
    focus: ['Core', 'Lower back'],
    sessions: [
      s('brace-basics', 'Brace basics', 'Core', [
        { id: 'cat-cow', sets: 1 },
        { id: 'dead-bug', sets: 3, reps: '8 each side' },
        { id: 'bird-dog', sets: 3, reps: '8 each side' },
        { id: 'glute-bridge', sets: 2, reps: '12' },
        { id: 'plank', sets: 2, work: 20 },
        { id: 'childs-pose', sets: 1 },
      ]),
      s('front-line', 'Front line', 'Core', [
        { id: 'march-in-place', sets: 1 },
        { id: 'crunch', sets: 3, reps: '12' },
        { id: 'reverse-crunch', sets: 3, reps: '10' },
        { id: 'dead-bug', sets: 2, reps: '8 each side' },
        { id: 'forearm-plank', sets: 2, work: 25 },
        { id: 'cobra', sets: 1 },
      ]),
      s('side-line', 'Side line', 'Obliques', [
        { id: 'cat-cow', sets: 1 },
        { id: 'side-plank', sets: 3, work: 20 },
        { id: 'bicycle-crunch', sets: 3, reps: '10 each side' },
        { id: 'bird-dog', sets: 2, reps: '8 each side' },
        { id: 'side-bend', sets: 1 },
        { id: 'childs-pose', sets: 1 },
      ]),
      s('core-endurance', 'Core endurance', 'Core', [
        { id: 'step-touch', sets: 1 },
        { id: 'hollow-hold', sets: 3, work: 20 },
        { id: 'plank-up-down', sets: 2, reps: '8' },
        { id: 'russian-twist', sets: 3, reps: '12' },
        { id: 'flutter-kicks', sets: 2, work: 20 },
        { id: 'reverse-plank', sets: 2, work: 20 },
      ]),
    ],
  },
  {
    id: 'upper-body-at-home',
    name: 'Upper Body at Home',
    tagline: 'Push, pull, and carry the day.',
    description:
      'Four upper-body sessions using a chair, water bottles, a towel and a backpack. Pulling gets equal billing with pushing, which is the part most home routines miss.',
    level: 2,
    weeks: 3,
    equipment: ['chair', 'bottles', 'towel', 'backpack', 'band'],
    focus: ['Chest', 'Back', 'Shoulders', 'Arms'],
    sessions: [
      s('push-day', 'Push day', 'Chest & triceps', [
        { id: 'arm-circles', sets: 1 },
        { id: 'pushup', sets: 4, reps: '8–12' },
        { id: 'wide-pushup', sets: 3, reps: '8–10' },
        { id: 'chair-dip', sets: 3, reps: '8–12' },
        { id: 'overhead-press', sets: 3, reps: '10' },
        { id: 'tricep-extension', sets: 2, reps: '12' },
      ]),
      s('pull-day', 'Pull day', 'Back & biceps', [
        { id: 'band-pull-apart', sets: 2 },
        { id: 'backpack-row', sets: 4, reps: '10' },
        { id: 'band-row', sets: 3, reps: '12' },
        { id: 'inverted-row', sets: 3, reps: '6–10' },
        { id: 'bicep-curl', sets: 3, reps: '12' },
        { id: 'superman', sets: 2, reps: '10' },
      ]),
      s('shoulders', 'Shoulders', 'Shoulders', [
        { id: 'wall-angel', sets: 2 },
        { id: 'overhead-press', sets: 4, reps: '10' },
        { id: 'lateral-raise', sets: 3, reps: '12' },
        { id: 'band-pull-apart', sets: 3, reps: '15' },
        { id: 'front-raise', sets: 2, reps: '12' },
        { id: 'tricep-extension', sets: 2, reps: '12' },
      ]),
      s('arms-and-posture', 'Arms and posture', 'Arms', [
        { id: 'neck-stretch', sets: 1 },
        { id: 'bicep-curl', sets: 3, reps: '12' },
        { id: 'chair-dip', sets: 3, reps: '10' },
        { id: 'band-pull-apart', sets: 2, reps: '15' },
        { id: 'diamond-pushup', sets: 2, reps: '6–8' },
        { id: 'chest-stretch', sets: 1 },
      ]),
    ],
  },
  {
    id: 'lower-body-burn',
    name: 'Lower Body Burn',
    tagline: 'Build the legs that carry you.',
    description:
      'Four lower-body sessions with squats, lunges, hinges and glute work. Knee-friendly options are written into every exercise, and the quiet version needs no jumping.',
    level: 2,
    weeks: 3,
    equipment: ['chair', 'backpack', 'wall'],
    focus: ['Quads', 'Glutes', 'Hamstrings', 'Calves'],
    sessions: [
      s('squat-day', 'Squat day', 'Quads & glutes', [
        { id: 'leg-swings', sets: 1 },
        { id: 'bodyweight-squat', sets: 3, reps: '15' },
        { id: 'sumo-squat', sets: 3, reps: '12' },
        { id: 'split-squat', sets: 2, reps: '8 each side' },
        { id: 'wall-sit', sets: 2, work: 30 },
        { id: 'calf-raise', sets: 3, reps: '15' },
      ]),
      s('glute-day', 'Glute day', 'Glutes', [
        { id: 'glute-bridge', sets: 3, reps: '15' },
        { id: 'single-leg-glute-bridge', sets: 2, reps: '8 each side' },
        { id: 'hip-thrust', sets: 3, reps: '12' },
        { id: 'glute-kickback', sets: 2, reps: '12 each side' },
        { id: 'band-lateral-walk', sets: 2, reps: '10 each way' },
        { id: 'hip-flexor-stretch', sets: 1 },
      ]),
      s('hinge-day', 'Hinge day', 'Hamstrings', [
        { id: 'leg-swings', sets: 1 },
        { id: 'good-morning', sets: 3, reps: '12' },
        { id: 'single-leg-rdl', sets: 3, reps: '8 each side' },
        { id: 'backpack-good-morning', sets: 3, reps: '10' },
        { id: 'glute-bridge-hold', sets: 2, work: 30 },
        { id: 'hamstring-stretch', sets: 1 },
      ]),
      s('legs-on-fire', 'Legs on fire', 'Legs', [
        { id: 'march-in-place', sets: 1 },
        { id: 'walking-lunge', sets: 2, reps: '8 each side' },
        { id: 'step-up', sets: 2, reps: '10 each side' },
        { id: 'squat-pulse', sets: 2, work: 25 },
        { id: 'single-leg-calf-raise', sets: 2, reps: '10 each side' },
        { id: 'deep-squat-hold', sets: 2 },
      ]),
    ],
  },
  {
    id: 'mobility-reset',
    name: 'Mobility Reset',
    tagline: 'Move better, feel better.',
    description:
      'Four slow sessions for hips, shoulders, spine and hamstrings. No strength required. Most of it is on the floor or against a wall, and every stretch has a gentler option.',
    level: 1,
    weeks: 2,
    equipment: ['wall', 'doorway'],
    focus: ['Mobility', 'Lower back', 'Hips'],
    sessions: [
      s('morning', 'Morning reset', 'Full body', [
        { id: 'cat-cow', sets: 1 },
        { id: 'wall-angel', sets: 2 },
        { id: 'ankle-rocks', sets: 1 },
        { id: 'deep-squat-hold', sets: 2 },
        { id: 'hip-flexor-stretch', sets: 1 },
        { id: 'standing-forward-fold', sets: 1 },
      ]),
      s('hips', 'Hips and hamstrings', 'Hips', [
        { id: 'leg-swings', sets: 1 },
        { id: 'butterfly', sets: 1 },
        { id: 'deep-squat-hold', sets: 2 },
        { id: 'hamstring-stretch', sets: 1 },
        { id: 'quad-stretch', sets: 1 },
        { id: 'seated-twist', sets: 1 },
      ]),
      s('shoulders-and-neck', 'Shoulders and neck', 'Shoulders', [
        { id: 'arm-circles', sets: 1 },
        { id: 'wall-angel', sets: 2 },
        { id: 'chest-stretch', sets: 1 },
        { id: 'tricep-stretch', sets: 1 },
        { id: 'neck-stretch', sets: 1 },
        { id: 'wrist-rocks', sets: 1 },
      ]),
      s('evening', 'Evening wind-down', 'Full body', [
        { id: 'cat-cow', sets: 1 },
        { id: 'childs-pose', sets: 1 },
        { id: 'cobra', sets: 1 },
        { id: 'seated-twist', sets: 1 },
        { id: 'butterfly', sets: 1 },
        { id: 'hamstring-stretch', sets: 1 },
      ]),
    ],
  },
  {
    id: 'cardio-at-home',
    name: 'Cardio at Home',
    tagline: 'Get breathless in a small room.',
    description:
      'Four interval sessions that need no machine and very little space. Every session has a low-impact option, and the quiet version replaces jumps with fast steps and shadow boxing.',
    level: 2,
    weeks: 3,
    equipment: ['rope'],
    focus: ['Cardio', 'Full body'],
    sessions: [
      s('starter-intervals', 'Starter intervals', 'Cardio', [
        { id: 'march-in-place', sets: 1 },
        { id: 'step-touch', sets: 2, work: 30 },
        { id: 'jog-in-place', sets: 3, work: 30, rest: 30 },
        { id: 'shadow-boxing', sets: 3, work: 30, rest: 30 },
        { id: 'fast-feet', sets: 2, work: 20, rest: 30 },
        { id: 'calf-stretch', sets: 1 },
      ]),
      s('no-jump', 'No-jump cardio', 'Cardio', [
        { id: 'step-touch', sets: 2, work: 40 },
        { id: 'shadow-boxing', sets: 4, work: 40, rest: 20 },
        { id: 'fast-feet', sets: 3, work: 25, rest: 25 },
        { id: 'mountain-climber', sets: 3, work: 25, rest: 25 },
        { id: 'bear-crawl', sets: 2, work: 25, rest: 25 },
        { id: 'childs-pose', sets: 1 },
      ]),
      s('intervals', 'Intervals', 'Cardio', [
        { id: 'jumping-jacks', sets: 3, work: 30, rest: 30 },
        { id: 'high-knees', sets: 3, work: 25, rest: 35 },
        { id: 'skater', sets: 3, work: 30, rest: 30 },
        { id: 'burpee', sets: 3, work: 25, rest: 35 },
        { id: 'jump-rope', sets: 2, work: 30, rest: 30 },
        { id: 'hamstring-stretch', sets: 1 },
      ]),
      s('quiet-cardio', 'Quiet cardio', 'Cardio', [
        { id: 'march-in-place', sets: 2, work: 40 },
        { id: 'step-touch', sets: 3, work: 40, rest: 20 },
        { id: 'shadow-boxing', sets: 3, work: 40, rest: 20 },
        { id: 'fast-feet', sets: 3, work: 25, rest: 25 },
        { id: 'bear-crawl', sets: 2, work: 25, rest: 25 },
        { id: 'deep-squat-hold', sets: 1 },
      ]),
    ],
  },
  {
    id: 'desk-reset',
    name: 'Desk Reset',
    tagline: 'Ten minutes between meetings.',
    description:
      'Three short sessions for the neck, shoulders, hips and lower back after a day at a desk. Do them in work clothes. No floor required.',
    level: 1,
    weeks: 2,
    equipment: ['wall', 'doorway'],
    focus: ['Mobility', 'Posture', 'Shoulders'],
    sessions: [
      s('neck-and-shoulders', 'Neck and shoulders', 'Shoulders', [
        { id: 'neck-stretch', sets: 1 },
        { id: 'arm-circles', sets: 1 },
        { id: 'wall-angel', sets: 2 },
        { id: 'chest-stretch', sets: 1 },
        { id: 'band-pull-apart', sets: 2 },
        { id: 'tricep-stretch', sets: 1 },
      ]),
      s('hips-and-back', 'Hips and back', 'Hips', [
        { id: 'cat-cow', sets: 1 },
        { id: 'seated-twist', sets: 1 },
        { id: 'hip-flexor-stretch', sets: 1 },
        { id: 'standing-forward-fold', sets: 1 },
        { id: 'butterfly', sets: 1 },
        { id: 'side-bend', sets: 1 },
      ]),
      s('posture-break', 'Posture break', 'Posture', [
        { id: 'wall-angel', sets: 2 },
        { id: 'band-pull-apart', sets: 2 },
        { id: 'band-chest-press', sets: 2 },
        { id: 'chest-stretch', sets: 1 },
        { id: 'neck-stretch', sets: 1 },
        { id: 'calf-stretch', sets: 1 },
      ]),
    ],
  },
  {
    id: 'quiet-apartment',
    name: 'Quiet Apartment',
    tagline: 'Train without the downstairs neighbour knowing.',
    description:
      'Four low-impact sessions with no jumping, no dropping and no equipment that thumps. Every exercise is quiet enough for a flat with thin floors. Strength still counts.',
    level: 1,
    weeks: 3,
    equipment: ['chair', 'wall', 'towel'],
    focus: ['Strength', 'Core', 'Mobility'],
    sessions: [
      s('quiet-strength', 'Quiet strength', 'Full body', [
        { id: 'march-in-place', sets: 2 },
        { id: 'chair-squat', sets: 3, reps: '10' },
        { id: 'wall-pushup', sets: 3, reps: '12' },
        { id: 'towel-row', sets: 3, reps: '12' },
        { id: 'glute-bridge', sets: 3, reps: '15' },
        { id: 'plank', sets: 2, work: 25 },
      ]),
      s('quiet-lower', 'Quiet lower body', 'Lower body', [
        { id: 'leg-swings', sets: 1 },
        { id: 'wall-sit', sets: 3, work: 30 },
        { id: 'single-leg-calf-raise', sets: 2, reps: '10 each side' },
        { id: 'glute-bridge-hold', sets: 2, work: 30 },
        { id: 'step-up', sets: 2, reps: '8 each side' },
        { id: 'hip-flexor-stretch', sets: 1 },
      ]),
      s('quiet-core', 'Quiet core', 'Core', [
        { id: 'dead-bug', sets: 3, reps: '8 each side' },
        { id: 'bird-dog', sets: 3, reps: '8 each side' },
        { id: 'side-plank', sets: 2, work: 20 },
        { id: 'hollow-hold', sets: 2, work: 20 },
        { id: 'reverse-plank', sets: 2, work: 20 },
        { id: 'childs-pose', sets: 1 },
      ]),
      s('quiet-mobility', 'Quiet mobility', 'Mobility', [
        { id: 'cat-cow', sets: 1 },
        { id: 'wall-angel', sets: 2 },
        { id: 'deep-squat-hold', sets: 2 },
        { id: 'seated-twist', sets: 1 },
        { id: 'butterfly', sets: 1 },
        { id: 'hamstring-stretch', sets: 1 },
      ]),
    ],
  },
  {
    id: 'travel-anywhere',
    name: 'Travel Anywhere',
    tagline: 'A hotel room is enough.',
    description:
      'Three sessions that fit in a suitcase: no equipment except a towel and a wall, no floor space beyond a yoga mat, and nothing that will wake the room next door.',
    level: 1,
    weeks: 2,
    equipment: ['towel', 'wall'],
    focus: ['Full body', 'Mobility'],
    sessions: [
      s('arrival', 'Arrival', 'Full body', [
        { id: 'march-in-place', sets: 2 },
        { id: 'bodyweight-squat', sets: 2, reps: '12' },
        { id: 'wall-pushup', sets: 2, reps: '12' },
        { id: 'reverse-lunge', sets: 2, reps: '6 each side' },
        { id: 'towel-row', sets: 2, reps: '12' },
        { id: 'plank', sets: 2, work: 20 },
      ]),
      s('no-equipment', 'No equipment', 'Full body', [
        { id: 'step-touch', sets: 1 },
        { id: 'split-squat', sets: 2, reps: '8 each side' },
        { id: 'pushup', sets: 2, reps: '8' },
        { id: 'good-morning', sets: 2, reps: '10' },
        { id: 'dead-bug', sets: 2, reps: '8 each side' },
        { id: 'side-plank', sets: 2, work: 20 },
      ]),
      s('reset', 'Travel reset', 'Mobility', [
        { id: 'cat-cow', sets: 1 },
        { id: 'wall-angel', sets: 2 },
        { id: 'hip-flexor-stretch', sets: 1 },
        { id: 'standing-forward-fold', sets: 1 },
        { id: 'butterfly', sets: 1 },
        { id: 'neck-stretch', sets: 1 },
      ]),
    ],
  },
  {
    id: 'chair-and-wall',
    name: 'Chair and Wall',
    tagline: 'Strength with something to hold.',
    description:
      'Three gentle sessions built around a sturdy chair and a wall. Ideal if balance, knees or getting down to the floor are a concern. Every movement can be done holding on.',
    level: 1,
    weeks: 3,
    equipment: ['chair', 'wall'],
    focus: ['Strength', 'Balance'],
    sessions: [
      s('sit-and-stand', 'Sit and stand', 'Legs', [
        { id: 'march-in-place', sets: 2 },
        { id: 'chair-squat', sets: 3, reps: '8–10' },
        { id: 'calf-raise', sets: 2, reps: '12' },
        { id: 'single-leg-balance', sets: 2, work: 20 },
        { id: 'wall-pushup', sets: 2, reps: '10' },
        { id: 'quad-stretch', sets: 1 },
      ]),
      s('push-and-pull', 'Push and pull', 'Upper body', [
        { id: 'arm-circles', sets: 1 },
        { id: 'wall-pushup', sets: 3, reps: '10' },
        { id: 'incline-pushup', sets: 2, reps: '8' },
        { id: 'towel-row', sets: 3, reps: '10' },
        { id: 'band-pull-apart', sets: 2 },
        { id: 'chest-stretch', sets: 1 },
      ]),
      s('balance-and-breathe', 'Balance and breathe', 'Balance', [
        { id: 'march-in-place', sets: 1 },
        { id: 'single-leg-balance', sets: 3, work: 25 },
        { id: 'tree-pose', sets: 2, work: 20 },
        { id: 'hip-abduction', sets: 2, reps: '10 each side' },
        { id: 'seated-twist', sets: 1 },
        { id: 'neck-stretch', sets: 1 },
      ]),
    ],
  },
]

export const programById = Object.fromEntries(programs.map(p => [p.id, p]))

export function sessionExercises(session) {
  return session.exercises
    .map(item => {
      const exercise = exerciseById[item.id]
      if (!exercise) return null
      return {
        ...exercise,
        sets: item.sets ?? exercise.sets,
        reps: item.reps ?? exercise.reps,
        work: item.work ?? exercise.work,
        rest: item.rest ?? exercise.rest,
        sessionNote: item.note,
      }
    })
    .filter(Boolean)
}

export function sessionSeconds(session) {
  return sessionExercises(session).reduce(
    (total, e) => total + e.sets * (e.work + e.rest),
    0,
  )
}

export function sessionMinutes(session) {
  return Math.max(1, Math.round(sessionSeconds(session) / 60))
}

export function programMinutes(program) {
  return program.sessions.reduce((total, session) => total + sessionMinutes(session), 0)
}

export function programEquipment(program) {
  const set = new Set(program.equipment)
  return [...set]
}
