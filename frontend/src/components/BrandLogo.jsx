function BrandLogo() {
  return (
    <div className="flex items-center gap-2 md:gap-2.5">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0d9488] shadow-sm md:h-9 md:w-9"
        aria-hidden
      >
        <svg
          className="ml-0.5 h-4 w-4 text-white md:h-[1.1rem] md:w-[1.1rem]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span className="text-xl font-bold leading-none tracking-tight text-white sm:text-2xl md:text-[1.75rem]">
        Stream
        <span className="text-[#2dd4bf]">Cove</span>
      </span>
    </div>
  )
}

export default BrandLogo
