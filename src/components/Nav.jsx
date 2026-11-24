import {
  ChartLineUp,
  Gear,
  House,
  Moon,
  Stack,
  Sun,
  SquaresFour,
} from '@phosphor-icons/react'
import { Link } from '../lib/router.jsx'
import { setSettings, useStore } from '../lib/store.js'

export function Logo({ small = false }) {
  return (
    <span className={'logo' + (small ? ' logo-small' : '')}>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="logo-mark">
        <circle cx="12" cy="4.6" r="2.3" fill="currentColor" />
        <path
          d="M12 7.6v6.2M12 9.4 7.4 12.2M12 9.4l4.6 2.8M12 13.8l-3.8 6.4M12 13.8l3.8 6.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
      <span>homebody</span>
    </span>
  )
}

const links = [
  { to: '/', label: 'Home', icon: House, page: 'home' },
  { to: '/library', label: 'Library', icon: SquaresFour, page: 'library' },
  { to: '/programs', label: 'Programs', icon: Stack, page: 'programs' },
  { to: '/progress', label: 'Progress', icon: ChartLineUp, page: 'progress' },
]

export default function Nav({ path }) {
  const { settings } = useStore()
  const page = path.split('/').filter(Boolean)[0] || 'home'
  const dark =
    settings.theme === 'dark' ||
    (settings.theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-color-scheme: dark)').matches)

  return (
    <>
      <header className="site-head">
        <div className="page site-head-inner">
          <Link to="/" className="brand" aria-label="homebody home">
            <Logo />
          </Link>
          <nav className="top-links" aria-label="Main">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={'top-link' + (page === link.page ? ' is-active' : '')}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="head-actions">
            <button
              type="button"
              className="icon-btn"
              aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
              onClick={() => setSettings({ theme: dark ? 'light' : 'dark' })}
            >
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <Link to="/settings" className={'icon-btn' + (page === 'settings' ? ' is-active' : '')} aria-label="Settings">
              <Gear size={19} />
            </Link>
          </div>
        </div>
      </header>

      <nav className="bottom-nav" aria-label="Main">
        {links.map(link => {
          const Icon = link.icon
          return (
            <Link
              key={link.to}
              to={link.to}
              className={'bottom-link' + (page === link.page ? ' is-active' : '')}
            >
              <Icon size={21} />
              <span>{link.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
