import { pose } from './geometry.js'

// Every exercise animation is a short loop made of keyframes. The keyframes are
// deliberately hand-authored: a good demonstration is not a physics simulation.
// `at` is 0..1 through the loop, and duplicate poses create a pause at the top or
// bottom of a rep.
//
// Pose conventions:
//   torso  0 = upright, 90 = chest to the right, -90 = chest to the left.
//   curl   bends the upper torso relative to the lower back (crunches, cat-cow).
//   A figure lying on its back has its head to the left: torso -90.
//   A figure lying face down has its head to the right: torso 90.

const P = o => pose(o)

const standSide = (o = {}) => P({
  x: 200, y: 160, torso: 0,
  handA: { x: 203, y: 178 }, handB: { x: 197, y: 178 },
  footA: { x: 204, y: 250 }, footB: { x: 196, y: 250 },
  ...o,
})

const standFront = (o = {}) => P({
  x: 200, y: 160, torso: 0, view: 'front',
  handA: { x: 178, y: 178 }, handB: { x: 222, y: 178 },
  footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 },
  ...o,
})

const squatSide = (o = {}) => P({
  x: 200, y: 200, torso: 30, curl: 6,
  handA: { x: 252, y: 194 }, handB: { x: 246, y: 194 },
  footA: { x: 206, y: 250 }, footB: { x: 196, y: 250 },
  ...o,
})

const squatFront = (o = {}) => P({
  x: 200, y: 200, torso: 0, view: 'front',
  handA: { x: 186, y: 196 }, handB: { x: 214, y: 196 },
  footA: { x: 150, y: 250 }, footB: { x: 250, y: 250 },
  kneeA: 'back', kneeB: 'forward',
  ...o,
})

// A high plank. The long arms in this rig mean the body line is a shallow pike,
// which still reads clearly as a plank from the side.
const pushTop = (o = {}) => P({
  x: 190, y: 200, torso: 65,
  handA: { x: 254, y: 250 }, handB: { x: 250, y: 250 },
  footA: { x: 116, y: 258 }, footB: { x: 112, y: 258 },
  ...o,
})

const pushBottom = (o = {}) => P({
  x: 200, y: 208, torso: 65,
  handA: { x: 254, y: 250 }, handB: { x: 250, y: 250 },
  footA: { x: 116, y: 258 }, footB: { x: 112, y: 258 },
  ...o,
})

const plankSide = (o = {}) => pushTop(o)

const lungeSide = (o = {}) => P({
  x: 200, y: 212, torso: 10, curl: 4,
  handA: { x: 208, y: 232 }, handB: { x: 202, y: 232 },
  footA: { x: 258, y: 250 }, footB: { x: 131, y: 250 },
  ...o,
})

// Lying on the back, head to the left, arms by the sides.
const lieBack = (o = {}) => P({
  x: 230, y: 242, torso: -90,
  handA: { x: 240, y: 250 }, handB: { x: 236, y: 250 },
  footA: { x: 312, y: 250 }, footB: { x: 306, y: 250 },
  ...o,
})

// Lying face down, head to the right, arms by the sides.
const lieFaceDown = (o = {}) => P({
  x: 170, y: 242, torso: 90,
  handA: { x: 160, y: 248 }, handB: { x: 156, y: 248 },
  footA: { x: 90, y: 250 }, footB: { x: 86, y: 250 },
  ...o,
})

const quadruped = (o = {}) => P({
  x: 190, y: 210, torso: 90,
  handA: { x: 248, y: 250 }, handB: { x: 244, y: 250 },
  footA: { x: 151, y: 250 }, footB: { x: 147, y: 250 },
  ...o,
})

const childPose = (o = {}) => P({
  x: 190, y: 215, torso: 105, curl: 10,
  handA: { x: 255, y: 248 }, handB: { x: 251, y: 248 },
  footA: { x: 150, y: 250 }, footB: { x: 146, y: 250 },
  ...o,
})

const dogPose = (o = {}) => P({
  x: 190, y: 160, torso: 125,
  handA: { x: 268, y: 250 }, handB: { x: 264, y: 250 },
  footA: { x: 168, y: 250 }, footB: { x: 164, y: 250 },
  ...o,
})

const cobraPose = (o = {}) => P({
  x: 190, y: 242, torso: 90, curl: -55, head: -25,
  handA: { x: 252, y: 250 }, handB: { x: 248, y: 250 },
  footA: { x: 102, y: 250 }, footB: { x: 98, y: 250 },
  ...o,
})

const bridgeTop = (o = {}) => P({
  x: 230, y: 214, torso: -123, head: 30,
  handA: { x: 240, y: 250 }, handB: { x: 236, y: 250 },
  footA: { x: 295, y: 250 }, footB: { x: 289, y: 250 },
  ...o,
})

const bridgeBottom = (o = {}) => P({
  x: 230, y: 242, torso: -95, head: 5,
  handA: { x: 240, y: 250 }, handB: { x: 236, y: 250 },
  footA: { x: 295, y: 250 }, footB: { x: 289, y: 250 },
  ...o,
})

const crunchStart = (o = {}) => P({
  x: 230, y: 242, torso: -90,
  handA: { x: 150, y: 224 }, handB: { x: 146, y: 224 },
  footA: { x: 292, y: 250 }, footB: { x: 286, y: 250 },
  ...o,
})

const crunchTop = (o = {}) => P({
  x: 230, y: 242, torso: -90, curl: 42, head: -8,
  handA: { x: 158, y: 210 }, handB: { x: 154, y: 210 },
  footA: { x: 292, y: 250 }, footB: { x: 286, y: 250 },
  ...o,
})

const highKnees = (o = {}) => P({
  x: 200, y: 160, torso: 4, view: 'front',
  handA: { x: 174, y: 150 }, handB: { x: 226, y: 150 },
  footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 },
  ...o,
})

function make(id, { view = 'side', duration = 2600, keys, props = [], still = 0.5, title }) {
  return {
    id,
    view,
    duration,
    still,
    title,
    props,
    keys: keys.map(([at, p]) => ({ at, pose: p })),
  }
}

// Repeats a two-pose movement with pauses at each end. The pauses make a rep read
// as a rep instead of a metronome.
function rep(top, bottom, { holdTop = 0.08, holdBottom = 0.1 } = {}) {
  return [
    [0, top],
    [holdTop, top],
    [0.5, bottom],
    [0.5 + holdBottom, bottom],
    [1, top],
  ]
}

