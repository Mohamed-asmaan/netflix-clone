function MovieRow({ title, movies }) {
  return (
    <div className="mb-8 sm:mb-10">
      <h2 className="mb-3 break-words text-white sm:mb-4">{title}</h2>
      <div
        className="-mx-4 flex touch-pan-x snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain px-4 pb-2 [scrollbar-width:thin] sm:mx-0 sm:gap-3 sm:px-0"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {movies.map((movie) => (
          <article
            key={movie.name}
            className="pointer-events-none aspect-[2/3] w-[32vw] min-w-[6.5rem] max-w-[8.5rem] shrink-0 snap-start overflow-hidden rounded-lg border border-white/10 bg-zinc-800 sm:aspect-[2/3] sm:min-w-[clamp(5.5rem,19vw,12rem)] sm:max-w-[12rem] sm:rounded-xl"
          >
            <img
              src={movie.image}
              alt={movie.name}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </article>
        ))}
      </div>
    </div>
  )
}

export default MovieRow
