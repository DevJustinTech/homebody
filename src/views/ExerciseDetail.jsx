import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Pause,
  Play,
  SpeakerHigh,
  SpeakerSlash,
} from '@phosphor-icons/react'
import ExerciseFigure from '../rig/ExerciseFigure.jsx'
import ExerciseCard from '../components/ExerciseCard.jsx'
import { EQUIPMENT, LEVELS, exerciseById, exercises } from '../data/exercises.js'
import { Link } from '../lib/router.jsx'
import { markRecent, toggleFavorite, useStore } from '../lib/store.js'

export default function ExerciseDetail({ id }) {
  const exercise = exerciseById[id]
  const { favorites } = useStore()
  const [playing, setPlaying] = useState(true)

  if (!exercise) {
    return (
      <div className="page empty-state">
        <h1>Exercise not found.</h1>
        <p>That movement may have moved. The library is the best place to look.</p>
        <Link to="/library" className="btn btn-primary">Back to the library</Link>
      </div>
    )
  }

  const saved = favorites.includes(exercise.id)
  const related = exercises
    .filter(item => item.id !== exercise.id && item.focus.some(f => exercise.focus.includes(f)))
    .slice(0, 4)
  const equipment = exercise.equipment.length
    ? exercise.equipment.map(key => EQUIPMENT[key])
    : ['No equipment']

  return (
    <div className="page exercise-page">
      <Link to="/library" className="back-link">
        <ArrowLeft size={16} /> Library
      </Link>

      <div className="exercise-layout">
        <div className="exercise-figure-panel">
          <div className="exercise-figure-head">
            <span className="eyebrow">{exercise.category}</span>
            <div className="figure-controls">
              <button
                type="button"
                className="icon-btn"
                onClick={() => setPlaying(p => !p)}
                aria-label={playing ? 'Pause animation' : 'Play animation'}
              >
                {playing ? <Pause size={17} /> : <Play size={17} />}
              </button>
            </div>
          </div>
          <ExerciseFigure exercise={exercise} playing={playing} mat={false} />
          <div className="figure-caption">
            <span className="figure-caption-text">
              {playing ? 'Playing on a loop' : 'Paused on the clearest frame'}
            </span>
            <span className="figure-caption-meta">{exercise.position}</span>
          </div>
        </div>

        <div className="exercise-info">
          <p className="eyebrow">{LEVELS[exercise.level - 1]} · {exercise.impact} impact</p>
          <h1>{exercise.name}</h1>
          <p className="exercise-focus">{exercise.focus.join(' · ')}</p>

          <div className="exercise-actions">
            <Link
              to={`/play/single/${exercise.id}`}
              className="btn btn-primary"
              onClick={() => markRecent(exercise.id)}
            >
              Do it now <ArrowRight size={17} />
            </Link>
            <button
              type="button"
              className={'btn btn-quiet' + (saved ? ' is-saved' : '')}
              onClick={() => toggleFavorite(exercise.id)}
              aria-pressed={saved}
            >
              <Heart size={17} weight={saved ? 'fill' : 'regular'} />
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>

          <dl className="fact-list">
            <div>
              <dt>Suggested</dt>
              <dd>{exercise.sets} sets · {exercise.reps}</dd>
            </div>
            <div>
              <dt>Work / rest</dt>
              <dd>{exercise.work}s / {exercise.rest}s</dd>
            </div>
            <div>
              <dt>Equipment</dt>
              <dd>{equipment.join(', ')}</dd>
            </div>
            <div>
              <dt>Space</dt>
              <dd>{exercise.space === 'small' ? 'A mat-sized space' : 'A few steps of room'}</dd>
            </div>
            <div>
              <dt>Noise</dt>
              <dd>
                {exercise.quiet ? (
                  <><SpeakerSlash size={15} /> Quiet</>
                ) : (
                  <><SpeakerHigh size={15} /> Has impact</>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="how-grid">
        <section>
          <p className="eyebrow">Set up</p>
          <p>{exercise.setup}</p>
        </section>
        <section>
          <p className="eyebrow">Move</p>
          <p>{exercise.move}</p>
        </section>
        <section>
          <p className="eyebrow">Breathe</p>
          <p>{exercise.breathe}</p>
        </section>
      </div>

      <div className="detail-columns">
        <section className="detail-block">
          <h2>Keep in mind</h2>
          <ul className="cue-list">
            {exercise.cues.map(cue => <li key={cue}>{cue}</li>)}
          </ul>
          {exercise.avoid && (
            <p className="avoid"><strong>Avoid:</strong> {exercise.avoid}</p>
          )}
        </section>
        <section className="detail-block">
          <h2>Make it yours</h2>
          <div className="adjust">
            <p className="eyebrow">Easier</p>
            <p>{exercise.easier}</p>
          </div>
          <div className="adjust">
            <p className="eyebrow">Harder</p>
            <p>{exercise.harder}</p>
          </div>
        </section>
      </div>

      {exercise.tags.length > 0 && (
        <div className="tag-row">
          {exercise.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
        </div>
      )}

      {related.length > 0 && (
        <section className="related">
          <div className="section-head">
            <div>
              <p className="eyebrow">Keep moving</p>
              <h2>Related exercises</h2>
            </div>
            <Link to="/library" className="text-link">All exercises <ArrowRight size={16} /></Link>
          </div>
          <div className="ex-grid ex-grid-four">
            {related.map(item => <ExerciseCard key={item.id} exercise={item} compact />)}
          </div>
        </section>
      )}
    </div>
  )
}
