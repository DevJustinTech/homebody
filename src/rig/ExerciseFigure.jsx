import { useEffect, useMemo, useRef, useState } from 'react'
import Figure from './Figure.jsx'
import { getAnimation } from './patterns.js'
import { animationViewBox, lerpPose } from './geometry.js'
import { useForceStill } from '../lib/motion.js'

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )
  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener?.('change', on)
    return () => mq.removeEventListener?.('change', on)
  }, [])
  return reduced
}

export function useInView({ rootMargin = '80px 0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])
  return [ref, inView]
}

export function poseAt(anim, phase) {
  const keys = anim.keys
  const p = ((phase % 1) + 1) % 1
  let i = 0
  while (i < keys.length - 1 && keys[i + 1].at <= p) i++
  const a = keys[i]
  const b = keys[Math.min(i + 1, keys.length - 1)]
  if (a === b || b.at === a.at) return a.pose
  const t = (p - a.at) / (b.at - a.at)
  return lerpPose(a.pose, b.pose, Math.max(0, Math.min(1, t)))
}

export default function ExerciseFigure({
  exercise,
  playing = true,
  speed = 1,
  still = false,
  className = '',
  showFloor = true,
  mat = true,
  title,
  onPhase,
}) {
  const anim = useMemo(() => getAnimation(exercise), [exercise])
  const viewBox = useMemo(() => animationViewBox(anim), [anim])
  const reduced = usePrefersReducedMotion()
  const forceStill = useForceStill()
  const [phase, setPhase] = useState(anim.still ?? 0)
  const start = useRef(0)
  const last = useRef(0)
  const paused = !playing || still || reduced || forceStill
  const [ref, inView] = useInView()

  useEffect(() => {
    if (paused || !inView) return
    let raf = 0
    start.current = performance.now() - (phase % 1) * anim.duration
    const tick = now => {
      const p = (((now - start.current) / anim.duration) * speed) % 1
      last.current = p
      setPhase(p)
      onPhase?.(p)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // phase is deliberately not a dependency: it changes every frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, inView, anim.duration, speed])

  useEffect(() => {
    if (paused) setPhase(anim.still ?? 0)
  }, [paused, anim.still])

  const pose = poseAt(anim, paused ? (anim.still ?? 0) : phase)
  return (
    <div ref={ref} className={'exfig ' + className}>
      <Figure pose={pose} props={anim.props} viewBox={viewBox} showFloor={showFloor} mat={mat} title={title || exercise?.name} />
    </div>
  )
}
