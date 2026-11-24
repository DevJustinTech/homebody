import { useEffect, useState } from 'react'
import Nav from './components/Nav.jsx'
import { MotionContext } from './lib/motion.js'
import { parseRoute, useRoute, useScrollTop } from './lib/router.jsx'
import { useStore } from './lib/store.js'
import Home from './views/Home.jsx'
import Library from './views/Library.jsx'
import ExerciseDetail from './views/ExerciseDetail.jsx'
import Programs from './views/Programs.jsx'
import ProgramDetail from './views/ProgramDetail.jsx'
import Player from './views/Player.jsx'
import Progress from './views/Progress.jsx'
import Settings from './views/Settings.jsx'

function useResolvedTheme(theme) {
  const [systemDark, setSystemDark] = useState(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches,
  )

  useEffect(() => {
    if (!window.matchMedia) return
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setSystemDark(query.matches)
    query.addEventListener?.('change', onChange)
    return () => query.removeEventListener?.('change', onChange)
  }, [])

  return theme === 'system' ? (systemDark ? 'dark' : 'light') : theme
}

function NotFound() {
  return (
    <div className="page empty-state">
      <p className="eyebrow">404</p>
      <h1>This room is empty.</h1>
      <p>The page you asked for does not exist. The library does.</p>
      <a href="#/library" className="btn btn-primary">Back to the library</a>
    </div>
  )
}

export default function App() {
  const path = useRoute()
  const { settings } = useStore()
  const theme = useResolvedTheme(settings.theme)
  const { page, parts, param } = parseRoute(path)
  useScrollTop(path)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#121210' : '#f3f1ea')
  }, [theme])

  const immersive = page === 'play' || page === 'quick'

  let view
  switch (page) {
    case 'home':
      view = <Home />
      break
    case 'library':
      view = <Library />
      break
    case 'exercise':
      view = <ExerciseDetail id={param} />
      break
    case 'programs':
      view = <Programs />
      break
    case 'program':
      view = <ProgramDetail id={param} />
      break
    case 'progress':
      view = <Progress />
      break
    case 'settings':
      view = <Settings />
      break
    case 'quick':
      view = <Player key={path} mode="quick" param={param} />
      break
    case 'play':
      view = <Player key={path} mode={parts[1]} param={parts[2]} sub={parts[3]} />
      break
    default:
      view = <NotFound />
  }

  return (
    <MotionContext.Provider value={settings.reduceMotion}>
      <div className="app">
        {!immersive && <Nav path={path} />}
        <main id="main">{view}</main>
        {!immersive && (
          <footer className="page site-foot">
            <span>homebody</span>
            <span>Strong where you are.</span>
            <span>No account. No tracking.</span>
          </footer>
        )}
      </div>
    </MotionContext.Provider>
  )
}
