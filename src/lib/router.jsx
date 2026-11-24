// A hash router small enough to read in one sitting. Hash routing keeps the
// app working from any static host, including file previews.

import { useEffect, useState } from 'react'

export function currentPath() {
  const hash = window.location.hash.replace(/^#/, '')
  return hash || '/'
}

export function useRoute() {
  const [path, setPath] = useState(currentPath)
  useEffect(() => {
    const onHash = () => setPath(currentPath())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return path
}

export function navigate(to) {
  if (window.location.hash === `#${to}`) return
  window.location.hash = to
}

export function Link({ to, children, className = '', ...rest }) {
  return (
    <a href={`#${to}`} className={className} {...rest}>
      {children}
    </a>
  )
}

export function parseRoute(path) {
  const [clean, query = ''] = path.split('?')
  const parts = clean.split('/').filter(Boolean)
  return {
    parts,
    query: new URLSearchParams(query),
    page: parts[0] || 'home',
    param: parts[1] || '',
    sub: parts[2] || '',
  }
}

export function useScrollTop(path) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [path])
}
