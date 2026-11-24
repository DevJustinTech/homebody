// A small, deliberately simple 2D body rig.
//
// Every pose is stored as joint angles, not joint positions, so two poses can be
// interpolated smoothly. Poses are authored by placing hands and feet on the stage
// and letting solveLimb work out the elbow and knee, which is far easier to reason
// about than typing angles by hand.
//
// Angle convention, in degrees:
//   0    points down
//   90   points right (the direction the figure usually faces)
//   180  points up
//   -90  points left
//
// Torso uses the same convention but starts at 0 = upright, 90 = horizontal forward.

export const BODY = {
  torso: 56,
  lowerTorso: 26,
  upperTorso: 30,
  neck: 14,
  head: 14,
  upperArm: 38,
  forearm: 34,
  thigh: 46,
  shin: 44,
  foot: 19,
  shoulderWidth: 40,
  hipWidth: 30,
  ground: 258,
}

export const STAGE = { w: 400, h: 300 }

const rad = d => (d * Math.PI) / 180
const deg = r => (r * 180) / Math.PI

export const dir = (angle, length = 1) => ({
  x: Math.sin(rad(angle)) * length,
  y: Math.cos(rad(angle)) * length,
})

/** Torso direction: 0 is upright, 90 is horizontal forward. */
export const upDir = (angle, length = 1) => ({
  x: Math.sin(rad(angle)) * length,
  y: -Math.cos(rad(angle)) * length,
})

export const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y })
export const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y })
export const norm = v => {
  const d = Math.hypot(v.x, v.y) || 1
  return { x: v.x / d, y: v.y / d }
}

export const lerp = (a, b, t) => a + (b - a) * t
export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

/** Shortest-path angle interpolation, so 350° to 10° goes the short way. */
export function lerpAngle(a, b, t) {
  const d = ((((b - a) % 360) + 540) % 360) - 180
  return a + d * t
}

export function ease(t) {
  // Smooth at both ends, but with a touch more weight at the bottom of a rep.
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

/**
 * Two-bone IK. Given a root (shoulder or hip) and an end (hand or foot), returns
 * the absolute angle of the first bone, the bend at the joint, and the joint position.
 * `bend` is +1 or -1; for legs, -1 puts the knee forward when the figure faces right.
 */
export function solveLimb(root, end, l1, l2, bend = -1) {
  const dRaw = Math.hypot(end.x - root.x, end.y - root.y)
  const min = Math.abs(l1 - l2) + 0.01
  const max = l1 + l2 - 0.01
  const d = clamp(dRaw, min, max)
  const ux = dRaw === 0 ? 0 : (end.x - root.x) / dRaw
  const uy = dRaw === 0 ? 1 : (end.y - root.y) / dRaw
  const ex = root.x + ux * d
  const ey = root.y + uy * d
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d)
  const h = Math.sqrt(Math.max(0, l1 * l1 - a * a))
  const mx = root.x + ux * a
  const my = root.y + uy * a
  const px = -uy
  const py = ux
  const joint = { x: mx + px * h * bend, y: my + py * h * bend }
  const first = deg(Math.atan2(joint.x - root.x, joint.y - root.y))
  const second = deg(Math.atan2(ex - joint.x, ey - joint.y))
  let elbow = ((((second - first) % 360) + 540) % 360) - 180
  return { a: first, e: elbow, joint, end: { x: ex, y: ey } }
}

/**
 * Build a pose from a pelvis position, a torso angle, and target hand/foot positions.
 * Everything else is solved. All targets are absolute stage coordinates.
 */
