import { footerPromo } from '../assets/images/banners'

const promoStripBackground = {
  backgroundImage: `linear-gradient(90deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)),url(${footerPromo})`,
}

function BrowseFooter() {
  const columns = [
    ['FAQ', 'Media Centre', 'Ways to Watch', 'Cookie Preferences', 'Speed Test'],
    ['Help Centre', 'Investor Relations', 'Terms of Use', 'Corporate Information', 'Legal Notices'],
    ['Account', 'Jobs', 'Privacy', 'Contact Us', 'Only on Netflix'],
  ]

  return (
    <footer className="mt-auto w-full pb-[max(1.5rem,env(safe-area-inset-bottom))] text-zinc-300">
      <div className="w-full px-3 py-0 sm:px-4 md:px-10">
        <div
          style={promoStripBackground}
          className="rounded-xl bg-cover bg-center px-4 py-3 sm:rounded-2xl sm:px-6 sm:py-4"
        >
          <div className="flex flex-col items-stretch justify-between gap-3 sm:items-start sm:gap-4 md:flex-row md:items-center">
            <p className="text-base font-semibold leading-snug text-white sm:text-lg">
              Discover your next favourites, plus new releases every week
            </p>
            <button
              type="button"
              className="w-full touch-manipulation rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white sm:w-auto sm:py-2 sm:text-[14px]"
            >
              More About Netflix
            </button>
          </div>
        </div>
      </div>

      <div className="w-full px-3 pt-6 sm:px-4 md:px-10 md:pt-8">
        <div className="my-6 flex justify-center sm:my-8">
          <button
            type="button"
            className="min-h-11 w-full max-w-sm touch-manipulation rounded-full bg-red-600 px-8 py-3 text-base font-semibold text-white sm:w-auto sm:max-w-none sm:px-12 sm:text-[18px]"
          >
            Join now
          </button>
        </div>

        <p className="note-text mb-5">Questions? Call 000-800-919-1743</p>

        <div className="grid grid-cols-1 gap-2 text-[13px] md:grid-cols-3 md:gap-10">
          {columns.map((links) => (
            <div key={links[0]} className="space-y-2">
              {links.map((link) => (
                <a href="#" key={link} className="block no-underline hover:text-white">
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default BrowseFooter
