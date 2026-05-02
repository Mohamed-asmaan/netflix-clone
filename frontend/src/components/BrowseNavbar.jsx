import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUser, logoutRemote } from '../lib/auth'
import BrandLogo from './BrandLogo'

const navItems = ['TV Shows', 'Movies', 'New & Popular', 'My List']

function BrowseNavbar() {
  const navigate = useNavigate()
  const [signingOut, setSigningOut] = useState(false)
  const user = getUser()

  async function handleSignOut() {
    if (signingOut) return
    setSigningOut(true)
    try {
      await logoutRemote()
      navigate('/login', { replace: true })
    } finally {
      setSigningOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-20 flex flex-col gap-3 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.95),rgba(0,0,0,0.25))] px-3 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4 sm:py-4 md:flex-row md:items-center md:justify-between md:px-10">
      <div className="flex min-w-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-6 md:gap-8">
        <Link to="/dashboard" className="shrink-0 self-start" aria-label="StreamCove home">
          <BrandLogo />
        </Link>
        <nav className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-xs text-white sm:gap-4 sm:text-sm">
          <Link to="/dashboard" className="shrink-0 no-underline hover:text-zinc-300">
            Dashboard
          </Link>
          {navItems.map((item) => (
            <a href="#" key={item} className="shrink-0 no-underline hover:text-zinc-300">
              {item}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:gap-3 md:ml-4">
        {user && user.name ? (
          <span className="max-w-[10rem] truncate text-xs text-zinc-300 sm:max-w-[14rem] sm:text-sm">
            Hi, {user.name}
          </span>
        ) : null}
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="rounded border border-white/30 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 disabled:opacity-50 sm:text-sm"
        >
          {signingOut ? 'Signing out…' : 'Sign out'}
        </button>
      </div>
    </header>
  )
}

export default BrowseNavbar
