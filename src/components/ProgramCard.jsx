import { ArrowUpRight, Clock, Stack } from '@phosphor-icons/react'
import ExerciseFigure from '../rig/ExerciseFigure.jsx'
import { Link } from '../lib/router.jsx'
import { exerciseById, EQUIPMENT, LEVELS } from '../data/exercises.js'
import { programMinutes } from '../data/programs.js'

export default function ProgramCard({ program, featured = false }) {
  const minutes = programMinutes(program)
  const equipment = program.equipment.length
    ? program.equipment.map(key => EQUIPMENT[key]).join(', ')
    : 'No equipment'
  const firstExercise = exerciseById[program.sessions[0]?.exercises[0]?.id]

  return (
    <article className={'program-card' + (featured ? ' program-card-featured' : '')}>
      <Link to={`/program/${program.id}`} className="program-card-link">
        <div className="program-card-body">
          <div className="program-card-top">
            <p className="eyebrow">{LEVELS[program.level - 1]}</p>
            <ArrowUpRight size={20} />
          </div>
          <h3>{program.name}</h3>
          <p className="program-tagline">{program.tagline}</p>
          {featured && <p className="program-card-blurb">{program.description}</p>}
          <div className="program-meta">
            <span>
              <Stack size={15} /> {program.sessions.length} sessions
            </span>
            <span>
              <Clock size={15} /> {minutes} min total
            </span>
          </div>
          <p className="program-equipment">{equipment}</p>
        </div>
        {featured && firstExercise && (
          <div className="program-card-figure" aria-hidden="true">
            <ExerciseFigure exercise={firstExercise} mat={false} />
          </div>
        )}
      </Link>
    </article>
  )
}
