import { useEffect, useState } from 'react'
import { useForceStill } from '../lib/motion.js'
import { usePrefersReducedMotion } from './ExerciseFigure.jsx'
import { clipFor } from './clips.js'

// The app flips themes with html[data-theme]; the baked clips come in one ink
// colour per theme, so follow the attribute instead of loading both.
function useDocumentTheme() {
  const [theme, setTheme] = useState(
    () => (typeof document !== 'undefined' && document.documentElement.dataset.theme) || 'light',
  )
  useEffect(() => {
    const el = document.documentElement
    const sync = () => setTheme(el.dataset.theme || 'light')
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(el, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])
  return theme
}

/**
 * Animated WebP demonstration for the exercises that have a baked 3D clip.
 * Renders nothing when the exercise has none, so callers can fall back to the
 * SVG rig.
 */
export default function ClipFigure({ exercise, playing = true, className = '', title }) {
  const clip = clipFor(exercise)
  const reduced = usePrefersReducedMotion()
  const forceStill = useForceStill()
  const theme = useDocumentTheme()

  if (!clip) return null
  const moving = playing && !reduced && !forceStill
  const src = `${import.meta.env.BASE_URL}anim3d/clips/${clip}${moving ? '' : '-still'}-${theme}.webp`

  return (
    <div className={'exfig clipfig ' + className}>
      <img
        src={src}
        alt={title || exercise?.name || 'Exercise demonstration'}
        width="640"
        height="480"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </div>
  )
}