const patterns = {
  stand: () => make('stand', {
    duration: 4200,
    keys: [[0, standSide()], [0.5, standSide({ torso: 1 })], [1, standSide()]],
    still: 0,
  }),

  squat: (v = {}) => {
    if (v.variant === 'sumo') {
      return make('squat-sumo', {
        view: 'front',
        duration: 3000,
        keys: rep(
          standFront({ handA: { x: 186, y: 196 }, handB: { x: 214, y: 196 }, footA: { x: 160, y: 250 }, footB: { x: 240, y: 250 } }),
          squatFront(),
        ),
        still: 0.5,
      })
    }
    if (v.variant === 'jump') {
      return make('squat-jump', {
        duration: 1900,
        keys: [
          [0, standSide()],
          [0.18, squatSide()],
          [0.4, squatSide({ y: 206, torso: 32, handA: { x: 226, y: 196 }, handB: { x: 220, y: 196 } })],
          [0.6, P({ x: 200, y: 126, torso: 4, handA: { x: 200, y: 60 }, handB: { x: 196, y: 60 }, footA: { x: 204, y: 220 }, footB: { x: 196, y: 220 }, liftA: 18, liftB: 18 })],
          [0.8, squatSide()],
          [1, standSide()],
        ],
        still: 0.3,
      })
    }
    if (v.variant === 'chair') {
      return make('squat-chair', {
        duration: 3200,
        props: [{ kind: 'chair', x: 146, seatY: 200, facing: -1, width: 58, height: 52 }],
        keys: rep(
          standSide(),
          P({ x: 174, y: 200, torso: 26, curl: 4, handA: { x: 220, y: 196 }, handB: { x: 214, y: 196 }, footA: { x: 234, y: 250 }, footB: { x: 226, y: 250 } }),
        ),
        still: 0.5,
      })
    }
    if (v.variant === 'backpack') {
      return make('backpack-squat', {
        duration: 3000,
        props: [{ kind: 'backpack' }],
        keys: rep(standSide(), squatSide()),
        still: 0.5,
      })
    }
    if (v.variant === 'pulse') {
      return make('squat-pulse', {
        duration: 1600,
        keys: [
          [0, squatSide()],
          [0.5, squatSide({ y: 208, torso: 32 })],
          [1, squatSide()],
        ],
        still: 0.5,
      })
    }
    if (v.variant === 'hold') {
      return make('squat-hold', {
        duration: 5000,
        keys: [[0, squatSide()], [0.5, squatSide({ y: 203, torso: 31 })], [1, squatSide()]],
        still: 0,
      })
    }
    return make('squat', {
      duration: 3000,
      keys: rep(standSide(), squatSide()),
      still: 0.5,
    })
  },

  wallSit: (v = {}) => {
    if (v.variant === 'single') {
      return make('single-leg-wall-sit', {
        duration: 5200,
        props: [{ kind: 'wall', x: 152, facing: 1 }],
        keys: [
          [0, P({ x: 180, y: 212, torso: 0, handA: { x: 208, y: 214 }, handB: { x: 204, y: 214 }, footA: { x: 252, y: 250 }, footB: { x: 224, y: 224 }, kneeB: 'forward' })],
          [0.5, P({ x: 180, y: 214, torso: 1, handA: { x: 208, y: 216 }, handB: { x: 204, y: 216 }, footA: { x: 252, y: 250 }, footB: { x: 222, y: 222 }, kneeB: 'forward' })],
          [1, P({ x: 180, y: 212, torso: 0, handA: { x: 208, y: 214 }, handB: { x: 204, y: 214 }, footA: { x: 252, y: 250 }, footB: { x: 224, y: 224 }, kneeB: 'forward' })],
        ],
        still: 0,
      })
    }
    return make('wall-sit', {
      duration: 5200,
      props: [{ kind: 'wall', x: 152, facing: 1 }],
      keys: [
        [0, P({ x: 180, y: 212, torso: 0, handA: { x: 208, y: 214 }, handB: { x: 204, y: 214 }, footA: { x: 252, y: 250 }, footB: { x: 246, y: 250 } })],
        [0.5, P({ x: 180, y: 214, torso: 1, handA: { x: 208, y: 216 }, handB: { x: 204, y: 216 }, footA: { x: 252, y: 250 }, footB: { x: 246, y: 250 } })],
        [1, P({ x: 180, y: 212, torso: 0, handA: { x: 208, y: 214 }, handB: { x: 204, y: 214 }, footA: { x: 252, y: 250 }, footB: { x: 246, y: 250 } })],
      ],
      still: 0,
    })
  },

  pushup: (v = {}) => {
    if (v.variant === 'wall') {
      return make('wall-pushup', {
        duration: 2600,
        props: [{ kind: 'wall', x: 330, facing: -1 }],
        keys: rep(
          P({ x: 238, y: 172, torso: 18, handA: { x: 320, y: 150 }, handB: { x: 316, y: 150 }, footA: { x: 210, y: 250 }, footB: { x: 204, y: 250 } }),
          P({ x: 250, y: 176, torso: 18, handA: { x: 320, y: 150 }, handB: { x: 316, y: 150 }, footA: { x: 210, y: 250 }, footB: { x: 204, y: 250 } }),
        ),
        still: 0.5,
      })
    }
    if (v.variant === 'incline') {
      return make('incline-pushup', {
        duration: 2800,
        props: [{ kind: 'chair', x: 300, seatY: 198, facing: 1, width: 50, height: 54 }],
        keys: rep(
          P({ x: 186, y: 202, torso: 72, handA: { x: 302, y: 198 }, handB: { x: 298, y: 198 }, footA: { x: 116, y: 258 }, footB: { x: 112, y: 258 } }),
          P({ x: 196, y: 210, torso: 72, handA: { x: 302, y: 198 }, handB: { x: 298, y: 198 }, footA: { x: 116, y: 258 }, footB: { x: 112, y: 258 } }),
        ),
        still: 0.5,
      })
    }
    if (v.variant === 'knee') {
      return make('knee-pushup', {
        duration: 2600,
        keys: rep(
          P({ x: 190, y: 206, torso: 58, handA: { x: 254, y: 250 }, handB: { x: 250, y: 250 }, footA: { x: 136, y: 248 }, footB: { x: 132, y: 248 }, footAngleA: 20, footAngleB: 20 }),
          P({ x: 198, y: 216, torso: 58, handA: { x: 254, y: 250 }, handB: { x: 250, y: 250 }, footA: { x: 136, y: 248 }, footB: { x: 132, y: 248 }, footAngleA: 20, footAngleB: 20 }),
        ),
        still: 0.5,
      })
    }
    if (v.variant === 'decline') {
      return make('decline-pushup', {
        duration: 2800,
        props: [{ kind: 'chair', x: 118, seatY: 214, facing: -1, width: 50, height: 44 }],
        keys: rep(
          P({ x: 196, y: 196, torso: 64, handA: { x: 254, y: 250 }, handB: { x: 250, y: 250 }, footA: { x: 132, y: 214 }, footB: { x: 128, y: 214 } }),
          P({ x: 206, y: 206, torso: 64, handA: { x: 254, y: 250 }, handB: { x: 250, y: 250 }, footA: { x: 132, y: 214 }, footB: { x: 128, y: 214 } }),
        ),
        still: 0.5,
      })
    }
    if (v.variant === 'pike') {
      return make('pike-pushup', {
        duration: 2800,
        keys: rep(
          P({ x: 186, y: 158, torso: 118, handA: { x: 252, y: 250 }, handB: { x: 248, y: 250 }, footA: { x: 160, y: 250 }, footB: { x: 156, y: 250 } }),
          P({ x: 194, y: 170, torso: 124, handA: { x: 252, y: 250 }, handB: { x: 248, y: 250 }, footA: { x: 160, y: 250 }, footB: { x: 156, y: 250 } }),
        ),
        still: 0.5,
      })
    }
    return make('pushup', {
      duration: 2700,
      keys: rep(pushTop(), pushBottom()),
      still: 0.5,
    })
  },

  plank: (v = {}) => {
    if (v.variant === 'forearm') {
      const basePose = {
        x: 190, y: 212, torso: 90,
        arms: { A: { a: 0, e: 90 }, B: { a: 0, e: 90 } },
        footA: { x: 110, y: 258 }, footB: { x: 106, y: 258 },
      }
      return make('forearm-plank', {
        duration: 5000,
        keys: [[0, P(basePose)], [0.5, P({ ...basePose, torso: 91, y: 213 })], [1, P(basePose)]],
        still: 0,
      })
    }
    if (v.variant === 'side') {
      const basePose = {
        view: 'front', x: 220, y: 210, torso: 75, head: -4,
        handA: { x: 274, y: 256 }, handB: { x: 278, y: 120 },
        footA: { x: 129, y: 258 }, footB: { x: 125, y: 258 },
      }
      if (v.dip) {
        return make('side-plank-dip', {
          duration: 2400,
          keys: [
            [0, P(basePose)],
            [0.5, P({ ...basePose, y: 220, torso: 82, handB: { x: 272, y: 142 } })],
            [1, P(basePose)],
          ],
          still: 0,
        })
      }
      return make('side-plank', {
        duration: 5000,
        keys: [[0, P(basePose)], [0.5, P({ ...basePose, y: 211, torso: 76 })], [1, P(basePose)]],
        still: 0,
      })
    }
    if (v.variant === 'reverse') {
      const basePose = {
        x: 200, y: 220, torso: -60, head: 12,
        handA: { x: 151, y: 250 }, handB: { x: 147, y: 250 },
        footA: { x: 285, y: 250 }, footB: { x: 279, y: 250 },
      }
      return make('reverse-plank', {
        duration: 5000,
        keys: [[0, P(basePose)], [0.5, P({ ...basePose, y: 216, torso: -62 })], [1, P(basePose)]],
        still: 0,
      })
    }
    const base = plankSide()
    return make('plank', {
      duration: 5000,
      keys: [[0, base], [0.5, plankSide({ torso: 66, y: 201 })], [1, base]],
      still: 0,
    })
  },

  shoulderTap: () => make('shoulder-tap', {
    duration: 2200,
    keys: [
      [0, plankSide()],
      [0.22, plankSide({ handA: { x: 228, y: 202 }, handB: { x: 254, y: 250 } })],
      [0.5, plankSide()],
      [0.72, plankSide({ handB: { x: 232, y: 202 }, handA: { x: 254, y: 250 } })],
      [1, plankSide()],
    ],
    still: 0.5,
  }),

  plankUpDown: () => make('plank-up-down', {
    duration: 3000,
    keys: [
      [0, plankSide()],
      [0.25, P({ x: 190, y: 212, torso: 90, arms: { A: { a: 0, e: 90 }, B: { a: 0, e: 90 } }, footA: { x: 110, y: 258 }, footB: { x: 106, y: 258 } })],
      [0.5, plankSide()],
      [0.75, P({ x: 190, y: 212, torso: 90, arms: { A: { a: 0, e: 90 }, B: { a: 0, e: 90 } }, footA: { x: 110, y: 258 }, footB: { x: 106, y: 258 } })],
      [1, plankSide()],
    ],
    still: 0.25,
  }),

  mountainClimber: () => make('mountain-climber', {
    duration: 1100,
    keys: [
      [0, plankSide()],
      [0.25, plankSide({ footA: { x: 226, y: 232 }, kneeA: 'forward', torso: 67 })],
      [0.5, plankSide()],
      [0.75, plankSide({ footB: { x: 222, y: 232 }, kneeB: 'forward', torso: 67 })],
      [1, plankSide()],
    ],
    still: 0.25,
  }),

  bearCrawl: () => make('bear-crawl', {
    duration: 1800,
    keys: [
      [0, P({ x: 190, y: 198, torso: 80, handA: { x: 250, y: 250 }, handB: { x: 246, y: 250 }, footA: { x: 148, y: 250 }, footB: { x: 144, y: 250 } })],
      [0.5, P({ x: 198, y: 196, torso: 80, handA: { x: 262, y: 250 }, handB: { x: 242, y: 250 }, footA: { x: 158, y: 250 }, footB: { x: 136, y: 250 } })],
      [1, P({ x: 190, y: 198, torso: 80, handA: { x: 250, y: 250 }, handB: { x: 246, y: 250 }, footA: { x: 148, y: 250 }, footB: { x: 144, y: 250 } })],
    ],
    still: 0.5,
  }),

  crunch: (v = {}) => {
    if (v.variant === 'reverse') {
      return make('reverse-crunch', {
        duration: 2800,
        keys: [
          [0, lieBack({ torso: -90, footA: { x: 280, y: 240 }, footB: { x: 274, y: 240 }, handA: { x: 240, y: 250 }, handB: { x: 236, y: 250 } })],
          [0.5, P({ x: 230, y: 236, torso: -75, curl: 12, head: -8, handA: { x: 240, y: 246 }, handB: { x: 236, y: 246 }, footA: { x: 268, y: 215 }, footB: { x: 262, y: 215 }, kneeA: 'forward', kneeB: 'forward' })],
          [1, lieBack({ torso: -90, footA: { x: 280, y: 240 }, footB: { x: 274, y: 240 }, handA: { x: 240, y: 250 }, handB: { x: 236, y: 250 } })],
        ],
        still: 0.5,
      })
    }
    if (v.variant === 'bicycle') {
      return make('bicycle-crunch', {
        duration: 1700,
        keys: [
          [0, lieBack({ torso: -90, handA: { x: 150, y: 224 }, handB: { x: 146, y: 224 }, footA: { x: 250, y: 218 }, footB: { x: 316, y: 246 }, kneeA: 'forward' })],
          [0.5, lieBack({ torso: -90, handA: { x: 146, y: 224 }, handB: { x: 150, y: 224 }, footA: { x: 316, y: 246 }, footB: { x: 250, y: 218 }, kneeB: 'forward' })],
          [1, lieBack({ torso: -90, handA: { x: 150, y: 224 }, handB: { x: 146, y: 224 }, footA: { x: 250, y: 218 }, footB: { x: 316, y: 246 }, kneeA: 'forward' })],
        ],
        still: 0,
      })
    }
    if (v.variant === 'hold') {
      return make('crunch-hold', {
        duration: 5000,
        keys: [
          [0, crunchTop()],
          [0.25, crunchTop({ curl: 46 })],
          [0.5, crunchTop()],
          [0.75, crunchTop({ curl: 46 })],
          [1, crunchTop()],
        ],
        still: 0,
      })
    }
    if (v.variant === 'vup') {
      return make('v-up', {
        duration: 2600,
        keys: rep(
          lieBack(),
          P({ x: 230, y: 242, torso: -55, curl: 20, head: -6, handA: { x: 290, y: 186 }, handB: { x: 286, y: 186 }, footA: { x: 286, y: 156 }, footB: { x: 280, y: 156 } }),
        ),
        still: 0.5,
      })
    }
    if (v.variant === 'toeTouch') {
      return make('toe-touch', {
        duration: 2600,
        keys: rep(
          lieBack({ footA: { x: 300, y: 172 }, footB: { x: 294, y: 172 } }),
          P({ x: 230, y: 242, torso: -70, curl: 30, head: -4, handA: { x: 290, y: 190 }, handB: { x: 286, y: 190 }, footA: { x: 300, y: 172 }, footB: { x: 294, y: 172 } }),
        ),
        still: 0.5,
      })
    }
    if (v.variant === 'legraise') {
      return make('leg-raise', {
        duration: 3000,
        keys: [
          [0, lieBack()],
          [0.5, lieBack({ footA: { x: 230, y: 154 }, footB: { x: 224, y: 154 } })],
          [1, lieBack()],
        ],
        still: 0.5,
      })
    }
    if (v.variant === 'flutter') {
      return make('flutter-kicks', {
        duration: 900,
        keys: [
          [0, lieBack({ footA: { x: 312, y: 232 }, footB: { x: 306, y: 250 } })],
          [0.5, lieBack({ footA: { x: 312, y: 250 }, footB: { x: 306, y: 232 } })],
          [1, lieBack({ footA: { x: 312, y: 232 }, footB: { x: 306, y: 250 } })],
        ],
        still: 0,
      })
    }
    if (v.variant === 'situp') {
      return make('situp', {
        duration: 3200,
        keys: rep(
          lieBack({ handA: { x: 150, y: 224 }, handB: { x: 146, y: 224 }, footA: { x: 300, y: 250 }, footB: { x: 294, y: 250 } }),
          P({ x: 230, y: 242, torso: -8, head: 0, handA: { x: 214, y: 186 }, handB: { x: 210, y: 186 }, footA: { x: 300, y: 250 }, footB: { x: 294, y: 250 } }),
        ),
        still: 0.5,
      })
    }
    if (v.variant === 'twist') {
      return make('russian-twist', {
        duration: 1800,
        keys: [
          [0, P({ x: 210, y: 228, torso: 26, curl: 6, handA: { x: 246, y: 196 }, handB: { x: 240, y: 200 }, footA: { x: 286, y: 244 }, footB: { x: 280, y: 244 }, kneeA: 'forward', kneeB: 'forward' })],
          [0.5, P({ x: 210, y: 228, torso: 26, curl: 6, handA: { x: 278, y: 204 }, handB: { x: 272, y: 208 }, footA: { x: 286, y: 244 }, footB: { x: 280, y: 244 }, kneeA: 'forward', kneeB: 'forward' })],
          [1, P({ x: 210, y: 228, torso: 26, curl: 6, handA: { x: 246, y: 196 }, handB: { x: 240, y: 200 }, footA: { x: 286, y: 244 }, footB: { x: 280, y: 244 }, kneeA: 'forward', kneeB: 'forward' })],
        ],
        still: 0,
      })
    }
    return make('crunch', {
      duration: 2800,
      keys: rep(crunchStart(), crunchTop()),
      still: 0.5,
    })
  },

  hollow: (v = {}) => {
    if (v.variant === 'rock') {
      return make('hollow-rock', {
        duration: 2200,
        keys: [
          [0, lieBack({ torso: -85, head: 8, handA: { x: 112, y: 240 }, handB: { x: 108, y: 240 }, footA: { x: 310, y: 236 }, footB: { x: 304, y: 236 } })],
          [0.5, lieBack({ torso: -72, head: 8, y: 236, handA: { x: 118, y: 222 }, handB: { x: 114, y: 222 }, footA: { x: 314, y: 226 }, footB: { x: 308, y: 226 } })],
          [1, lieBack({ torso: -85, head: 8, handA: { x: 112, y: 240 }, handB: { x: 108, y: 240 }, footA: { x: 310, y: 236 }, footB: { x: 304, y: 236 } })],
        ],
        still: 0,
      })
    }
    return make('hollow-hold', {
      duration: 5000,
      keys: [
        [0, lieBack({ torso: -85, head: 8, handA: { x: 110, y: 238 }, handB: { x: 106, y: 238 }, footA: { x: 312, y: 232 }, footB: { x: 306, y: 232 } })],
        [0.5, lieBack({ torso: -84, head: 8, y: 241, handA: { x: 108, y: 236 }, handB: { x: 104, y: 236 }, footA: { x: 314, y: 230 }, footB: { x: 308, y: 230 } })],
        [1, lieBack({ torso: -85, head: 8, handA: { x: 110, y: 238 }, handB: { x: 106, y: 238 }, footA: { x: 312, y: 232 }, footB: { x: 306, y: 232 } })],
      ],
      still: 0,
    })
  },

  birdDog: (v = {}) => {
    if (v.variant === 'donkey') {
      return make('donkey-kick', {
        duration: 2600,
        keys: rep(
          quadruped(),
          quadruped({ legs: { B: { a: -45, e: -113 } }, footB: 20 }),
        ),
        still: 0.5,
      })
    }
    return make('bird-dog', {
      duration: 3200,
      keys: [
        [0, quadruped()],
        [0.5, quadruped({ handA: { x: 320, y: 210 }, footB: { x: 100, y: 210 }, head: -8 })],
        [1, quadruped()],
      ],
      still: 0.5,
    })
  },

  deadBug: () => make('dead-bug', {
    duration: 3000,
    keys: [
      [0, lieBack({ torso: -90, handA: { x: 190, y: 180 }, handB: { x: 186, y: 180 }, footA: { x: 270, y: 190 }, footB: { x: 264, y: 190 }, kneeA: 'forward', kneeB: 'forward' })],
      [0.5, lieBack({ torso: -90, handA: { x: 110, y: 240 }, handB: { x: 186, y: 180 }, footA: { x: 270, y: 190 }, footB: { x: 312, y: 242 }, kneeA: 'forward' })],
      [1, lieBack({ torso: -90, handA: { x: 190, y: 180 }, handB: { x: 186, y: 180 }, footA: { x: 270, y: 190 }, footB: { x: 264, y: 190 }, kneeA: 'forward', kneeB: 'forward' })],
    ],
    still: 0,
  }),

  superman: (v = {}) => {
    if (v.variant === 'swimmer') {
      return make('swimmer', {
        duration: 2200,
        keys: [
          [0, lieFaceDown({ torso: 90, curl: -8, head: -4, y: 240, handA: { x: 326, y: 230 }, handB: { x: 160, y: 248 }, footA: { x: 92, y: 230 }, footB: { x: 86, y: 250 } })],
          [0.5, lieFaceDown({ torso: 90, curl: -8, head: -4, y: 240, handA: { x: 160, y: 248 }, handB: { x: 322, y: 230 }, footA: { x: 90, y: 250 }, footB: { x: 88, y: 230 } })],
          [1, lieFaceDown({ torso: 90, curl: -8, head: -4, y: 240, handA: { x: 326, y: 230 }, handB: { x: 160, y: 248 }, footA: { x: 92, y: 230 }, footB: { x: 86, y: 250 } })],
        ],
        still: 0,
      })
    }
    return make('superman', {
      duration: 3200,
      keys: [
        [0, lieFaceDown()],
        [0.5, lieFaceDown({ torso: 90, curl: -12, head: -8, y: 240, handA: { x: 326, y: 232 }, handB: { x: 322, y: 232 }, footA: { x: 92, y: 232 }, footB: { x: 88, y: 232 } })],
        [1, lieFaceDown()],
      ],
      still: 0.5,
    })
  },

  gluteBridge: (v = {}) => {
    if (v.variant === 'single') {
      return make('single-leg-glute-bridge', {
        duration: 3000,
        keys: rep(
          bridgeBottom({ footA: { x: 295, y: 250 }, footB: { x: 318, y: 248 } }),
          bridgeTop({ footA: { x: 295, y: 250 }, footB: { x: 315, y: 230 } }),
          { holdTop: 0.1, holdBottom: 0.12 },
        ),
        still: 0.5,
      })
    }
    if (v.variant === 'march') {
      return make('glute-bridge-march', {
        duration: 2800,
        keys: [
          [0, bridgeTop()],
          [0.25, bridgeTop({ footB: { x: 286, y: 220 }, kneeB: 'forward' })],
          [0.5, bridgeTop()],
          [0.75, bridgeTop({ footA: { x: 292, y: 220 }, kneeA: 'forward' })],
          [1, bridgeTop()],
        ],
        still: 0,
      })
    }
    if (v.variant === 'hold') {
      return make('glute-bridge-hold', {
        duration: 5000,
        keys: [[0, bridgeTop()], [0.5, bridgeTop({ y: 212 })], [1, bridgeTop()]],
        still: 0,
      })
    }
    return make('glute-bridge', {
      duration: 3000,
      keys: rep(bridgeBottom(), bridgeTop(), { holdTop: 0.1, holdBottom: 0.12 }),
      still: 0.5,
    })
  },

  hipThrust: (v = {}) => {
    if (v.variant === 'single') {
      return make('single-leg-hip-thrust', {
        duration: 3000,
        props: [{ kind: 'chair', x: 160, seatY: 208, facing: -1, width: 58, height: 46 }],
        keys: rep(
          P({ x: 230, y: 242, torso: -53, head: 4, handA: { x: 240, y: 250 }, handB: { x: 236, y: 250 }, footA: { x: 300, y: 250 }, footB: { x: 318, y: 238 } }),
          P({ x: 230, y: 220, torso: -78, head: 14, handA: { x: 240, y: 240 }, handB: { x: 236, y: 240 }, footA: { x: 300, y: 250 }, footB: { x: 322, y: 222 } }),
        ),
        still: 0.5,
      })
    }
    return make('hip-thrust', {
      duration: 3000,
      props: [{ kind: 'chair', x: 160, seatY: 208, facing: -1, width: 58, height: 46 }],
      keys: rep(
        P({ x: 230, y: 242, torso: -53, head: 4, handA: { x: 240, y: 250 }, handB: { x: 236, y: 250 }, footA: { x: 300, y: 250 }, footB: { x: 294, y: 250 } }),
        P({ x: 230, y: 220, torso: -78, head: 14, handA: { x: 240, y: 240 }, handB: { x: 236, y: 240 }, footA: { x: 300, y: 250 }, footB: { x: 294, y: 250 } }),
      ),
      still: 0.5,
    })
  },

  goodMorning: (v = {}) => {
    const props = v.variant === 'backpack' ? [{ kind: 'backpack' }] : []
    return make(v.variant === 'backpack' ? 'backpack-good-morning' : 'good-morning', {
      duration: 3000,
      props,
      keys: rep(
        standSide({ handA: { x: 212, y: 76 }, handB: { x: 208, y: 80 }, elbowA: 'forward', elbowB: 'forward' }),
        P({ x: 200, y: 168, torso: 55, curl: 4, handA: { x: 266, y: 120 }, handB: { x: 262, y: 124 }, footA: { x: 204, y: 250 }, footB: { x: 196, y: 250 }, elbowA: 'forward', elbowB: 'forward' }),
      ),
      still: 0.5,
    })
  },

  singleLegRdl: () => make('single-leg-rdl', {
    duration: 3400,
    keys: rep(
      standSide(),
      P({ x: 198, y: 172, torso: 70, handA: { x: 240, y: 240 }, handB: { x: 236, y: 240 }, footA: { x: 200, y: 250 }, footB: { x: 110, y: 195 }, kneeB: 'forward' }),
    ),
    still: 0.5,
  }),

  lunge: (v = {}) => {
    if (v.variant === 'lateral') {
      return make('lateral-lunge', {
        view: 'front',
        duration: 3000,
        keys: rep(
          standFront({ footA: { x: 160, y: 250 }, footB: { x: 240, y: 250 } }),
          P({ view: 'front', x: 170, y: 205, torso: 10, handA: { x: 150, y: 172 }, handB: { x: 192, y: 172 }, footA: { x: 125, y: 250 }, footB: { x: 260, y: 250 }, kneeA: 'back', kneeB: 'forward' }),
        ),
        still: 0.5,
      })
    }
    if (v.variant === 'curtsy') {
      return make('curtsy-lunge', {
        duration: 3000,
        keys: rep(
          standSide(),
          P({ x: 198, y: 210, torso: 14, handA: { x: 206, y: 230 }, handB: { x: 200, y: 230 }, footA: { x: 252, y: 250 }, footB: { x: 162, y: 250 } }),
        ),
        still: 0.5,
      })
    }
    if (v.variant === 'jump') {
      return make('jump-lunge', {
        duration: 1900,
        keys: [
          [0, lungeSide()],
          [0.35, P({ x: 200, y: 130, torso: 8, handA: { x: 200, y: 72 }, handB: { x: 196, y: 72 }, footA: { x: 250, y: 220 }, footB: { x: 150, y: 220 }, liftA: 14, liftB: 14 })],
          [0.65, P({ x: 200, y: 212, torso: 12, handA: { x: 208, y: 232 }, handB: { x: 202, y: 232 }, footA: { x: 131, y: 250 }, footB: { x: 258, y: 250 } })],
          [1, lungeSide()],
        ],
        still: 0,
      })
    }
    if (v.variant === 'backpack') {
      return make('backpack-lunge', {
        duration: 3000,
        props: [{ kind: 'backpack' }],
        keys: rep(standSide(), lungeSide()),
        still: 0.5,
      })
    }
    if (v.variant === 'bulgarian') {
      return make('bulgarian-split-squat', {
        duration: 3200,
        props: [{ kind: 'chair', x: 120, seatY: 212, facing: -1, width: 56, height: 42 }],
        keys: rep(
          P({ x: 210, y: 190, torso: 10, handA: { x: 216, y: 206 }, handB: { x: 210, y: 206 }, footA: { x: 260, y: 250 }, footB: { x: 130, y: 212 } }),
          P({ x: 210, y: 220, torso: 14, handA: { x: 216, y: 236 }, handB: { x: 210, y: 236 }, footA: { x: 260, y: 250 }, footB: { x: 130, y: 212 } }),
        ),
        still: 0.5,
      })
    }
    if (v.variant === 'split') {
      return make('split-squat', {
        duration: 3000,
        keys: rep(
          P({ x: 200, y: 188, torso: 6, handA: { x: 206, y: 204 }, handB: { x: 200, y: 204 }, footA: { x: 254, y: 250 }, footB: { x: 146, y: 250 }, kneeB: 'back' }),
          P({ x: 200, y: 222, torso: 10, handA: { x: 206, y: 238 }, handB: { x: 200, y: 238 }, footA: { x: 254, y: 250 }, footB: { x: 146, y: 250 }, kneeB: 'back' }),
        ),
        still: 0.5,
      })
    }
    return make('lunge', {
      duration: 3000,
      keys: rep(standSide(), lungeSide()),
      still: 0.5,
    })
  },

  stepUp: (v = {}) => {
    if (v.variant === 'down') {
      return make('step-down', {
        duration: 3000,
        props: [{ kind: 'steps', x: 300 }],
        keys: rep(
          P({ x: 300, y: 152, torso: 2, handA: { x: 306, y: 168 }, handB: { x: 300, y: 168 }, footA: { x: 318, y: 210 }, footB: { x: 282, y: 198 }, kneeB: 'forward' }),
          P({ x: 250, y: 184, torso: 8, handA: { x: 256, y: 200 }, handB: { x: 250, y: 200 }, footA: { x: 318, y: 210 }, footB: { x: 228, y: 250 } }),
        ),
        still: 0.5,
      })
    }
    return make('step-up', {
      duration: 3000,
      props: [{ kind: 'steps', x: 300 }],
      keys: rep(
        P({ x: 250, y: 184, torso: 8, handA: { x: 256, y: 200 }, handB: { x: 250, y: 200 }, footA: { x: 318, y: 210 }, footB: { x: 228, y: 250 } }),
        P({ x: 300, y: 152, torso: 2, handA: { x: 306, y: 168 }, handB: { x: 300, y: 168 }, footA: { x: 318, y: 210 }, footB: { x: 282, y: 198 }, kneeB: 'forward' }),
      ),
      still: 0.5,
    })
  },

  calfRaise: (v = {}) => {
    if (v.variant === 'single') {
      return make('single-leg-calf-raise', {
        duration: 2200,
        keys: rep(
          standSide({ footB: { x: 216, y: 220 }, kneeB: 'back' }),
          standSide({ y: 148, footA: { x: 200, y: 240 }, footB: { x: 216, y: 210 }, footAngleA: 56, kneeB: 'back' }),
        ),
        still: 0.5,
      })
    }
    return make('calf-raise', {
      duration: 2200,
      keys: rep(
        standSide(),
        standSide({ y: 148, footA: { x: 200, y: 240 }, footB: { x: 196, y: 240 }, footAngleA: 56, footAngleB: 56 }),
      ),
      still: 0.5,
    })
  },

  dip: () => make('chair-dip', {
    duration: 2800,
    props: [{ kind: 'chair', x: 144, seatY: 190, facing: -1, width: 56, height: 56 }],
    keys: rep(
      P({ x: 212, y: 190, torso: 0, handA: { x: 160, y: 190 }, handB: { x: 154, y: 190 }, footA: { x: 272, y: 250 }, footB: { x: 266, y: 250 } }),
      P({ x: 212, y: 216, torso: 0, handA: { x: 160, y: 190 }, handB: { x: 154, y: 190 }, footA: { x: 272, y: 250 }, footB: { x: 266, y: 250 } }),
    ),
    still: 0.5,
  }),

  pullUp: (v = {}) => {
    if (v.variant === 'hang') {
      return make('dead-hang', {
        duration: 5000,
        props: [{ kind: 'bar', y: 22, left: 130, right: 270 }],
        keys: [
          [0, P({ x: 200, y: 148, torso: 0, handA: { x: 180, y: 22 }, handB: { x: 220, y: 22 }, footA: { x: 204, y: 238 }, footB: { x: 196, y: 238 }, footAngleA: 70, footAngleB: 70 })],
          [0.5, P({ x: 200, y: 150, torso: 0, handA: { x: 180, y: 22 }, handB: { x: 220, y: 22 }, footA: { x: 204, y: 240 }, footB: { x: 196, y: 240 }, footAngleA: 70, footAngleB: 70 })],
          [1, P({ x: 200, y: 148, torso: 0, handA: { x: 180, y: 22 }, handB: { x: 220, y: 22 }, footA: { x: 204, y: 238 }, footB: { x: 196, y: 238 }, footAngleA: 70, footAngleB: 70 })],
        ],
        still: 0,
      })
    }
    if (v.variant === 'scap') {
      return make('scapular-pull-up', {
        duration: 2200,
        props: [{ kind: 'bar', y: 22, left: 130, right: 270 }],
        keys: rep(
          P({ x: 200, y: 150, torso: 0, handA: { x: 180, y: 22 }, handB: { x: 220, y: 22 }, footA: { x: 204, y: 240 }, footB: { x: 196, y: 240 }, footAngleA: 70, footAngleB: 70 }),
          P({ x: 200, y: 140, torso: 0, handA: { x: 180, y: 22 }, handB: { x: 220, y: 22 }, footA: { x: 204, y: 230 }, footB: { x: 196, y: 230 }, footAngleA: 70, footAngleB: 70 }),
        ),
        still: 0.5,
      })
    }
    return make('pull-up', {
      duration: 3000,
      props: [{ kind: 'bar', y: 22, left: 130, right: 270 }],
      keys: rep(
        P({ x: 200, y: 148, torso: 0, handA: { x: 180, y: 22 }, handB: { x: 220, y: 22 }, footA: { x: 204, y: 238 }, footB: { x: 196, y: 238 }, footAngleA: 70, footAngleB: 70 }),
        P({ x: 200, y: 102, torso: 0, handA: { x: 180, y: 22 }, handB: { x: 220, y: 22 }, footA: { x: 204, y: 192 }, footB: { x: 196, y: 192 }, footAngleA: 70, footAngleB: 70 }),
      ),
      still: 0.5,
    })
  },

  hangingKneeRaise: () => make('hanging-knee-raise', {
    duration: 3000,
    props: [{ kind: 'bar', y: 22, left: 130, right: 270 }],
    keys: rep(
      P({ x: 200, y: 148, torso: 0, handA: { x: 180, y: 22 }, handB: { x: 220, y: 22 }, footA: { x: 204, y: 238 }, footB: { x: 196, y: 238 }, footAngleA: 70, footAngleB: 70 }),
      P({ x: 200, y: 148, torso: 0, handA: { x: 180, y: 22 }, handB: { x: 220, y: 22 }, footA: { x: 238, y: 188 }, footB: { x: 232, y: 188 }, kneeA: 'forward', kneeB: 'forward', footAngleA: 20, footAngleB: 20 }),
    ),
    still: 0.5,
  }),

  invertedRow: () => make('inverted-row', {
    duration: 2800,
    props: [{ kind: 'table', x: 300, topY: 158, width: 108 }],
    keys: rep(
      P({ x: 200, y: 196, torso: 90, handA: { x: 300, y: 158 }, handB: { x: 296, y: 158 }, footA: { x: 120, y: 250 }, footB: { x: 116, y: 250 } }),
      P({ x: 200, y: 180, torso: 90, handA: { x: 300, y: 158 }, handB: { x: 296, y: 158 }, footA: { x: 120, y: 250 }, footB: { x: 116, y: 250 } }),
    ),
    still: 0.5,
  }),

  row: (v = {}) => {
    if (v.variant === 'backpack') {
      return make('backpack-row', {
        duration: 2800,
        props: [{ kind: 'backpack' }],
        keys: rep(
          P({ x: 200, y: 176, torso: 64, handA: { x: 264, y: 222 }, handB: { x: 258, y: 222 }, footA: { x: 204, y: 250 }, footB: { x: 196, y: 250 } }),
          P({ x: 200, y: 176, torso: 64, handA: { x: 226, y: 188 }, handB: { x: 220, y: 188 }, footA: { x: 204, y: 250 }, footB: { x: 196, y: 250 } }),
        ),
        still: 0.5,
      })
    }
    if (v.variant === 'band') {
      return make('band-row', {
        duration: 2600,
        props: [{ kind: 'band', between: 'hands' }],
        keys: rep(
          P({ x: 200, y: 180, torso: 8, handA: { x: 280, y: 200 }, handB: { x: 276, y: 200 }, footA: { x: 204, y: 250 }, footB: { x: 196, y: 250 } }),
          P({ x: 200, y: 180, torso: 8, handA: { x: 235, y: 165 }, handB: { x: 231, y: 165 }, footA: { x: 204, y: 250 }, footB: { x: 196, y: 250 } }),
        ),
        still: 0.5,
      })
    }
    return make('towel-row', {
      duration: 2800,
      props: [{ kind: 'towel' }],
      keys: rep(
        P({ x: 200, y: 176, torso: 64, handA: { x: 264, y: 222 }, handB: { x: 258, y: 222 }, footA: { x: 204, y: 250 }, footB: { x: 196, y: 250 } }),
        P({ x: 200, y: 176, torso: 64, handA: { x: 226, y: 188 }, handB: { x: 220, y: 188 }, footA: { x: 204, y: 250 }, footB: { x: 196, y: 250 } }),
      ),
      still: 0.5,
    })
  },

  bandPullApart: (v = {}) => {
    if (v.variant === 'face') {
      return make('band-face-pull', {
        view: 'front',
        duration: 2400,
        props: [{ kind: 'band', between: 'hands' }],
        keys: rep(
          P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 190, y: 112 }, handB: { x: 210, y: 112 }, footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } }),
          P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 154, y: 96 }, handB: { x: 246, y: 96 }, footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } }),
        ),
        still: 0.5,
      })
    }
    return make('band-pull-apart', {
      view: 'front',
      duration: 2400,
      props: [{ kind: 'band', between: 'hands' }],
      keys: rep(
        P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 188, y: 132 }, handB: { x: 212, y: 132 }, footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } }),
        P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 120, y: 122 }, handB: { x: 280, y: 122 }, footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } }),
      ),
      still: 0.5,
    })
  },

  bandPress: () => make('band-press', {
    view: 'front',
    duration: 2400,
    props: [{ kind: 'band', between: 'hands' }],
    keys: rep(
      P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 180, y: 122 }, handB: { x: 220, y: 122 }, footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } }),
      P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 174, y: 54 }, handB: { x: 226, y: 54 }, footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } }),
    ),
    still: 0.5,
  }),

  overheadPress: () => make('overhead-press', {
    view: 'front',
    duration: 2600,
    props: [{ kind: 'bottles' }],
    keys: rep(
      P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 176, y: 132 }, handB: { x: 224, y: 132 }, footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } }),
      P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 172, y: 54 }, handB: { x: 228, y: 54 }, footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } }),
    ),
    still: 0.5,
  }),

  lateralRaise: () => make('lateral-raise', {
    view: 'front',
    duration: 2600,
    props: [{ kind: 'bottles' }],
    keys: rep(
      P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 176, y: 174 }, handB: { x: 224, y: 174 }, footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } }),
      P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 112, y: 122 }, handB: { x: 288, y: 122 }, footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } }),
    ),
    still: 0.5,
  }),

  curl: () => make('bicep-curl', {
    view: 'front',
    duration: 2400,
    props: [{ kind: 'bottles' }],
    keys: rep(
      P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 174, y: 172 }, handB: { x: 226, y: 172 }, footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } }),
      P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 172, y: 130 }, handB: { x: 228, y: 130 }, footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } }),
    ),
    still: 0.5,
  }),

  lateralWalk: () => make('lateral-band-walk', {
    view: 'front',
    duration: 1600,
    props: [{ kind: 'band', between: 'ankles' }],
    keys: [
      [0, P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 174, y: 166 }, handB: { x: 226, y: 166 }, footA: { x: 174, y: 250 }, footB: { x: 226, y: 250 } })],
      [0.5, P({ view: 'front', x: 208, y: 160, torso: 0, handA: { x: 182, y: 166 }, handB: { x: 234, y: 166 }, footA: { x: 184, y: 250 }, footB: { x: 246, y: 250 } })],
      [1, P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 174, y: 166 }, handB: { x: 226, y: 166 }, footA: { x: 174, y: 250 }, footB: { x: 226, y: 250 } })],
    ],
    still: 0,
  }),

  jumpingJack: () => make('jumping-jack', {
    view: 'front',
    duration: 1300,
    keys: [
      [0, standFront()],
      [0.12, standFront()],
      [0.5, P({ view: 'front', x: 200, y: 166, torso: 0, handA: { x: 124, y: 62 }, handB: { x: 276, y: 62 }, footA: { x: 158, y: 250 }, footB: { x: 242, y: 250 } })],
      [0.62, P({ view: 'front', x: 200, y: 166, torso: 0, handA: { x: 124, y: 62 }, handB: { x: 276, y: 62 }, footA: { x: 158, y: 250 }, footB: { x: 242, y: 250 } })],
      [1, standFront()],
    ],
    still: 0.5,
  }),

  highKnees: () => make('high-knees', {
    view: 'front',
    duration: 900,
    keys: [
      [0, highKnees({ footA: { x: 212, y: 220 }, kneeA: 'forward' })],
      [0.5, highKnees({ footB: { x: 188, y: 220 }, kneeB: 'back' })],
      [1, highKnees({ footA: { x: 212, y: 220 }, kneeA: 'forward' })],
    ],
    still: 0,
  }),

  buttKicks: () => make('butt-kicks', {
    duration: 900,
    keys: [
      [0, standSide({ footA: { x: 190, y: 250 }, footB: { x: 222, y: 196 }, kneeB: 'back', handA: { x: 214, y: 146 }, handB: { x: 186, y: 146 } })],
      [0.5, standSide({ footA: { x: 222, y: 196 }, footB: { x: 190, y: 250 }, kneeA: 'back', handA: { x: 186, y: 146 }, handB: { x: 214, y: 146 } })],
      [1, standSide({ footA: { x: 190, y: 250 }, footB: { x: 222, y: 196 }, kneeB: 'back', handA: { x: 214, y: 146 }, handB: { x: 186, y: 146 } })],
    ],
    still: 0,
  }),

  jog: () => make('jog', {
    duration: 1000,
    keys: [
      [0, P({ x: 200, y: 158, torso: 5, handA: { x: 220, y: 144 }, handB: { x: 180, y: 150 }, footA: { x: 228, y: 220 }, footB: { x: 170, y: 250 }, kneeA: 'forward' })],
      [0.5, P({ x: 200, y: 158, torso: 5, handA: { x: 180, y: 150 }, handB: { x: 220, y: 144 }, footA: { x: 170, y: 250 }, footB: { x: 228, y: 220 }, kneeB: 'forward' })],
      [1, P({ x: 200, y: 158, torso: 5, handA: { x: 220, y: 144 }, handB: { x: 180, y: 150 }, footA: { x: 228, y: 220 }, footB: { x: 170, y: 250 }, kneeA: 'forward' })],
    ],
    still: 0,
  }),

  shadowBox: () => make('shadow-box', {
    view: 'front',
    duration: 1200,
    keys: [
      [0, P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 180, y: 110 }, handB: { x: 220, y: 110 }, footA: { x: 176, y: 250 }, footB: { x: 224, y: 250 } })],
      [0.3, P({ view: 'front', x: 200, y: 160, torso: -3, handA: { x: 180, y: 110 }, handB: { x: 286, y: 112 }, footA: { x: 176, y: 250 }, footB: { x: 224, y: 250 } })],
      [0.6, P({ view: 'front', x: 200, y: 160, torso: 3, handA: { x: 114, y: 112 }, handB: { x: 220, y: 110 }, footA: { x: 176, y: 250 }, footB: { x: 224, y: 250 } })],
      [1, P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 180, y: 110 }, handB: { x: 220, y: 110 }, footA: { x: 176, y: 250 }, footB: { x: 224, y: 250 } })],
    ],
    still: 0,
  }),

  jumpRope: () => make('jump-rope', {
    view: 'front',
    duration: 700,
    props: [{ kind: 'rope' }],
    keys: [
      [0, P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 160, y: 150 }, handB: { x: 240, y: 150 }, footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } })],
      [0.5, P({ view: 'front', x: 200, y: 148, torso: 0, handA: { x: 160, y: 142 }, handB: { x: 240, y: 142 }, footA: { x: 186, y: 238 }, footB: { x: 214, y: 238 } })],
      [1, P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 160, y: 150 }, handB: { x: 240, y: 150 }, footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } })],
    ],
    still: 0.5,
  }),

  burpee: () => make('burpee', {
    duration: 4200,
    keys: [
      [0, standSide()],
      [0.14, squatSide()],
      [0.3, plankSide()],
      [0.44, pushBottom()],
      [0.58, plankSide()],
      [0.72, squatSide()],
      [0.86, P({ x: 200, y: 126, torso: 2, handA: { x: 200, y: 60 }, handB: { x: 196, y: 60 }, footA: { x: 204, y: 218 }, footB: { x: 196, y: 218 }, liftA: 18, liftB: 18 })],
      [1, standSide()],
    ],
    still: 0.3,
  }),

  skater: () => make('skater', {
    view: 'front',
    duration: 1400,
    keys: [
      [0, P({ view: 'front', x: 180, y: 160, torso: -6, handA: { x: 154, y: 150 }, handB: { x: 220, y: 120 }, footA: { x: 148, y: 250 }, footB: { x: 232, y: 226 }, kneeB: 'forward' })],
      [0.5, P({ view: 'front', x: 220, y: 160, torso: 6, handA: { x: 180, y: 120 }, handB: { x: 246, y: 150 }, footA: { x: 168, y: 226 }, footB: { x: 252, y: 250 }, kneeA: 'forward' })],
      [1, P({ view: 'front', x: 180, y: 160, torso: -6, handA: { x: 154, y: 150 }, handB: { x: 220, y: 120 }, footA: { x: 148, y: 250 }, footB: { x: 232, y: 226 }, kneeB: 'forward' })],
    ],
    still: 0,
  }),

  starJump: () => make('star-jump', {
    view: 'front',
    duration: 1500,
    keys: [
      [0, P({ view: 'front', x: 200, y: 200, torso: 0, handA: { x: 176, y: 190 }, handB: { x: 224, y: 190 }, footA: { x: 184, y: 250 }, footB: { x: 216, y: 250 } })],
      [0.45, P({ view: 'front', x: 200, y: 128, torso: 0, handA: { x: 124, y: 56 }, handB: { x: 276, y: 56 }, footA: { x: 156, y: 208 }, footB: { x: 244, y: 208 }, liftA: 14, liftB: 14 })],
      [0.75, P({ view: 'front', x: 200, y: 200, torso: 0, handA: { x: 176, y: 190 }, handB: { x: 224, y: 190 }, footA: { x: 184, y: 250 }, footB: { x: 216, y: 250 } })],
      [1, standFront()],
    ],
    still: 0.45,
  }),

  inchworm: () => make('inchworm', {
    duration: 4200,
    keys: [
      [0, standSide()],
      [0.2, P({ x: 200, y: 168, torso: 85, handA: { x: 252, y: 248 }, handB: { x: 248, y: 248 }, footA: { x: 204, y: 250 }, footB: { x: 196, y: 250 } })],
      [0.42, plankSide()],
      [0.58, plankSide()],
      [0.8, P({ x: 200, y: 168, torso: 85, handA: { x: 252, y: 248 }, handB: { x: 248, y: 248 }, footA: { x: 204, y: 250 }, footB: { x: 196, y: 250 } })],
      [1, standSide()],
    ],
    still: 0.5,
  }),

  stepTouch: () => make('step-touch', {
    view: 'front',
    duration: 1100,
    keys: [
      [0, standFront()],
      [0.5, P({ view: 'front', x: 210, y: 160, torso: 0, handA: { x: 190, y: 150 }, handB: { x: 250, y: 150 }, footA: { x: 180, y: 250 }, footB: { x: 250, y: 250 } })],
      [1, standFront()],
    ],
    still: 0,
  }),

  fastFeet: () => make('fast-feet', {
    view: 'front',
    duration: 500,
    keys: [
      [0, P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 170, y: 140 }, handB: { x: 230, y: 140 }, footA: { x: 182, y: 250 }, footB: { x: 218, y: 250 } })],
      [0.5, P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 170, y: 140 }, handB: { x: 230, y: 140 }, footA: { x: 194, y: 250 }, footB: { x: 206, y: 250 } })],
      [1, P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 170, y: 140 }, handB: { x: 230, y: 140 }, footA: { x: 182, y: 250 }, footB: { x: 218, y: 250 } })],
    ],
    still: 0,
  }),

  march: () => make('march-in-place', {
    view: 'front',
    duration: 1100,
    keys: [
      [0, highKnees({ footA: { x: 210, y: 218 }, kneeA: 'forward', handA: { x: 178, y: 146 }, handB: { x: 222, y: 156 } })],
      [0.5, highKnees({ footB: { x: 190, y: 218 }, kneeB: 'back', handA: { x: 178, y: 156 }, handB: { x: 222, y: 146 } })],
      [1, highKnees({ footA: { x: 210, y: 218 }, kneeA: 'forward', handA: { x: 178, y: 146 }, handB: { x: 222, y: 156 } })],
    ],
    still: 0,
  }),

  armCircle: () => make('arm-circles', {
    view: 'front',
    duration: 2400,
    keys: [
      [0, standFront({ handA: { x: 178, y: 178 }, handB: { x: 222, y: 178 } })],
      [0.25, P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 126, y: 150 }, handB: { x: 274, y: 150 }, footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } })],
      [0.5, P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 160, y: 76 }, handB: { x: 240, y: 76 }, footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } })],
      [0.75, P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 208, y: 148 }, handB: { x: 192, y: 148 }, footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } })],
      [1, standFront()],
    ],
    still: 0,
  }),

  wallAngel: () => make('wall-angel', {
    view: 'front',
    duration: 3600,
    keys: rep(
      P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 166, y: 122 }, handB: { x: 234, y: 122 }, elbowA: 'forward', elbowB: 'forward', footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } }),
      P({ view: 'front', x: 200, y: 160, torso: 0, handA: { x: 174, y: 56 }, handB: { x: 226, y: 56 }, elbowA: 'forward', elbowB: 'forward', footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } }),
    ),
    still: 0.5,
  }),

  forwardFold: () => make('standing-forward-fold', {
    duration: 5200,
    keys: [
      [0, standSide()],
      [0.3, P({ x: 200, y: 166, torso: 88, curl: 6, handA: { x: 240, y: 238 }, handB: { x: 236, y: 238 }, footA: { x: 204, y: 250 }, footB: { x: 196, y: 250 } })],
      [0.7, P({ x: 200, y: 168, torso: 92, curl: 8, handA: { x: 238, y: 246 }, handB: { x: 234, y: 246 }, footA: { x: 204, y: 250 }, footB: { x: 196, y: 250 } })],
      [1, standSide()],
    ],
    still: 0.2,
  }),

  seatedTwist: () => make('seated-twist', {
    view: 'front',
    duration: 3000,
    keys: [
      [0, P({ view: 'front', x: 200, y: 218, torso: 0, handA: { x: 182, y: 190 }, handB: { x: 218, y: 190 }, legs: { A: { a: -45, e: 128 }, B: { a: 45, e: -128 } } })],
      [0.5, P({ view: 'front', x: 200, y: 218, torso: 0, handA: { x: 248, y: 196 }, handB: { x: 232, y: 208 }, legs: { A: { a: -45, e: 128 }, B: { a: 45, e: -128 } } })],
      [1, P({ view: 'front', x: 200, y: 218, torso: 0, handA: { x: 182, y: 190 }, handB: { x: 218, y: 190 }, legs: { A: { a: -45, e: 128 }, B: { a: 45, e: -128 } } })],
    ],
    still: 0.5,
  }),

  sideBend: () => make('side-bend', {
    view: 'front',
    duration: 5200,
    keys: [
      [0, standFront({ handA: { x: 178, y: 178 }, handB: { x: 222, y: 178 } })],
      [0.5, P({ view: 'front', x: 200, y: 160, torso: -12, head: 8, handA: { x: 146, y: 54 }, handB: { x: 226, y: 182 }, footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } })],
      [1, standFront({ handA: { x: 178, y: 178 }, handB: { x: 222, y: 178 } })],
    ],
    still: 0.5,
  }),

  legSwing: () => make('leg-swing', {
    duration: 2600,
    keys: [
      [0, standSide()],
      [0.3, standSide({ footB: { x: 252, y: 230 }, kneeB: 'forward', handA: { x: 222, y: 150 }, handB: { x: 182, y: 170 } })],
      [0.6, standSide({ footB: { x: 132, y: 230 }, kneeB: 'forward', handA: { x: 218, y: 170 }, handB: { x: 178, y: 150 } })],
      [1, standSide()],
    ],
    still: 0,
  }),

  ankleRock: () => make('ankle-rock', {
    duration: 2600,
    keys: rep(
      P({ x: 210, y: 172, torso: 6, handA: { x: 216, y: 190 }, handB: { x: 210, y: 190 }, footA: { x: 260, y: 250 }, footB: { x: 150, y: 250 } }),
      P({ x: 218, y: 178, torso: 10, handA: { x: 224, y: 196 }, handB: { x: 218, y: 196 }, footA: { x: 260, y: 250 }, footB: { x: 150, y: 250 } }),
    ),
    still: 0.5,
  }),

  catCow: () => make('cat-cow', {
    duration: 3800,
    keys: [
      [0, quadruped({ curl: -18, head: 16 })],
      [0.5, quadruped({ curl: 18, head: -14, y: 208 })],
      [1, quadruped({ curl: -18, head: 16 })],
    ],
    still: 0,
  }),

  childsPose: () => make('childs-pose', {
    duration: 5200,
    keys: [[0, childPose()], [0.5, childPose({ y: 217, torso: 107 })], [1, childPose()]],
    still: 0,
  }),

  downwardDog: () => make('downward-dog', {
    duration: 5200,
    keys: [[0, dogPose()], [0.5, dogPose({ y: 158, torso: 127 })], [1, dogPose()]],
    still: 0,
  }),

  cobra: () => make('cobra', {
    duration: 4200,
    keys: [
      [0, lieFaceDown({ torso: 90, curl: 0, head: 0, handA: { x: 252, y: 250 }, handB: { x: 248, y: 250 }, footA: { x: 102, y: 250 }, footB: { x: 98, y: 250 } })],
      [0.5, cobraPose()],
      [1, lieFaceDown({ torso: 90, curl: 0, head: 0, handA: { x: 252, y: 250 }, handB: { x: 248, y: 250 }, footA: { x: 102, y: 250 }, footB: { x: 98, y: 250 } })],
    ],
    still: 0.5,
  }),

  hipFlexorStretch: () => make('hip-flexor-stretch', {
    duration: 5200,
    props: [{ kind: 'cushion', x: 138, y: 250, w: 54, h: 9 }],
    keys: [
      [0, P({ x: 200, y: 200, torso: 0, handA: { x: 210, y: 190 }, handB: { x: 204, y: 190 }, footA: { x: 252, y: 250 }, footB: { x: 132, y: 232 }, kneeB: 'forward' })],
      [0.5, P({ x: 206, y: 198, torso: 2, handA: { x: 216, y: 188 }, handB: { x: 210, y: 188 }, footA: { x: 258, y: 250 }, footB: { x: 130, y: 232 }, kneeB: 'forward' })],
      [1, P({ x: 200, y: 200, torso: 0, handA: { x: 210, y: 190 }, handB: { x: 204, y: 190 }, footA: { x: 252, y: 250 }, footB: { x: 132, y: 232 }, kneeB: 'forward' })],
    ],
    still: 0,
  }),

  hamstringStretch: () => make('hamstring-stretch', {
    duration: 5200,
    keys: [
      [0, P({ x: 200, y: 235, torso: 0, handA: { x: 206, y: 252 }, handB: { x: 200, y: 252 }, footA: { x: 288, y: 250 }, footB: { x: 282, y: 250 } })],
      [0.5, P({ x: 200, y: 235, torso: 55, curl: 8, head: -4, handA: { x: 292, y: 246 }, handB: { x: 286, y: 246 }, footA: { x: 288, y: 250 }, footB: { x: 282, y: 250 } })],
      [1, P({ x: 200, y: 235, torso: 0, handA: { x: 206, y: 252 }, handB: { x: 200, y: 252 }, footA: { x: 288, y: 250 }, footB: { x: 282, y: 250 } })],
    ],
    still: 0.5,
  }),

  quadStretch: () => make('quad-stretch', {
    duration: 5200,
    keys: [
      [0, standSide()],
      [0.5, P({ x: 200, y: 160, torso: 0, handA: { x: 158, y: 150 }, handB: { x: 170, y: 188 }, footA: { x: 204, y: 250 }, footB: { x: 168, y: 190 }, kneeB: 'back' })],
      [1, standSide()],
    ],
    still: 0.5,
  }),

  calfStretch: () => make('calf-stretch', {
    duration: 5200,
    props: [{ kind: 'wall', x: 330, facing: -1 }],
    keys: [
      [0, P({ x: 250, y: 180, torso: 8, handA: { x: 324, y: 150 }, handB: { x: 320, y: 150 }, footA: { x: 250, y: 250 }, footB: { x: 190, y: 250 } })],
      [0.5, P({ x: 258, y: 180, torso: 8, handA: { x: 324, y: 150 }, handB: { x: 320, y: 150 }, footA: { x: 258, y: 250 }, footB: { x: 190, y: 250 } })],
      [1, P({ x: 250, y: 180, torso: 8, handA: { x: 324, y: 150 }, handB: { x: 320, y: 150 }, footA: { x: 250, y: 250 }, footB: { x: 190, y: 250 } })],
    ],
    still: 0,
  }),

  chestStretch: () => make('chest-stretch', {
    duration: 5200,
    props: [{ kind: 'doorway', x: 296 }],
    keys: [
      [0, P({ x: 246, y: 164, torso: 2, handA: { x: 296, y: 142 }, handB: { x: 292, y: 142 }, footA: { x: 246, y: 250 }, footB: { x: 240, y: 250 } })],
      [0.5, P({ x: 254, y: 166, torso: 4, handA: { x: 296, y: 142 }, handB: { x: 292, y: 142 }, footA: { x: 254, y: 250 }, footB: { x: 248, y: 250 } })],
      [1, P({ x: 246, y: 164, torso: 2, handA: { x: 296, y: 142 }, handB: { x: 292, y: 142 }, footA: { x: 246, y: 250 }, footB: { x: 240, y: 250 } })],
    ],
    still: 0,
  }),

  tricepStretch: () => make('tricep-stretch', {
    duration: 5200,
    keys: [
      [0, standSide()],
      [0.5, P({ x: 200, y: 160, torso: 0, handA: { x: 198, y: 99 }, handB: { x: 196, y: 178 }, arms: { A: { a: 160, e: 176 } } })],
      [1, standSide()],
    ],
    still: 0.5,
  }),

  neckStretch: () => make('neck-stretch', {
    view: 'front',
    duration: 5200,
    keys: [
      [0, standFront()],
      [0.5, P({ view: 'front', x: 200, y: 160, torso: 0, head: 24, handA: { x: 218, y: 84 }, handB: { x: 222, y: 178 }, footA: { x: 186, y: 250 }, footB: { x: 214, y: 250 } })],
      [1, standFront()],
    ],
    still: 0.5,
  }),

  butterfly: () => make('butterfly', {
    view: 'front',
    duration: 5200,
    keys: [
      [0, P({ view: 'front', x: 200, y: 225, torso: 0, handA: { x: 190, y: 240 }, handB: { x: 210, y: 240 }, legs: { A: { a: -63, e: 149 }, B: { a: 63, e: -149 } }, footAngleA: 90, footAngleB: 90 })],
      [0.5, P({ view: 'front', x: 200, y: 225, torso: 25, curl: 8, head: 6, handA: { x: 190, y: 240 }, handB: { x: 210, y: 240 }, legs: { A: { a: -63, e: 149 }, B: { a: 63, e: -149 } }, footAngleA: 90, footAngleB: 90 })],
      [1, P({ view: 'front', x: 200, y: 225, torso: 0, handA: { x: 190, y: 240 }, handB: { x: 210, y: 240 }, legs: { A: { a: -63, e: 149 }, B: { a: 63, e: -149 } }, footAngleA: 90, footAngleB: 90 })],
    ],
    still: 0,
  }),

  singleLegBalance: (v = {}) => {
    if (v.variant === 'tree') {
      return make('tree-pose', {
        duration: 4200,
        keys: [
          [0, standSide()],
          [0.5, P({ x: 200, y: 160, torso: 0, handA: { x: 190, y: 150 }, handB: { x: 210, y: 150 }, footA: { x: 204, y: 250 }, footB: { x: 220, y: 214 }, kneeB: 'forward' })],
          [1, standSide()],
        ],
        still: 0.5,
      })
    }
    return make('single-leg-balance', {
      duration: 4200,
      keys: [
        [0, standSide()],
        [0.5, P({ x: 200, y: 160, torso: 0, handA: { x: 250, y: 150 }, handB: { x: 150, y: 150 }, footA: { x: 204, y: 250 }, footB: { x: 238, y: 198 }, kneeB: 'forward' })],
        [1, standSide()],
      ],
      still: 0.5,
    })
  },

  airplane: () => make('airplane', {
    duration: 5200,
    keys: [
      [0, standSide()],
      [0.5, P({ x: 200, y: 178, torso: 74, head: -6, handA: { x: 280, y: 180 }, handB: { x: 120, y: 180 }, footA: { x: 200, y: 250 }, footB: { x: 110, y: 188 } })],
      [1, standSide()],
    ],
    still: 0.5,
  }),

  hipAbduction: () => make('standing-hip-abduction', {
    view: 'front',
    duration: 2600,
    keys: rep(
      standFront(),
      P({ view: 'front', x: 196, y: 160, torso: -4, handA: { x: 168, y: 178 }, handB: { x: 224, y: 178 }, footA: { x: 186, y: 250 }, footB: { x: 272, y: 220 }, kneeB: 'forward' }),
    ),
    still: 0.5,
  }),

  gluteKickback: () => make('standing-glute-kickback', {
    duration: 2600,
    keys: rep(
      standSide({ handA: { x: 208, y: 176 }, handB: { x: 202, y: 176 } }),
      P({ x: 198, y: 166, torso: 14, handA: { x: 208, y: 184 }, handB: { x: 202, y: 184 }, footA: { x: 204, y: 250 }, footB: { x: 122, y: 232 }, kneeB: 'back' }),
    ),
    still: 0.5,
  }),

  frontRaise: () => make('front-raise', {
    duration: 2600,
    props: [{ kind: 'bottles' }],
    keys: rep(
      P({ x: 200, y: 160, torso: 0, handA: { x: 204, y: 184 }, handB: { x: 198, y: 184 }, footA: { x: 204, y: 250 }, footB: { x: 196, y: 250 } }),
      P({ x: 200, y: 160, torso: 0, handA: { x: 266, y: 128 }, handB: { x: 262, y: 128 }, footA: { x: 204, y: 250 }, footB: { x: 196, y: 250 } }),
    ),
    still: 0.5,
  }),

  tricepExtension: () => make('overhead-tricep-extension', {
    duration: 2600,
    props: [{ kind: 'bottles' }],
    keys: rep(
      P({ x: 200, y: 160, torso: 0, handA: { x: 174, y: 108 }, handB: { x: 170, y: 112 }, footA: { x: 204, y: 250 }, footB: { x: 196, y: 250 } }),
      P({ x: 200, y: 160, torso: 0, handA: { x: 208, y: 48 }, handB: { x: 204, y: 52 }, footA: { x: 204, y: 250 }, footB: { x: 196, y: 250 } }),
    ),
    still: 0.5,
  }),

  wristRock: () => make('wrist-rocks', {
    duration: 2800,
    keys: rep(
      quadruped(),
      P({ x: 176, y: 218, torso: 86, curl: 6, handA: { x: 248, y: 250 }, handB: { x: 244, y: 250 }, footA: { x: 150, y: 250 }, footB: { x: 146, y: 250 } }),
    ),
    still: 0.5,
  }),

  deepSquatHold: () => make('deep-squat-hold', {
    duration: 5200,
    keys: [
      [0, squatSide({ handA: { x: 220, y: 196 }, handB: { x: 214, y: 196 } })],
      [0.5, squatSide({ y: 204, torso: 32, handA: { x: 220, y: 198 }, handB: { x: 214, y: 198 } })],
      [1, squatSide({ handA: { x: 220, y: 196 }, handB: { x: 214, y: 196 } })],
    ],
    still: 0,
  }),
}

export function getAnimation(exercise) {
  const fn = patterns[exercise.anim?.pattern || exercise.pattern]
  if (!fn) return patterns.stand()
  return fn(exercise.anim || {})
}

export const PATTERN_NAMES = Object.keys(patterns)

export { patterns }
