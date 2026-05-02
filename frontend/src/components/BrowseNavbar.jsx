import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUser, signOut } from '../lib/auth'
import BrandLogo from './BrandLogo'

const navItems = ['TV Shows', 'Movies', 'New & Popular', 'My List']

function BrowseNavbar() {
  const navigate = useNavigate()
  const [signingOut, setSigningOut] = useState(false)
  const user = getUser()

  function handleSignOut() {
    if (signingOut) return
    setSigningOut(true)

    signOut().then(function () {
      navigate('/login', { replace: true })
      setSigningOut(false)
    })
  }

  return (
    <header className="sticky top-0 z-20 flex w-full min-w-0 flex-col gap-3 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.95),rgba(0,0,0,0.25))] px-3 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4 sm:py-4 md:px-10">
      <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <Link to="/dashboard" className="shrink-0 self-start" aria-label="StreamCove home">
          <BrandLogo />
        </Link>
        <nav
          className="-mx-1 flex min-h-[44px] min-w-0 max-w-full flex-nowrap items-center gap-x-4 overflow-x-auto overscroll-x-contain px-1 pb-1 text-xs text-white [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible sm:text-sm [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <Link to="/dashboard" className="shrink-0 whitespace-nowrap no-underline hover:text-zinc-300">
            Dashboard
          </Link>
          {navItems.map((item) => (
            <a href="#" key={item} className="shrink-0 whitespace-nowrap no-underline hover:text-zinc-300">
              {item}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex w-full min-w-0 flex-col gap-2 border-t border-white/10 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:border-0 sm:pt-0">
        {user && user.name ? (
          <span className="w-full truncate text-center text-xs text-zinc-300 sm:w-auto sm:max-w-[12rem] sm:text-left sm:text-sm md:max-w-[16rem]">
            Hi, {user.name}
          </span>
        ) : null}
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="min-h-11 w-full touch-manipulation rounded border border-white/30 bg-black/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-50 sm:w-auto sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-sm"
        >
          {signingOut ? 'Signing out…' : 'Sign out'}
        </button>
      </div>
    </header>
  )
}

export default BrowseNavbar
