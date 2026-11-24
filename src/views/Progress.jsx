import { ChartLineUp, Clock, Flame, Heart, Trash } from '@phosphor-icons/react'
import ExerciseCard from '../components/ExerciseCard.jsx'
import { exerciseById } from '../data/exercises.js'
import { Link } from '../lib/router.jsx'
import { removeLog, statsFrom, useStore } from '../lib/store.js'

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

function formatTime(value) {
  return new Date(value).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function Progress() {
  const { logs, favorites } = useStore()
  const stats = statsFrom(logs)
  const saved = favorites.map(id => exerciseById[id]).filter(Boolean)
  const maxWeek = Math.max(10, ...stats.week.map(day => day.minutes))
  const weekEmpty = stats.weekMinutes === 0

  return (
    <div className="page progress-page">
      <header className="page-head">
        <div>
          <p className="eyebrow">Progress</p>
          <h1>Evidence, not judgement.</h1>
          <p className="page-lede">
            Every finished session is kept on this device. There is no score to
            protect and no streak to lose — just a record of the days you moved.
          </p>
        </div>
        <div className="page-head-figure" aria-hidden="true">
          <span className="big-count">{stats.workouts}</span>
          <span className="count-label">sessions finished</span>
        </div>
      </header>

      <div className="stat-cards">
        <article>
          <ChartLineUp size={22} />
          <strong>{stats.workouts}</strong>
          <span>workouts</span>
        </article>
        <article>
          <Clock size={22} />
          <strong>{stats.totalMinutes}</strong>
          <span>minutes moved</span>
        </article>
        <article>
          <Flame size={22} />
          <strong>{stats.streak}</strong>
          <span>day streak</span>
        </article>
        <article>
          <Heart size={22} />
          <strong>{favorites.length}</strong>
          <span>saved exercises</span>
        </article>
      </div>

      <section className="week-panel">
        <div className="week-head">
          <div>
            <p className="eyebrow">This week</p>
            <h2>{stats.weekMinutes} {stats.weekMinutes === 1 ? 'minute' : 'minutes'}</h2>
          </div>
          <p className="week-note">
            {weekEmpty
              ? 'No sessions in the last seven days. Rest is part of the plan.'
              : 'Last seven days, including today.'}
          </p>
        </div>
        <div className={'week-chart' + (weekEmpty ? ' is-empty' : '')}>
          {stats.week.map(day => (
            <div key={day.key} className="week-col">
              <span className="week-value">{day.minutes || ''}</span>
              <div className="week-track">
                <span
                  className={day.minutes ? '' : 'is-zero'}
                  style={{ height: day.minutes ? `${Math.max(6, (day.minutes / maxWeek) * 100)}%` : '2px' }}
                />
              </div>
              <span className="week-label">{day.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="history">
        <div className="section-head">
          <div>
            <p className="eyebrow">History</p>
            <h2>Recent sessions</h2>
          </div>
          {logs.length > 0 && <p className="section-side">{logs.length} total</p>}
        </div>

        {logs.length === 0 ? (
          <div className="empty-state empty-inline">
            <h2>No sessions yet.</h2>
            <p>Finish any session and it will appear here. Ten minutes counts.</p>
            <Link to="/programs" className="btn btn-primary">Choose a program</Link>
          </div>
        ) : (
          <ul className="log-list">
            {logs.map(log => (
              <li key={log.id} className="log-row">
                <div className="log-date">
                  <strong>{formatDate(log.date)}</strong>
                  <span>{formatTime(log.date)}</span>
                </div>
                <div className="log-copy">
                  <h3>{log.name}</h3>
                  <p>
                    {log.context}
                    {log.minutes ? ` · ${log.minutes} min` : ''}
                    {log.sets ? ` · ${log.sets} sets` : ''}
                  </p>
                </div>
                <div className="log-ex">
                  {(log.exerciseNames || []).slice(0, 3).join(' · ')}
                  {(log.exerciseNames?.length || 0) > 3 ? ` · +${log.exerciseNames.length - 3}` : ''}
                </div>
                <button
                  type="button"
                  className="icon-btn log-delete"
                  aria-label={`Delete ${log.name} from history`}
                  onClick={() => removeLog(log.id)}
                >
                  <Trash size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="saved-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Saved</p>
            <h2>Your exercises</h2>
          </div>
          {saved.length > 0 && <Link to="/library" className="text-link">Find more</Link>}
        </div>
        {saved.length > 0 ? (
          <div className="ex-grid ex-grid-four">
            {saved.map(exercise => <ExerciseCard key={exercise.id} exercise={exercise} compact />)}
          </div>
        ) : (
          <div className="empty-state empty-inline">
            <h2>Nothing saved yet.</h2>
            <p>Tap the heart on any exercise to keep it close.</p>
            <Link to="/library" className="btn btn-quiet">Browse the library</Link>
          </div>
        )}
      </section>
    </div>
  )
}
