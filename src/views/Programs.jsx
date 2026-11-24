import { useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import ProgramCard from '../components/ProgramCard.jsx'
import { LEVELS } from '../data/exercises.js'
import { programs } from '../data/programs.js'
import { Link } from '../lib/router.jsx'

export default function Programs() {
  const [level, setLevel] = useState(0)

  const visible = level === 0 ? programs : programs.filter(p => p.level === level)

  return (
    <div className="page programs-page">
      <header className="page-head">
        <div>
          <p className="eyebrow">Programs</p>
          <h1>A path, not a playlist.</h1>
          <p className="page-lede">
            Follow a plan for a few weeks, or drop into a single session. Each one
            tells you what it needs, how long it takes, and how hard it will feel.
          </p>
        </div>
        <div className="page-head-figure" aria-hidden="true">
          <span className="big-count">{programs.length}</span>
          <span className="count-label">ways to start</span>
        </div>
      </header>

      <div className="chip-row program-filter" role="group" aria-label="Filter programs by level">
        <button type="button" className={'chip' + (level === 0 ? ' is-on' : '')} onClick={() => setLevel(0)}>
          All levels
        </button>
        {LEVELS.map((name, index) => (
          <button
            key={name}
            type="button"
            className={'chip' + (level === index + 1 ? ' is-on' : '')}
            onClick={() => setLevel(index + 1)}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="program-list">
        {visible.map((program, index) => (
          <ProgramCard key={program.id} program={program} featured={index === 0 && level === 0} />
        ))}
      </div>

      <section className="program-note">
        <div>
          <p className="eyebrow">How to use a program</p>
          <h2>Three sessions a week is plenty.</h2>
        </div>
        <div className="program-note-copy">
          <p>
            Leave at least one day between strength sessions. If you are sore, take
            the mobility session instead. The player counts your work and rest, but
            you can pause, skip, or repeat anything.
          </p>
          <p>
            No program is a contract. If a session does not fit your day, open the
            library and pick two exercises. That still counts.
          </p>
          <Link to="/library" className="text-link">
            Build your own session <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
