import BrandLogo from './BrandLogo'

function AuthHeader() {
  return (
    <header className="mx-auto flex w-full min-w-0 max-w-7xl items-center border-b border-white/20 py-4 sm:py-5">
      <BrandLogo />
    </header>
  )
}

export default AuthHeader
