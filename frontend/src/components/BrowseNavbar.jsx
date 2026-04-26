import { Link } from 'react-router-dom'
import BrandLogo from './BrandLogo'

const navItems = ['TV Shows', 'Movies', 'New & Popular', 'My List']

function BrowseNavbar() {
  return (
    <header className="sticky top-0 z-20 flex flex-col gap-3 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.95),rgba(0,0,0,0.25))] px-3 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-4 sm:py-4 md:flex-row md:items-center md:justify-between md:px-10">
      <div className="flex min-w-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-6 md:gap-8">
        <Link to="/dashboard" className="shrink-0 self-start" aria-label="Netflix home">
          <BrandLogo />
        </Link>
        <nav className="flex min-w-0 flex-wrap gap-x-3 gap-y-2 text-xs text-white sm:gap-4 sm:text-sm">
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
      <div className="hidden text-sm text-zinc-300 sm:block">Kids | DVD | 🔍</div>
    </header>
  )
}

export default BrowseNavbar
