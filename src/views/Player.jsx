import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Pause,
  Play,
  Plus,
  SkipForward,
  SpeakerHigh,
  SpeakerSlash,
  X,
} from '@phosphor-icons/react'
import ClipFigure from '../rig/ClipFigure.jsx'
import ExerciseFigure from '../rig/ExerciseFigure.jsx'
import { clipFor } from '../rig/clips.js'
import { exerciseById, EQUIPMENT } from '../data/exercises.js'
import { programById, sessionExercises } from '../data/programs.js'
import { quickById } from '../data/quick.js'
import { Link, navigate } from '../lib/router.jsx'
import { logWorkout, markRecent, setSettings, useStore } from '../lib/store.js'
import { beep } from '../lib/sound.js'

function formatClock(total) {
  const safe = Math.max(0, Math.round(total))
  const minutes = Math.floor(safe / 60)
  const seconds = String(safe % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

function resolvePlayable(mode, param, sub) {
  if (mode === 'program') {
    const program = programById[param]
    const session = program?.sessions.find(item => item.id === sub)
    if (!program || !session) return null
    return {
      title: session.name,
      context: program.name,
      session,
      backTo: `/program/${program.id}`,
      backLabel: program.name,
      programId: program.id,
      sessionId: session.id,
    }
  }
  if (mode === 'quick') {
    const session = quickById[param]
    if (!session) return null
    return {
      title: session.name,
      context: 'Quick session',
      session,
      backTo: '/',
      backLabel: 'Home',
      programId: null,
      sessionId: session.id,
    }
  }
  if (mode === 'single') {
    const exercise = exerciseById[param]
    if (!exercise) return null
    return {
      title: exercise.name,
      context: 'Single exercise',
      session: {
        id: `single-${exercise.id}`,
        name: exercise.name,
        exercises: [{ id: exercise.id, sets: 1 }],
      },
      backTo: `/exercise/${exercise.id}`,
      backLabel: exercise.name,
      programId: null,
      sessionId: null,
    }
  }
  return null
}

export default function Player({ mode, param, sub }) {
  const playable = useMemo(() => resolvePlayable(mode, param, sub), [mode, param, sub])
  const items = useMemo(
    () => (playable ? sessionExercises(playable.session) : []),
    [playable],
  )
  const totalSets = useMemo(() => items.reduce((n, item) => n + item.sets, 0), [items])
  const { settings } = useStore()

  const [index, setIndex] = useState(0)
  const [set, setSet] = useState(1)
  const [phase, setPhase] = useState('work')
  const [remaining, setRemaining] = useState(items[0]?.work ?? 30)
  const [paused, setPaused] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [confirmEnd, setConfirmEnd] = useState(false)
  const elapsedRef = useRef(0)
  const finishedRef = useRef(false)

  const current = items[index]
  const next = items[index + 1]
  const totalExercises = items.length
  const done = phase === 'done'

  const finish = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    setPhase('done')
    setPaused(true)
    if (settings.sound) beep('done')
    const minutes = Math.max(1, Math.round(elapsedRef.current / 60))
    const uniqueExercises = [...new Set(items.map(item => item.id))]
    logWorkout({
      name: playable?.title || 'Session',
      context: playable?.context || '',
      programId: playable?.programId || null,
      sessionId: playable?.sessionId || null,
      minutes,
      seconds: elapsedRef.current,
      sets: totalSets,
      exerciseIds: uniqueExercises,
      exerciseNames: items.map(item => item.name),
    })
    uniqueExercises.slice(0, 6).forEach(id => markRecent(id))
  }, [items, playable, settings.sound, totalSets])

  // One-second heartbeat. Everything else reacts to `remaining` reaching zero.
  useEffect(() => {
    if (paused || phase === 'done') return
    const timer = setInterval(() => {
      elapsedRef.current += 1
      setElapsed(elapsedRef.current)
      setRemaining(value => value - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [paused, phase])

  // Phase changes happen outside the timer so they can also be triggered by Skip.
  useEffect(() => {
    if (remaining > 0 || phase === 'done' || !current) return

    if (phase === 'work') {
      if (set < current.sets) {
        setPhase('rest')
        setRemaining(current.rest)
        if (settings.sound) beep('rest')
      } else if (next) {
        setPhase('rest')
        setRemaining(current.rest)
        if (settings.sound) beep('rest')
      } else {
        finish()
      }
      return
    }

    if (phase === 'rest') {
      if (set < current.sets) {
        setSet(value => value + 1)
        setPhase('work')
        setRemaining(current.work)
        if (settings.sound) beep('work')
      } else if (next) {
        setIndex(value => value + 1)
        setSet(1)
        setPhase('work')
        setRemaining(next.work)
        if (settings.sound) beep('work')
      } else {
        finish()
      }
    }
  }, [remaining, phase, current, next, set, finish, settings.sound])

  const togglePause = useCallback(() => {
    if (phase === 'done') return
    setPaused(value => !value)
  }, [phase])

  const skip = useCallback(() => {
    if (phase === 'done') return
    setPaused(false)
    setRemaining(0)
  }, [phase])

  const addTime = useCallback(() => {
    setRemaining(value => value + 10)
  }, [])

  const previous = useCallback(() => {
    if (phase === 'done') return
    const target = Math.max(0, index - 1)
    setIndex(target)
    setSet(1)
    setPhase('work')
    setRemaining(items[target].work)
    setPaused(false)
  }, [index, items, phase])

  const reset = useCallback(() => {
    setIndex(0)
    setSet(1)
    setPhase('work')
    setRemaining(items[0]?.work ?? 30)
    setPaused(false)
    elapsedRef.current = 0
    setElapsed(0)
    finishedRef.current = false
  }, [items])

  // Keyboard controls. Ignore them while typing.
  useEffect(() => {
    const onKey = event => {
      const tag = event.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'BUTTON') return
      if (event.code === 'Space') {
        event.preventDefault()
        togglePause()
      }
      if (event.code === 'ArrowRight') skip()
      if (event.code === 'ArrowLeft') previous()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [togglePause, skip, previous])

  // Keep the screen awake while a session is running, when the browser allows it.
  useEffect(() => {
    let lock = null
    let cancelled = false
    if ('wakeLock' in navigator && !done) {
      navigator.wakeLock
        .request('screen')
        .then(value => {
          if (cancelled) value.release?.()
          else lock = value
        })
        .catch(() => {})
    }
    return () => {
      cancelled = true
      lock?.release?.()
    }
  }, [done])

  if (!playable || items.length === 0) {
    return (
      <div className="page empty-state">
        <h1>Session not found.</h1>
        <p>It may have been renamed. Pick a program and start from there.</p>
        <Link to="/programs" className="btn btn-primary">All programs</Link>
      </div>
    )
  }

  if (phase === 'done') {
    return (
      <div className="player player-done">
        <div className="player-top page">
          <Link to={playable.backTo} className="icon-btn" aria-label={`Back to ${playable.backLabel}`}>
            <X size={20} />
          </Link>
          <span className="player-context">{playable.context}</span>
          <span />
        </div>
        <div className="page done-panel">
          <div className="done-mark"><Check size={30} weight="bold" /></div>
          <p className="eyebrow">Session complete</p>
          <h1>Done. That counts.</h1>
          <p className="done-copy">
            {playable.title} is logged on this device. Nothing was uploaded anywhere.
          </p>
          <div className="done-stats">
            <div><strong>{formatClock(elapsed)}</strong><span>time</span></div>
            <div><strong>{totalSets}</strong><span>sets</span></div>
            <div><strong>{totalExercises}</strong><span>exercises</span></div>
          </div>
          <div className="hero-actions">
            <button type="button" className="btn btn-primary" onClick={reset}>
              Repeat session <Play size={16} weight="fill" />
            </button>
            <Link to={playable.backTo} className="btn btn-quiet">
              Back to {playable.backLabel}
            </Link>
            <Link to="/progress" className="btn btn-quiet">
              See progress <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const preview = phase === 'rest' && next && set >= current.sets ? next : current
  const isRest = phase === 'rest'
  const doneSets =
    items.slice(0, index).reduce((n, item) => n + item.sets, 0) +
    (isRest ? set : Math.max(0, set - 1))
  const progress = totalSets ? Math.min(1, doneSets / totalSets) : 0
  const nextLabel = isRest
    ? set < current.sets
      ? `Next: ${current.name}, set ${set + 1} of ${current.sets}`
      : next
        ? `Next: ${next.name}`
        : 'Last set — finish strong'
    : next
      ? `Then: ${next.name}`
      : 'Final exercise'

  return (
    <div className={'player' + (paused ? ' is-paused' : '')}>
      <div className="player-top page">
        <div className="player-title">
          <span>{playable.context}</span>
          <strong>{playable.title}</strong>
        </div>
        <div className="player-top-right">
          <span className="player-clock"><Clock size={15} /> {formatClock(elapsed)}</span>
          <button
            type="button"
            className="icon-btn"
            aria-label={settings.sound ? 'Mute cues' : 'Enable cues'}
            onClick={() => setSettings({ sound: !settings.sound })}
          >
            {settings.sound ? <SpeakerHigh size={18} /> : <SpeakerSlash size={18} />}
          </button>
          <button type="button" className="icon-btn" aria-label="End session" onClick={() => setConfirmEnd(true)}>
            <X size={19} />
          </button>
        </div>
      </div>

      <div className="player-progress page">
        <div className="player-progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
          <span style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="player-progress-meta">
          <span>{doneSets} of {totalSets} sets</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
      </div>

      <div className="page player-grid">
        <div className={'player-figure' + (isRest ? ' is-resting' : '')}>
          <div className="player-figure-head">
            <span className="eyebrow">
              {isRest ? 'Rest' : `Exercise ${index + 1} of ${totalExercises}`}
            </span>
            <span className="player-set">Set {set} / {current.sets}</span>
          </div>
          {clipFor(preview) ? (
            <ClipFigure exercise={preview} playing={!paused} />
          ) : (
            <ExerciseFigure exercise={preview} playing={!paused} mat={false} />
          )}
          <div className="player-figure-foot">
            <span>{preview.focus.slice(0, 2).join(' · ')}</span>
            <span>{preview.equipment.length ? preview.equipment.map(key => EQUIPMENT[key]).join(', ') : 'No equipment'}</span>
          </div>
        </div>

        <div className="player-panel">
          {isRest ? (
            <>
              <p className="eyebrow" aria-live="polite">Rest</p>
              <h1>Breathe.</h1>
              <p className="player-rest-next">{nextLabel}</p>
            </>
          ) : (
            <>
              <p className="eyebrow" aria-live="polite">Work · set {set} of {current.sets}</p>
              <h1>{current.name}</h1>
              <p className="player-reps">{current.reps}</p>
            </>
          )}

          <div className="player-timer" aria-label={`${remaining} seconds remaining`}>
            <span className="player-time">{formatClock(remaining)}</span>
            <span className="player-phase">{isRest ? 'until next set' : paused ? 'paused' : 'remaining'}</span>
          </div>

          <div className="player-controls">
            <button type="button" className="btn btn-primary btn-play" onClick={togglePause}>
              {paused ? <Play size={18} weight="fill" /> : <Pause size={18} weight="fill" />}
              {paused ? 'Resume' : 'Pause'}
            </button>
            <button type="button" className="btn btn-quiet" onClick={addTime} aria-label="Add ten seconds">
              <Plus size={16} /> 10s
            </button>
            <button type="button" className="btn btn-quiet" onClick={skip}>
              <SkipForward size={16} /> {isRest ? 'Skip rest' : 'Skip set'}
            </button>
            {index > 0 && (
              <button type="button" className="btn btn-quiet btn-icon-only" onClick={previous} aria-label="Previous exercise">
                <ArrowLeft size={17} />
              </button>
            )}
          </div>

          {!isRest && (
            <ul className="player-cues">
              {current.cues.slice(0, 3).map(cue => <li key={cue}>{cue}</li>)}
            </ul>
          )}

          <div className="player-next">
            <span className="eyebrow">Up next</span>
            <p>{nextLabel}</p>
          </div>

          <p className="player-hint">Space to pause · → to skip · ← to go back</p>
        </div>
      </div>

      {confirmEnd && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="end-title">
          <div className="modal">
            <p className="eyebrow">End session</p>
            <h2 id="end-title">Stop here?</h2>
            <p>This session will not be saved to your progress. You can start it again any time.</p>
            <div className="modal-actions">
              <button type="button" className="btn btn-quiet" onClick={() => setConfirmEnd(false)}>
                Keep going
              </button>
              <button type="button" className="btn btn-primary" onClick={() => navigate(playable.backTo)}>
                End session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
