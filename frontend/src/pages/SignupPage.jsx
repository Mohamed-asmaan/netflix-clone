import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../api'
import { clearSession, getToken, setSession } from '../lib/auth'
import AuthFormCard from '../components/AuthFormCard'
import AuthFooter from '../components/AuthFooter'
import AuthHeader from '../components/AuthHeader'
import AuthSiteNotice from '../components/AuthSiteNotice'

const signupFields = [
  { name: 'name', type: 'text', placeholder: 'Full name', autoComplete: 'name' },
  { name: 'email', type: 'email', placeholder: 'Email', autoComplete: 'email' },
  { name: 'password', type: 'password', placeholder: 'Password', autoComplete: 'new-password' },
]

function SignupPage() {
  const goTo = useNavigate()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(null)

  // Same idea as login page — see if a saved token still works
  useEffect(() => {
    const token = getToken()
    if (!token) {
      setLoading(false)
      return
    }

    axios
      .get(serverUrl + '/dashboard', {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then(function (res) {
        setSession(token, res.data.user)
        setLoggedInUser(res.data.user)
        setAlreadyLoggedIn(true)
        setLoading(false)
      })
      .catch(function () {
        clearSession()
        setAlreadyLoggedIn(false)
        setLoading(false)
      })
  }, [])

  function switchToAnotherAccount() {
    clearSession()
    setAlreadyLoggedIn(false)
    setLoggedInUser(null)
  }

  function onSignupForm(data) {
    setMessage('')

    const name = (data.name && String(data.name).trim()) || ''
    const email = (data.email && String(data.email).trim()) || ''
    const password = data.password != null ? String(data.password) : ''
    if (name === '' || email === '' || password === '') {
      setMessage('Please enter your name, email, and password.')
      return
    }

    axios
      .post(serverUrl + '/signup', { name, email, password })
      .then(function (response) {
        setSession(response.data.token, response.data.user)
        goTo('/dashboard', { replace: true })
      })
      .catch(function (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message)
        } else {
          setMessage('Could not reach the server. Is the API running?')
        }
      })
  }

  if (loading) {
    return (
      <main className="flex min-h-[100dvh] w-full items-center justify-center bg-black px-4 text-center text-white">
        Loading…
      </main>
    )
  }

  return (
    <main className="flex min-h-[100dvh] w-full max-w-full flex-col overflow-x-hidden bg-[radial-gradient(90%_70%_at_0%_0%,rgba(198,40,58,0.38),rgba(92,14,26,0.26)_40%,rgba(0,0,0,0.98)_75%)]">
      <div className="w-full min-w-0 max-w-full flex-1 overflow-x-hidden px-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-5 md:px-6">
        <AuthHeader />
        <AuthSiteNotice />

        {alreadyLoggedIn ? (
          <div className="mx-auto mt-6 w-full min-w-0 max-w-[min(100%,30rem)] rounded border border-white/15 bg-black/50 px-4 py-6 text-center text-white sm:px-6">
            <p className="mb-1 text-lg font-semibold">You are already signed in</p>
            <p className="mb-6 break-words text-sm text-zinc-300">
              {loggedInUser && loggedInUser.name ? loggedInUser.name : 'Session is active.'}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => goTo('/dashboard', { replace: true })}
                className="min-h-11 w-full touch-manipulation rounded bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 sm:w-auto"
              >
                Go to browse
              </button>
              <button
                type="button"
                onClick={switchToAnotherAccount}
                className="min-h-11 w-full touch-manipulation rounded border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto"
              >
                Use a different account
              </button>
            </div>
          </div>
        ) : (
          <AuthFormCard
            title="Enter your info to sign up"
            subtitle="Or sign in with your existing account."
            fields={signupFields}
            buttonLabel="Continue"
            helperText="Already have an account?"
            helperLinkText="Sign in"
            helperLinkTo="/login"
            onSubmit={onSignupForm}
            error={message}
          />
        )}
      </div>
      <AuthFooter />
    </main>
  )
}

export default SignupPage
