import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../api'
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

  function onSignupForm(data) {
    setMessage('')

    const name = (data.name && String(data.name).trim()) || ''
    const email = (data.email && String(data.email).trim()) || ''
    const password = data.password != null ? String(data.password) : ''
    if (name === '' || email === '' || password === '') {
      setMessage('Please enter your name, email, and password.')
      return
    }

    const url = serverUrl + '/signup'
    const body = { name, email, password }

    return axios
      .post(url, body)
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        goTo('/dashboard')
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message)
        } else {
          setMessage(
            'Could not reach the API. In a separate terminal: cd backend, run node index.js, and leave that window open while you use the app.',
          )
        }
      })
  }

  return (
    <main className="flex min-h-[100dvh] w-full max-w-full flex-col bg-[radial-gradient(90%_70%_at_0%_0%,rgba(198,40,58,0.38),rgba(92,14,26,0.26)_40%,rgba(0,0,0,0.98)_75%)]">
      <div className="w-full flex-1 px-4 pb-10 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-5 md:px-6">
        <AuthHeader />
        <AuthSiteNotice />
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
      </div>
      <AuthFooter />
    </main>
  )
}

export default SignupPage
