// Visible notice: learning app, not a real brand login. Links to Google’s Safe Browsing / Search Console.
function AuthSiteNotice() {
  const reportErrorUrl =
    typeof window !== 'undefined'
      ? 'https://safebrowsing.google.com/safebrowsing/report_error/?url=' +
        encodeURIComponent(window.location.origin + '/')
      : 'https://safebrowsing.google.com/safebrowsing/report_error/'

  return (
    <aside
      className="mx-auto mt-2 w-full max-w-[min(100%,30rem)] rounded border border-amber-500/35 bg-amber-950/40 px-3 py-2.5 text-center text-xs leading-snug text-amber-50/95 sm:px-4 sm:text-sm"
      role="status"
    >
      <strong className="font-semibold">Educational project — not a real company login.</strong>{' '}
      Do not use your real Netflix (or any) passwords here. The red Chrome warning is from Google Safe
      Browsing; if this is a mistake, site owners can{' '}
      <a
        className="font-medium text-white underline decoration-amber-200/80 underline-offset-2 hover:decoration-white"
        href="https://search.google.com/search-console/welcome"
        target="_blank"
        rel="noopener noreferrer"
      >
        use Search Console
      </a>
      {', and anyone can '}
      <a
        className="font-medium text-white underline decoration-amber-200/80 underline-offset-2 hover:decoration-white"
        href={reportErrorUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        report an incorrect block to Google
      </a>
      . See also Chrome’s help: “Manage warnings about unsafe sites.”
    </aside>
  )
}

export default AuthSiteNotice