export function pose({
  x = 200,
  y = 160,
  torso = 0,
  curl = 0,
  head = 0,
  view = 'side',
  facing = 1,
  handA,
  handB,
  footA,
  footB,
  elbowA = 'back',
  elbowB = 'back',
  kneeA = 'forward',
  kneeB = 'forward',
  footAngleA = 90,
  footAngleB = 90,
  liftA = 0,
  liftB = 0,
  arms,
  legs,
} = {}) {
  const waist = add({ x, y }, upDir(torso, BODY.lowerTorso))
  const chest = add(waist, upDir(torso + curl, BODY.upperTorso))
  const pelvis = { x, y }

  const shoulderOffset = view === 'front' ? BODY.shoulderWidth / 2 : 2.2
  const hipOffset = view === 'front' ? BODY.hipWidth / 2 : 2.2

  const shoulderA = { x: chest.x - shoulderOffset, y: chest.y }
  const shoulderB = { x: chest.x + shoulderOffset, y: chest.y }
  const hipA = { x: pelvis.x - hipOffset, y: pelvis.y }
  const hipB = { x: pelvis.x + hipOffset, y: pelvis.y }

  const armDrop = BODY.upperArm + BODY.forearm
  const hA = handA || { x: shoulderA.x, y: shoulderA.y + armDrop }
  const hB = handB || { x: shoulderB.x, y: shoulderB.y + armDrop }
  const fA = footA || { x: hipA.x, y: hipA.y + BODY.thigh + BODY.shin }
  const fB = footB || { x: hipB.x, y: hipB.y + BODY.thigh + BODY.shin }

  const armA = arms?.A || solveLimb(shoulderA, hA, BODY.upperArm, BODY.forearm, elbowA === 'back' ? 1 : -1)
  const armB = arms?.B || solveLimb(shoulderB, hB, BODY.upperArm, BODY.forearm, elbowB === 'back' ? 1 : -1)
  const legA = legs?.A || solveLimb(hipA, fA, BODY.thigh, BODY.shin, kneeA === 'forward' ? -1 : 1)
  const legB = legs?.B || solveLimb(hipB, fB, BODY.thigh, BODY.shin, kneeB === 'forward' ? -1 : 1)

  return {
    x,
    y,
    torso,
    curl,
    head,
    view,
    facing,
    armA: { a: armA.a, e: armA.e },
    armB: { a: armB.a, e: armB.e },
    legA: { a: legA.a, e: legA.e },
    legB: { a: legB.a, e: legB.e },
    footA: footAngleA,
    footB: footAngleB,
    liftA,
    liftB,
  }
}

/** Interpolate two poses. */
export function lerpPose(a, b, t) {
  const e = ease(t)
  const limb = (p, q) => ({ a: lerpAngle(p.a, q.a, e), e: lerpAngle(p.e, q.e, e) })
  return {
    x: lerp(a.x, b.x, e),
    y: lerp(a.y, b.y, e),
    torso: lerpAngle(a.torso, b.torso, e),
    curl: lerpAngle(a.curl || 0, b.curl || 0, e),
    head: lerpAngle(a.head, b.head, e),
    view: a.view,
    facing: a.facing,
    armA: limb(a.armA, b.armA),
    armB: limb(a.armB, b.armB),
    legA: limb(a.legA, b.legA),
    legB: limb(a.legB, b.legB),
    footA: lerpAngle(a.footA, b.footA, e),
    footB: lerpAngle(a.footB, b.footB, e),
    liftA: lerp(a.liftA || 0, b.liftA || 0, e),
    liftB: lerp(a.liftB || 0, b.liftB || 0, e),
  }
}

/** Resolve a pose to every joint position the renderer needs. */
export function joints(p) {
  const waist = add({ x: p.x, y: p.y }, upDir(p.torso, BODY.lowerTorso))
  const upper = p.torso + (p.curl || 0)
  const chest = add(waist, upDir(upper, BODY.upperTorso))
  const neckDir = upper + p.head
  const neck = add(chest, upDir(neckDir, BODY.neck))
  const head = add(neck, upDir(neckDir, BODY.head))
  const shoulderOffset = p.view === 'front' ? BODY.shoulderWidth / 2 : 2.2
  const hipOffset = p.view === 'front' ? BODY.hipWidth / 2 : 2.2
  const shoulderA = { x: chest.x - shoulderOffset, y: chest.y }
  const shoulderB = { x: chest.x + shoulderOffset, y: chest.y }
  const hipA = { x: p.x - hipOffset, y: p.y }
  const hipB = { x: p.x + hipOffset, y: p.y }
  const elbowA = add(shoulderA, dir(p.armA.a, BODY.upperArm))
  const elbowB = add(shoulderB, dir(p.armB.a, BODY.upperArm))
  const handA = add(elbowA, dir(p.armA.a + p.armA.e, BODY.forearm))
  const handB = add(elbowB, dir(p.armB.a + p.armB.e, BODY.forearm))
  const kneeA = add(hipA, dir(p.legA.a, BODY.thigh))
  const kneeB = add(hipB, dir(p.legB.a, BODY.thigh))
  const ankleA = add(kneeA, dir(p.legA.a + p.legA.e, BODY.shin))
  const ankleB = add(kneeB, dir(p.legB.a + p.legB.e, BODY.shin))
  const toeA = add(ankleA, dir(p.footA, BODY.foot))
  const toeB = add(ankleB, dir(p.footB, BODY.foot))
  return {
    pelvis: { x: p.x, y: p.y },
    waist,
    chest,
    neck,
    head,
    shoulderA,
    shoulderB,
    hipA,
    hipB,
    elbowA,
    elbowB,
    handA,
    handB,
    kneeA,
    kneeB,
    ankleA,
    ankleB,
    toeA,
    toeB,
  }
}

