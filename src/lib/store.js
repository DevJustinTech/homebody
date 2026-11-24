// Local-first state. Everything lives in one localStorage key, so the app keeps
// working offline and there is nothing to sign up for.

import { useSyncExternalStore } from 'react'

const KEY = 'homebody.v1'

const defaults = {
  settings: {
    theme: 'system',
    sound: true,
    reduceMotion: false,
  },
  profile: { name: '' },
  favorites: [],
  recent: [],
  logs: [],
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaults
    const parsed = JSON.parse(raw)
    return {
      ...defaults,
      ...parsed,
      settings: { ...defaults.settings, ...parsed.settings },
      profile: { ...defaults.profile, ...parsed.profile },
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      recent: Array.isArray(parsed.recent) ? parsed.recent : [],
      logs: Array.isArray(parsed.logs) ? parsed.logs : [],
    }
  } catch {
    return defaults
  }
}

let state = load()
const listeners = new Set()

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // Storage can be full or blocked. The session still works in memory.
  }
}

function emit() {
  for (const fn of listeners) fn()
}

export function getState() {
  return state
}

export function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function update(updater) {
  state = typeof updater === 'function' ? updater(state) : { ...state, ...updater }
  persist()
  emit()
}

export function useStore() {
  return useSyncExternalStore(subscribe, getState, getState)
}

export function setSettings(patch) {
  update(s => ({ ...s, settings: { ...s.settings, ...patch } }))
}

export function setProfile(patch) {
  update(s => ({ ...s, profile: { ...s.profile, ...patch } }))
}

export function toggleFavorite(id) {
  update(s => ({
    ...s,
    favorites: s.favorites.includes(id)
      ? s.favorites.filter(x => x !== id)
      : [id, ...s.favorites],
  }))
}

export function markRecent(id) {
  update(s => ({ ...s, recent: [id, ...s.recent.filter(x => x !== id)].slice(0, 12) }))
}

export function logWorkout(entry) {
  const log = {
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    date: new Date().toISOString(),
    ...entry,
  }
  update(s => ({ ...s, logs: [log, ...s.logs].slice(0, 300) }))
  return log
}

export function removeLog(id) {
  update(s => ({ ...s, logs: s.logs.filter(log => log.id !== id) }))
}

export function clearHistory() {
  update(s => ({ ...s, logs: [] }))
}

export function exportData() {
  return JSON.stringify(state, null, 2)
}

export function dayKey(value) {
  const d = new Date(value)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${month}-${day}`
}

export function statsFrom(logs) {
  const totalMinutes = logs.reduce((n, log) => n + (log.minutes || 0), 0)
  const today = new Date()
  const days = new Set(logs.map(log => dayKey(log.date)))

  let streak = 0
  const cursor = new Date(today)
  if (!days.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1)
  while (days.has(dayKey(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }

  const week = []
  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = dayKey(d)
    const minutes = logs
      .filter(log => dayKey(log.date) === key)
      .reduce((n, log) => n + (log.minutes || 0), 0)
    week.push({ key, label: d.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2), minutes })
  }

  return {
    workouts: logs.length,
    totalMinutes,
    streak,
    week,
    weekMinutes: week.reduce((n, day) => n + day.minutes, 0),
  }
}
