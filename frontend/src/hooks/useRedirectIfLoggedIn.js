import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../lib/apiClient'
import { clearSession, getToken, hasStoredToken, setSession } from '../lib/auth'

/**
 * If the browser already has a valid token, skip the auth form and go to the dashboard.
 * If the token is stale, clear it so login/signup work normally.
 */
export function useRedirectIfLoggedIn() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!hasStoredToken()) {
      return undefined
    }

    let cancelled = false

    apiClient
      .get('/dashboard')
      .then((res) => {
        if (cancelled) return
        if (res.data && res.data.user) {
          setSession(getToken(), res.data.user)
        }
        navigate('/dashboard', { replace: true })
      })
      .catch(() => {
        if (cancelled) return
        clearSession()
      })

    return () => {
      cancelled = true
    }
  }, [navigate])
}
