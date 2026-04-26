import { heroBanner } from '../assets/images/banners'

const heroOverlay = {
  background:
    'linear-gradient(180deg,rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.7) 100%),linear-gradient(90deg,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.4) 50%,rgba(0,0,0,0.2) 100%)',
}

function HeroBanner() {
  return (
    <section className="relative min-h-[min(58vh,28rem)] overflow-hidden sm:min-h-[min(70vh,30rem)] md:min-h-[470px]">
      <img
        src={heroBanner}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top sm:object-center"
        width={1920}
        height={800}
        decoding="async"
        fetchPriority="high"
      />
      <div className="pointer-events-none absolute inset-0" style={heroOverlay} aria-hidden />
      <div className="relative z-10 max-w-2xl px-4 py-10 sm:px-6 sm:py-16 md:px-10 md:py-24">
        <p className="text-xs tracking-[0.25em] text-zinc-300 sm:text-sm sm:tracking-[0.35em]">
          NETFLIX SERIES
        </p>
        <h2 className="mt-2 break-words text-white sm:mt-3">KINGDOM</h2>
        <p className="mt-3 max-w-xl text-zinc-100 sm:mt-4 sm:text-lg">
          A period thriller where old secrets rise in the dead of night. Watch the full series now in
          Hindi, English, Japanese and Korean audio.
        </p>

        <div className="mt-6 flex w-full max-w-md flex-col gap-2 sm:mt-8 sm:max-w-none sm:flex-row sm:gap-3">
          <button
            type="button"
            className="min-h-11 w-full touch-manipulation rounded-md bg-white px-6 py-3 text-base font-semibold text-black sm:w-auto sm:min-h-0 sm:px-7 sm:text-lg"
          >
            Play
          </button>
          <button
            type="button"
            className="min-h-11 w-full touch-manipulation rounded-md bg-zinc-500/80 px-6 py-3 text-base font-semibold text-white sm:w-auto sm:min-h-0 sm:px-7 sm:text-lg"
          >
            More Info
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