export const ms = n => `${n}ms`

// Fit a viewBox around the whole movement instead of the full 400x300 stage.
// Standing exercises are narrow, so without this the figure floats in a sea of
// empty space. Props are included so a wall, chair or pull-up bar is never
// cropped. The box is widened to a comfortable aspect ratio so the floor line
// does not look like a short stub.
export function animationViewBox(anim) {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  const add = (x, y, r = 0) => {
    minX = Math.min(minX, x - r)
    maxX = Math.max(maxX, x + r)
    minY = Math.min(minY, y - r)
    maxY = Math.max(maxY, y + r)
  }

  const props = anim.props || []
  const hasBackpack = props.some(prop => prop.kind === 'backpack')

  for (const key of anim.keys || []) {
    const p = key.pose || key
    const j = joints(p)
    for (const [key, point] of Object.entries(j)) {
      const reach =
        key === 'head' ? BODY.head
          : key === 'chest' && hasBackpack ? 30
            : key.startsWith('toe') || key.startsWith('ankle') ? 7
              : 6
      add(point.x, point.y, reach)
    }
    const lift = Math.max(p.liftA || 0, p.liftB || 0)
    if (lift) add(p.x, p.y - lift, 8)
  }

  for (const prop of props) {
    switch (prop.kind) {
      case 'bar': {
        const left = prop.left ?? 118
        const right = prop.right ?? 282
        const y = prop.y ?? 48
        add(left - 10, y, 5)
        add(right + 10, y, 5)
        add(left, BODY.ground)
        add(right, BODY.ground)
        break
      }
      case 'wall': {
        const x = prop.x ?? 324
        add(x, 36, 7)
        add(x, BODY.ground)
        break
      }
      case 'doorway': {
        const x = prop.x ?? 292
        add(x, 60, 5)
        add(x + 46, BODY.ground, 5)
        break
      }
      case 'chair': {
        const x = prop.x ?? 282
        const width = prop.width ?? 56
        const height = prop.height ?? 54
        const seatY = prop.seatY ?? 200
        add(x - width / 2, seatY - height, 7)
        add(x + width / 2, BODY.ground, 7)
        break
      }
      case 'table': {
        const x = prop.x ?? 280
        const width = prop.width ?? 110
        add(x - width / 2, prop.topY ?? 160, 7)
        add(x + width / 2, BODY.ground, 7)
        break
      }
      case 'steps': {
        const x = prop.x ?? 292
        add(x - 32, 232, 5)
        add(x + 36, BODY.ground, 5)
        break
      }
      case 'cushion': {
        const x = prop.x ?? 200
        const y = prop.y ?? 250
        const w = prop.w ?? 64
        const h = prop.h ?? 12
        add(x - w / 2, y - h, 4)
        add(x + w / 2, y, 4)
        break
      }
      default:
        break
    }
  }

  // The floor is always part of the picture, even for hanging exercises.
  maxY = Math.max(maxY, BODY.ground)

  const padX = 12
  const padTop = 12
  let x0 = minX - padX
  let x1 = maxX + padX
  const y0 = minY - padTop
  const y1 = BODY.ground + 10

  // Widen very narrow poses so the floor line reads as a floor.
  const minWidth = (y1 - y0) * 1.2
  if (x1 - x0 < minWidth) {
    const grow = (minWidth - (x1 - x0)) / 2
    x0 -= grow
    x1 += grow
  }

  x0 = Math.max(0, x0)
  x1 = Math.min(STAGE.w, x1)

  const round = n => Math.round(n * 10) / 10
  return `${round(x0)} ${round(Math.max(0, y0))} ${round(x1 - x0)} ${round(y1 - Math.max(0, y0))}`
}
