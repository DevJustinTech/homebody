// Which exercises have a baked 3D demonstration.
//
// The clip is the *standard* version of the movement only: the wall, incline,
// knee and pike push-up variants keep their 2D rig because they are a different
// movement, not a different camera. Add an id here after rendering it with
// `npm run anim3d`.
const CLIPS = new Set(['pushup', 'jumpingJack', 'jog', 'shadowBox'])

export function clipFor(exercise) {
  if (!exercise || !CLIPS.has(exercise.pattern)) return null
  if (exercise.anim?.variant) return null
  return exercise.pattern
}

export const CLIP_PATTERNS = [...CLIPS]
