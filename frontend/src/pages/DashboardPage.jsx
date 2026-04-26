import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../api'
import { clearSession, getToken, setSession } from '../lib/auth'
import BrowseFooter from '../components/BrowseFooter'
import BrowseNavbar from '../components/BrowseNavbar'
import HeroBanner from '../components/HeroBanner'
import MovieRow from '../components/MovieRow'
import PlanSection from '../components/PlanSection'
import movieRows from '../data/movies'

function DashboardPage() {
  const goTo = useNavigate()
  const [showPage, setShowPage] = useState(false)

  useEffect(() => {
    const token = getToken()
    if (token == null || token === '') {
      clearSession()
      goTo('/login', { replace: true })
      return
    }

    const url = serverUrl + '/dashboard'
    const headerWithToken = {
      headers: { Authorization: 'Bearer ' + token },
    }

    axios
      .get(url, headerWithToken)
      .then((res) => {
        if (res.data && res.data.user) {
          setSession(token, res.data.user)
        }
        setShowPage(true)
      })
      .catch(() => {
        clearSession()
        goTo('/login', { replace: true })
      })
  }, [goTo])

  if (showPage === false) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-black text-white">Loading…</div>
    )
  }

  return (
    <main className="flex min-h-[100dvh] w-full max-w-full flex-col bg-[radial-gradient(circle_at_top,rgba(43,12,65,0.35),rgba(0,0,0,0.95)_40%),#000]">
      <h1 className="sr-only">StreamCove home</h1>
      <div className="w-full min-w-0 flex-1">
        <BrowseNavbar />
        <HeroBanner />

        <section className="px-3 py-5 sm:px-4 sm:py-6 md:px-10">
          {movieRows.map((row) => (
            <MovieRow key={row.title} title={row.title} movies={row.movies} />
          ))}

          <PlanSection />
        </section>
      </div>
      <BrowseFooter />
    </main>
  )
}

export default DashboardPage
