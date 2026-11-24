import { useMemo, useState } from 'react'
import { MagnifyingGlass, SlidersHorizontal, X } from '@phosphor-icons/react'
import ExerciseCard from '../components/ExerciseCard.jsx'
import {
  CATEGORIES,
  EQUIPMENT,
  FOCUS_AREAS,
  LEVELS,
  exercises,
} from '../data/exercises.js'

const ALL = 'all'

export default function Library() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(ALL)
  const [focus, setFocus] = useState(ALL)
  const [equipment, setEquipment] = useState(ALL)
  const [level, setLevel] = useState(ALL)
  const [quiet, setQuiet] = useState(false)
  const [noEquipment, setNoEquipment] = useState(false)
  const [smallSpace, setSmallSpace] = useState(false)
  const [lowImpact, setLowImpact] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return exercises
      .filter(exercise => {
        if (category !== ALL && exercise.category !== category) return false
        if (focus !== ALL && !exercise.focus.includes(focus)) return false
        if (equipment !== ALL && !exercise.equipment.includes(equipment)) return false
        if (level !== ALL && exercise.level !== Number(level)) return false
        if (quiet && !exercise.quiet) return false
        if (noEquipment && exercise.equipment.length > 0) return false
        if (smallSpace && exercise.space !== 'small') return false
        if (lowImpact && exercise.impact !== 'low') return false
        if (q) {
          const haystack = [
            exercise.name,
            exercise.category,
            exercise.focus.join(' '),
            exercise.tags.join(' '),
            exercise.equipment.map(key => EQUIPMENT[key]).join(' '),
            exercise.setup,
            exercise.move,
          ]
            .join(' ')
            .toLowerCase()
          if (!haystack.includes(q)) return false
        }
        return true
      })
      .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name))
  }, [query, category, focus, equipment, level, quiet, noEquipment, smallSpace, lowImpact])

  const activeCount =
    (category !== ALL ? 1 : 0) +
    (focus !== ALL ? 1 : 0) +
    (equipment !== ALL ? 1 : 0) +
    (level !== ALL ? 1 : 0) +
    (quiet ? 1 : 0) +
    (noEquipment ? 1 : 0) +
    (smallSpace ? 1 : 0) +
    (lowImpact ? 1 : 0)

  function clearAll() {
    setCategory(ALL)
    setFocus(ALL)
    setEquipment(ALL)
    setLevel(ALL)
    setQuiet(false)
    setNoEquipment(false)
    setSmallSpace(false)
    setLowImpact(false)
    setQuery('')
  }

  return (
    <div className="page library">
      <header className="page-head">
        <div>
          <p className="eyebrow">The library</p>
          <h1>Every movement, explained.</h1>
          <p className="page-lede">
            {exercises.length} exercises you can do at home. Search by name or body
            part, or narrow things down until the list feels possible.
          </p>
        </div>
        <div className="page-head-figure" aria-hidden="true">
          <span className="big-count">{filtered.length}</span>
          <span className="count-label">matching exercises</span>
        </div>
      </header>

      <div className="search-row">
        <label className="search-box">
          <MagnifyingGlass size={19} />
          <span className="sr-only">Search exercises</span>
          <input
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search squat, core, quiet, backpack…"
          />
          {query && (
            <button type="button" className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">
              <X size={15} />
            </button>
          )}
        </label>
      </div>

      <div className="filter-panel">
        <div className="filter-panel-head">
          <span><SlidersHorizontal size={16} /> Filters</span>
          {activeCount > 0 && (
            <button type="button" className="text-btn" onClick={clearAll}>
              Clear {activeCount}
            </button>
          )}
        </div>

        <div className="filter-block">
          <span className="filter-label">Type</span>
          <div className="chip-row">
            <button
              type="button"
              className={'chip' + (category === ALL ? ' is-on' : '')}
              onClick={() => setCategory(ALL)}
            >
              All
            </button>
            {CATEGORIES.map(item => (
              <button
                key={item}
                type="button"
                className={'chip' + (category === item ? ' is-on' : '')}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-grid">
          <label className="field">
            <span>Body part</span>
            <select value={focus} onChange={event => setFocus(event.target.value)}>
              <option value={ALL}>All body parts</option>
              {FOCUS_AREAS.map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Equipment</span>
            <select value={equipment} onChange={event => setEquipment(event.target.value)}>
              <option value={ALL}>Anything</option>
              {Object.entries(EQUIPMENT).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Level</span>
            <select value={level} onChange={event => setLevel(event.target.value)}>
              <option value={ALL}>Any level</option>
              {LEVELS.map((label, index) => (
                <option key={label} value={index + 1}>{label}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="toggle-row">
          <label className="check">
            <input type="checkbox" checked={quiet} onChange={event => setQuiet(event.target.checked)} />
            <span>Quiet only</span>
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={noEquipment}
              onChange={event => setNoEquipment(event.target.checked)}
            />
            <span>No equipment</span>
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={smallSpace}
              onChange={event => setSmallSpace(event.target.checked)}
            />
            <span>Small space</span>
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={lowImpact}
              onChange={event => setLowImpact(event.target.checked)}
            />
            <span>Low impact</span>
          </label>
        </div>
      </div>

      <div className="result-bar">
        <p>
          <strong>{filtered.length}</strong> {filtered.length === 1 ? 'exercise' : 'exercises'}
        </p>
        {activeCount > 0 && (
          <button type="button" className="text-btn" onClick={clearAll}>
            Reset filters
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="ex-grid">
          {filtered.map(exercise => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Nothing matches all of that.</h2>
          <p>Try removing one filter. The library is wide on purpose.</p>
          <button type="button" className="btn btn-primary" onClick={clearAll}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
