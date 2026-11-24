import { Heart } from '@phosphor-icons/react'
import ExerciseFigure from '../rig/ExerciseFigure.jsx'
import { EQUIPMENT } from '../data/exercises.js'
import { Link } from '../lib/router.jsx'
import { toggleFavorite, useStore } from '../lib/store.js'

export default function ExerciseCard({ exercise, compact = false }) {
  const { favorites } = useStore()
  const saved = favorites.includes(exercise.id)
  const equipment = exercise.equipment.length
    ? exercise.equipment.map(key => EQUIPMENT[key]).join(', ')
    : 'No equipment'

  return (
    <article className={'ex-card' + (compact ? ' ex-card-compact' : '')}>
      <Link to={`/exercise/${exercise.id}`} className="ex-card-figure" aria-label={exercise.name}>
        <ExerciseFigure exercise={exercise} mat={false} />
      </Link>
      <button
        type="button"
        className={'fav-btn' + (saved ? ' is-saved' : '')}
        aria-label={saved ? `Remove ${exercise.name} from saved` : `Save ${exercise.name}`}
        aria-pressed={saved}
        onClick={() => toggleFavorite(exercise.id)}
      >
        <Heart size={17} weight={saved ? 'fill' : 'regular'} />
      </button>
      <div className="ex-card-body">
        <p className="eyebrow">
          {exercise.category} <span aria-hidden="true">/</span> Level {exercise.level}
        </p>
        <h3>
          <Link to={`/exercise/${exercise.id}`}>{exercise.name}</Link>
        </h3>
        <p className="ex-card-meta">
          {exercise.focus.slice(0, 2).join(' · ')}
          {!compact && (
            <>
              <span className="dot-sep" aria-hidden="true">·</span>
              {equipment}
            </>
          )}
        </p>
      </div>
    </article>
  )
}
