function AuthFooter() {
  return (
    <footer className="mt-auto w-full bg-[#2b2b2b] py-8 pb-[max(2rem,env(safe-area-inset-bottom))] text-[#f1f1f1]/90 sm:py-10 sm:pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <div className="w-full px-4 sm:px-6 md:px-10">
        <p className="note-text mb-6">Questions? This demo is for learning — no call centre or live support.</p>

        <div className="mb-8 grid grid-cols-1 gap-y-3 sm:grid-cols-2 md:grid-cols-4">
          <a href="#" className="note-text no-underline hover:text-white">
            FAQ
          </a>
          <a href="#" className="note-text no-underline hover:text-white">
            Help Centre
          </a>
          <a href="#" className="note-text no-underline hover:text-white">
            Terms of Use
          </a>
          <a href="#" className="note-text no-underline hover:text-white">
            Privacy
          </a>
          <a href="#" className="note-text no-underline hover:text-white">
            Cookie Preferences
          </a>
          <a href="#" className="note-text no-underline hover:text-white">
            Corporate Information
          </a>
        </div>
      </div>
    </footer>
  )
}

export default AuthFooter
