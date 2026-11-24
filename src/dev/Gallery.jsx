import { useState } from 'react'
import ExerciseFigure from '../rig/ExerciseFigure.jsx'
import { PATTERN_NAMES } from '../rig/patterns.js'

const VARIANTS = [
  ['squat', {}],
  ['squat', { variant: 'sumo' }],
  ['squat', { variant: 'jump' }],
  ['squat', { variant: 'chair' }],
  ['squat', { variant: 'backpack' }],
  ['squat', { variant: 'pulse' }],
  ['squat', { variant: 'hold' }],
  ['pushup', {}],
  ['pushup', { variant: 'wall' }],
  ['pushup', { variant: 'incline' }],
  ['pushup', { variant: 'knee' }],
  ['pushup', { variant: 'decline' }],
  ['pushup', { variant: 'pike' }],
  ['plank', {}],
  ['plank', { variant: 'forearm' }],
  ['plank', { variant: 'side' }],
  ['plank', { variant: 'side', dip: true }],
  ['plank', { variant: 'reverse' }],
  ['lunge', {}],
  ['lunge', { variant: 'lateral' }],
  ['lunge', { variant: 'curtsy' }],
  ['lunge', { variant: 'jump' }],
  ['lunge', { variant: 'bulgarian' }],
  ['lunge', { variant: 'backpack' }],
  ['lunge', { variant: 'split' }],
  ['crunch', {}],
  ['crunch', { variant: 'reverse' }],
  ['crunch', { variant: 'bicycle' }],
  ['crunch', { variant: 'legraise' }],
  ['crunch', { variant: 'flutter' }],
  ['crunch', { variant: 'situp' }],
  ['crunch', { variant: 'twist' }],
  ['crunch', { variant: 'hold' }],
  ['crunch', { variant: 'vup' }],
  ['crunch', { variant: 'toeTouch' }],
  ['row', {}],
  ['row', { variant: 'band' }],
  ['row', { variant: 'backpack' }],
  ['gluteBridge', {}],
  ['gluteBridge', { variant: 'single' }],
  ['gluteBridge', { variant: 'march' }],
  ['gluteBridge', { variant: 'hold' }],
  ['hipThrust', {}],
  ['hipThrust', { variant: 'single' }],
  ['goodMorning', {}],
  ['goodMorning', { variant: 'backpack' }],
  ['singleLegRdl', {}],
  ['stepUp', {}],
  ['stepUp', { variant: 'down' }],
  ['calfRaise', {}],
  ['calfRaise', { variant: 'single' }],
  ['dip', {}],
  ['pullUp', {}],
  ['pullUp', { variant: 'hang' }],
  ['pullUp', { variant: 'scap' }],
  ['hangingKneeRaise', {}],
  ['invertedRow', {}],
  ['jumpingJack', {}],
  ['highKnees', {}],
  ['buttKicks', {}],
  ['jog', {}],
  ['shadowBox', {}],
  ['jumpRope', {}],
  ['burpee', {}],
  ['skater', {}],
  ['starJump', {}],
  ['inchworm', {}],
  ['stepTouch', {}],
  ['fastFeet', {}],
  ['catCow', {}],
  ['childsPose', {}],
  ['downwardDog', {}],
  ['cobra', {}],
  ['hipFlexorStretch', {}],
  ['hamstringStretch', {}],
  ['quadStretch', {}],
  ['calfStretch', {}],
  ['chestStretch', {}],
  ['tricepStretch', {}],
  ['neckStretch', {}],
  ['butterfly', {}],
  ['singleLegBalance', {}],
  ['singleLegBalance', { variant: 'tree' }],
  ['airplane', {}],
  ['deepSquatHold', {}],
  ['wallSit', {}],
  ['wallSit', { variant: 'single' }],
  ['bearCrawl', {}],
  ['mountainClimber', {}],
  ['shoulderTap', {}],
  ['plankUpDown', {}],
  ['birdDog', {}],
  ['birdDog', { variant: 'donkey' }],
  ['deadBug', {}],
  ['superman', {}],
  ['superman', { variant: 'swimmer' }],
  ['hollow', {}],
  ['hollow', { variant: 'rock' }],
  ['bandPullApart', {}],
  ['bandPullApart', { variant: 'face' }],
  ['bandPress', {}],
  ['lateralWalk', {}],
  ['wallAngel', {}],
  ['forwardFold', {}],
  ['seatedTwist', {}],
  ['hipAbduction', {}],
  ['gluteKickback', {}],
  ['frontRaise', {}],
  ['tricepExtension', {}],
  ['wristRock', {}],
]

export default function Gallery() {
  const [theme, setTheme] = useState('light')
  const only = new URLSearchParams(window.location.search).get('only')
  const variants = only
    ? VARIANTS.filter(([p, a]) => only.split(',').includes(p + (a.variant ? ':' + a.variant : '')))
    : VARIANTS
  return (
    <div className={'gallery theme-' + theme} data-theme={theme}>
      <header>
        <h1>Animation study</h1>
        <button onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}>Toggle theme</button>
      </header>
      <div className="grid">
        {variants.map(([pattern, anim], i) => {
          const ex = { id: pattern + i, name: pattern, pattern, anim }
          return (
            <figure key={i}>
              <ExerciseFigure exercise={ex} playing={false} />
              <figcaption>{pattern}{anim.variant ? ' / ' + anim.variant : ''}</figcaption>
            </figure>
          )
        })}
        {!only && PATTERN_NAMES.filter(n => !VARIANTS.some(([p]) => p === n)).map(n => (
          <figure key={n}>
            <ExerciseFigure exercise={{ id: n, name: n, pattern: n }} playing={false} />
            <figcaption>{n}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
