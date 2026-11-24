import {
  ArrowRight,
  Check,
  Heart,
  MoonStars,
  Play,
  Ruler,
  WifiSlash,
} from '@phosphor-icons/react'
import ExerciseFigure from '../rig/ExerciseFigure.jsx'
import ExerciseCard from '../components/ExerciseCard.jsx'
import ProgramCard from '../components/ProgramCard.jsx'
import { exerciseById, exercises, exerciseCount } from '../data/exercises.js'
import { programById, programs, sessionMinutes } from '../data/programs.js'
import { quickSessions } from '../data/quick.js'
import { Link } from '../lib/router.jsx'
import { useStore } from '../lib/store.js'

const heroExercise = exerciseById['bodyweight-squat']

export default function Home() {
  const { logs, favorites, profile } = useStore()
  const startPrograms = ['first-steps', 'strong-where-you-are', 'mobility-reset']
    .map(id => programById[id])
    .filter(Boolean)
  const saved = favorites.map(id => exerciseById[id]).filter(Boolean).slice(0, 4)
  const recent = logs[0]
  const featured = recent?.exerciseIds?.length
    ? exerciseById[recent.exerciseIds[0]]
    : exercises.find(e => e.id === 'reverse-lunge')

  return (
    <div className="home">
      <section className="hero page">
        <div className="hero-copy">
          <p className="eyebrow">
            {profile.name ? `Welcome back, ${profile.name}` : 'Home training, without the gym'}
          </p>
          <h1>
            Strong
            <br />
            where you are.
          </h1>
          <p className="hero-lede">
            A complete training library for the room you already have. No equipment
            required, no account, no audience. Just clear movements, original
            animations, and a plan for today.
          </p>
          <div className="hero-actions">
            <Link to="/program/first-steps" className="btn btn-primary">
              Start with First Steps <ArrowRight size={18} />
            </Link>
            <Link to="/library" className="btn btn-quiet">
              Browse {exerciseCount} exercises
            </Link>
          </div>
          <ul className="hero-facts">
            <li><Check size={15} /> Free, local, offline</li>
            <li><Check size={15} /> Quiet and small-space options</li>
            <li><Check size={15} /> Nothing to sign up for</li>
          </ul>
        </div>

        <div className="hero-figure">
          <div className="hero-figure-panel">
            <ExerciseFigure exercise={heroExercise} mat={false} />
            <span className="figure-label">Bodyweight squat</span>
          </div>
          <div className="hero-figure-caption">
            <span className="pulse-dot" aria-hidden="true" />
            Every movement is drawn from scratch, joint by joint.
          </div>
        </div>
      </section>

      <section className="stat-strip" aria-label="Library at a glance">
        <div className="page stat-strip-inner">
          <div><strong>{exerciseCount}</strong><span>exercises</span></div>
          <div><strong>{programs.length}</strong><span>programs</span></div>
          <div><strong>{programs.reduce((n, p) => n + p.sessions.length, 0)}</strong><span>guided sessions</span></div>
          <div><strong>0</strong><span>required equipment</span></div>
        </div>
      </section>

      {recent && (
        <section className="page home-section resume-section">
          <div className="resume-card">
            <div>
              <p className="eyebrow">Last session</p>
              <h2>{recent.name}</h2>
              <p>
                {new Date(recent.date).toLocaleDateString(undefined, {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric',
                })}
                {recent.minutes ? ` · ${recent.minutes} min` : ''}
                {recent.exerciseIds?.length ? ` · ${recent.exerciseIds.length} exercises` : ''}
              </p>
            </div>
            {featured && (
              <div className="resume-figure">
                <ExerciseFigure exercise={featured} mat={false} />
              </div>
            )}
            <Link to="/progress" className="btn btn-quiet">
              See progress <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      )}

      <section className="page home-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Start here</p>
            <h2>Programs with a beginning and an end.</h2>
          </div>
          <Link to="/programs" className="text-link">
            All programs <ArrowRight size={16} />
          </Link>
        </div>
        <div className="program-grid">
          {startPrograms.map(program => (
            <ProgramCard key={program.id} program={program} featured={program.id === 'first-steps'} />
          ))}
        </div>
      </section>

      <section className="page home-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Ten minutes or less</p>
            <h2>When a whole session is too much.</h2>
          </div>
        </div>
        <div className="quick-grid">
          {quickSessions.map(session => (
            <Link key={session.id} to={`/quick/${session.id}`} className="quick-card">
              <div className="quick-card-top">
                <span className="quick-icon"><Play size={16} weight="fill" /></span>
                <span className="quick-minutes">{sessionMinutes(session)} min</span>
              </div>
              <h3>{session.name}</h3>
              <p>{session.blurb}</p>
              <span className="quick-focus">{session.focus}</span>
            </Link>
          ))}
        </div>
        <div className="quick-more">
          <Link to="/programs" className="text-link">
            More ways to move <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="page home-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">The library</p>
            <h2>Every part of a strong body.</h2>
          </div>
          <Link to="/library" className="text-link">
            Open the library <ArrowRight size={16} />
          </Link>
        </div>
        <div className="home-ex-grid">
          {['pushup', 'reverse-lunge', 'towel-row', 'dead-bug'].map(id => {
            const exercise = exerciseById[id]
            return exercise ? <ExerciseCard key={id} exercise={exercise} compact /> : null
          })}
        </div>
      </section>

      {saved.length > 0 && (
        <section className="page home-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">Saved</p>
              <h2>Your shortlist.</h2>
            </div>
            <Link to="/progress" className="text-link">
              All saved <ArrowRight size={16} />
            </Link>
          </div>
          <div className="home-ex-grid">
            {saved.map(exercise => (
              <ExerciseCard key={exercise.id} exercise={exercise} compact />
            ))}
          </div>
        </section>
      )}

      <section className="page home-section principles">
        <div className="section-head">
          <div>
            <p className="eyebrow">Built for real rooms</p>
            <h2>No gym. No noise. No excuses.</h2>
          </div>
        </div>
        <div className="principle-grid">
          <article>
            <MoonStars size={24} />
            <h3>Quiet by default</h3>
            <p>Filter out jumps and thumps. Every noisy movement has a silent alternative.</p>
          </article>
          <article>
            <Ruler size={24} />
            <h3>Small-space ready</h3>
            <p>Know before you start whether a movement needs a step, a wall, or a full mat.</p>
          </article>
          <article>
            <WifiSlash size={24} />
            <h3>Yours, offline</h3>
            <p>Progress lives on this device. Install it once and train without a connection.</p>
          </article>
          <article>
            <Heart size={24} />
            <h3>Free to keep</h3>
            <p>No subscription, no ads, no tracking. A contribution, not a funnel.</p>
          </article>
        </div>
      </section>

      <section className="page closing">
        <div className="closing-inner">
          <p className="eyebrow">Today is enough</p>
          <h2>You do not need more equipment. You need a first set.</h2>
          <div className="hero-actions">
            <Link to="/program/first-steps" className="btn btn-primary">
              Begin First Steps <ArrowRight size={18} />
            </Link>
            <Link to="/library" className="btn btn-quiet">
              Find one exercise
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
