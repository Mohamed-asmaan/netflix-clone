function AuthSiteNotice() {
  return (
    <aside
      className="mx-auto mt-2 w-full max-w-[min(100%,30rem)] rounded border border-amber-500/35 bg-amber-950/40 px-3 py-2.5 text-center text-xs leading-snug text-amber-50/95 sm:px-4 sm:text-sm"
      role="status"
    >
      <strong className="font-semibold">Demo only — not a real service login.</strong> Not affiliated with
      Netflix or any third-party service. StreamCove is a learning project; do not use your real password
      here.
    </aside>
  )
}

export default AuthSiteNotice
