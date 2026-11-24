// Validate the hand-written catalogue before it reaches the app.
// Run with: npm run check

import {
  CATEGORIES,
  EQUIPMENT,
  FOCUS_AREAS,
  LEVELS,
  exercises,
} from '../src/data/exercises.js'
import { programs, sessionExercises } from '../src/data/programs.js'
import { quickSessions } from '../src/data/quick.js'
import { patterns } from '../src/rig/patterns.js'

const errors = []
const fail = message => errors.push(message)
const requiredText = ['setup', 'move', 'breathe', 'easier', 'harder']
const validSpaces = new Set(['small', 'medium'])
const validImpacts = new Set(['low', 'medium', 'high'])
const validPositions = new Set(['standing', 'floor', 'wall', 'hanging'])

const exerciseIds = new Set()
for (const exercise of exercises) {
  const where = `exercise "${exercise.id}"`

  if (exerciseIds.has(exercise.id)) fail(`${where}: duplicate id`)
  exerciseIds.add(exercise.id)

  if (!exercise.name) fail(`${where}: missing name`)
  if (!patterns[exercise.pattern]) fail(`${where}: unknown pattern "${exercise.pattern}"`)
  if (!CATEGORIES.includes(exercise.category)) fail(`${where}: unknown category "${exercise.category}"`)
  if (!LEVELS[exercise.level - 1]) fail(`${where}: level must be 1–3`)

  for (const area of exercise.focus) {
    if (!FOCUS_AREAS.includes(area)) fail(`${where}: unknown focus area "${area}"`)
  }
  for (const key of exercise.equipment) {
    if (!EQUIPMENT[key]) fail(`${where}: unknown equipment "${key}"`)
  }
  for (const key of requiredText) {
    if (!exercise[key]) fail(`${where}: missing ${key}`)
  }
  if (!Array.isArray(exercise.cues) || exercise.cues.length === 0) fail(`${where}: no cues`)
  if (!validSpaces.has(exercise.space)) fail(`${where}: unknown space "${exercise.space}"`)
  if (!validImpacts.has(exercise.impact)) fail(`${where}: unknown impact "${exercise.impact}"`)
  if (!validPositions.has(exercise.position)) fail(`${where}: unknown position "${exercise.position}"`)
  if (!(exercise.sets > 0)) fail(`${where}: sets must be positive`)
  if (!(exercise.work > 0)) fail(`${where}: work must be positive`)
  if (!(exercise.rest >= 0)) fail(`${where}: rest must be zero or positive`)
}

const programIds = new Set()
let sessionCount = 0
for (const program of programs) {
  const where = `program "${program.id}"`
  if (programIds.has(program.id)) fail(`${where}: duplicate id`)
  programIds.add(program.id)
  if (!program.name) fail(`${where}: missing name`)
  if (!LEVELS[program.level - 1]) fail(`${where}: level must be 1–3`)
  if (!program.sessions.length) fail(`${where}: no sessions`)
  for (const key of program.equipment) {
    if (!EQUIPMENT[key]) fail(`${where}: unknown equipment "${key}"`)
  }

  const sessionIds = new Set()
  for (const session of program.sessions) {
    sessionCount += 1
    const sessionWhere = `${where} / session "${session.id}"`
    if (sessionIds.has(session.id)) fail(`${sessionWhere}: duplicate session id`)
    sessionIds.add(session.id)
    if (!session.name) fail(`${sessionWhere}: missing name`)
    if (!session.exercises.length) fail(`${sessionWhere}: no exercises`)

    for (const item of session.exercises) {
      if (!exerciseIds.has(item.id)) fail(`${sessionWhere}: unknown exercise "${item.id}"`)
      if (!(item.sets > 0)) fail(`${sessionWhere}: "${item.id}" needs positive sets`)
    }
    if (sessionExercises(session).length !== session.exercises.length) {
      fail(`${sessionWhere}: could not resolve every exercise`)
    }
  }
}

const quickIds = new Set()
for (const session of quickSessions) {
  const where = `quick session "${session.id}"`
  if (quickIds.has(session.id)) fail(`${where}: duplicate id`)
  quickIds.add(session.id)
  if (!session.name) fail(`${where}: missing name`)
  if (!session.blurb) fail(`${where}: missing blurb`)
  if (!session.exercises.length) fail(`${where}: no exercises`)
  for (const item of session.exercises) {
    if (!exerciseIds.has(item.id)) fail(`${where}: unknown exercise "${item.id}"`)
    if (!(item.sets > 0)) fail(`${where}: "${item.id}" needs positive sets`)
  }
}

const usedPatterns = new Set(exercises.map(exercise => exercise.anim?.pattern || exercise.pattern))

console.log('homebody data check')
console.log(
  `${exercises.length} exercises, ${usedPatterns.size}/${Object.keys(patterns).length} patterns used, ` +
    `${programs.length} programs, ${sessionCount} sessions, ${quickSessions.length} quick sessions`,
)

if (errors.length) {
  console.error(`\n${errors.length} problem${errors.length === 1 ? '' : 's'} found:`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('All references and required fields are valid.')
