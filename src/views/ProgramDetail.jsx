import { ArrowLeft, ArrowRight, Clock, Play, Stack } from '@phosphor-icons/react'
import ExerciseFigure from '../rig/ExerciseFigure.jsx'
import { EQUIPMENT, exerciseById } from '../data/exercises.js'
import { programById, sessionExercises, sessionMinutes } from '../data/programs.js'
import { Link } from '../lib/router.jsx'
import { LEVELS } from '../data/exercises.js'

export default function ProgramDetail({ id }) {
  const program = programById[id]

  if (!program) {
    return (
      <div className="page empty-state">
        <h1>Program not found.</h1>
        <p>Pick another plan — there are several ways in.</p>
        <Link to="/programs" className="btn btn-primary">All programs</Link>
      </div>
    )
  }

  const equipment = program.equipment.length
    ? program.equipment.map(key => EQUIPMENT[key]).join(', ')
    : 'No equipment'

  return (
    <div className="page program-detail">
      <Link to="/programs" className="back-link">
        <ArrowLeft size={16} /> Programs
      </Link>

      <header className="program-hero">
        <div>
          <p className="eyebrow">{LEVELS[program.level - 1]} · {program.weeks} weeks</p>
          <h1>{program.name}</h1>
          <p className="program-detail-tagline">{program.tagline}</p>
          <p className="page-lede">{program.description}</p>
          <div className="program-meta program-meta-large">
            <span><Stack size={16} /> {program.sessions.length} sessions</span>
            <span><Clock size={16} /> {program.sessions.reduce((n, s) => n + sessionMinutes(s), 0)} min total</span>
            <span>{equipment}</span>
          </div>
        </div>
        <div className="program-hero-figure">
          <ExerciseFigure exercise={exerciseById[program.sessions[0]?.exercises[0]?.id]} mat={false} />
          <span className="figure-label">{program.sessions[0]?.name}</span>
        </div>
      </header>

      <section className="session-list">
        <div className="section-head">
          <div>
            <p className="eyebrow">Sessions</p>
            <h2>Start anywhere.</h2>
          </div>
          <p className="section-side">The order is a suggestion. Your day decides.</p>
        </div>

        {program.sessions.map((session, index) => {
          const items = sessionExercises(session)
          const first = items[0]
          return (
            <article key={session.id} className="session-row">
              <div className="session-index">{String(index + 1).padStart(2, '0')}</div>
              <div className="session-figure">
                {first && <ExerciseFigure exercise={first} mat={false} />}
              </div>
              <div className="session-copy">
                <p className="eyebrow">{session.focus}</p>
                <h3>{session.name}</h3>
                <p className="session-exercises">
                  {items.slice(0, 4).map(item => item.name).join(' · ')}
                  {items.length > 4 ? ` · +${items.length - 4} more` : ''}
                </p>
              </div>
              <div className="session-side">
                <span className="session-time">{sessionMinutes(session)} min</span>
                <Link
                  to={`/play/program/${program.id}/${session.id}`}
                  className="btn btn-primary btn-small"
                >
                  <Play size={14} weight="fill" /> Start
                </Link>
              </div>
            </article>
          )
        })}
      </section>

      <section className="program-tips">
        <div>
          <p className="eyebrow">Before you start</p>
          <h2>Small rules that make it stick.</h2>
        </div>
        <ul>
          <li>Warm up with the first exercise rather than skipping it.</li>
          <li>Stop a set while you still have two good reps left.</li>
          <li>If something pinches, change the range or choose the easier option.</li>
          <li>Two short sessions a week beats one perfect session you never repeat.</li>
        </ul>
        <Link to={`/program/${program.id}`} className="text-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to the top <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  )
}
