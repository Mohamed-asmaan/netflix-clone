import axios from 'axios'
import { serverUrl } from '../api'

// Keys for localStorage (where we keep login info in the browser)
const TOKEN_KEY = 'nc_session_token'
const USER_KEY = 'nc_session_user'

export function getToken() {
  let t = localStorage.getItem(TOKEN_KEY)
  if (t) return t
  // old demo key from earlier versions
  t = localStorage.getItem('token')
  if (t) {
    localStorage.setItem(TOKEN_KEY, t)
    localStorage.removeItem('token')
  }
  return t
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch (e) {
    return null
  }
}

// Call this after login or signup when the server sends back token + user
export function setSession(token, user) {
  if (!token) return
  localStorage.setItem(TOKEN_KEY, token)
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }
}

// Wipes the browser login data
export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  localStorage.removeItem('token')
}

// Log out on the server, then clear the browser (clear happens even if the request fails)
export function signOut() {
  const token = getToken()
  if (!token) {
    clearSession()
    return Promise.resolve()
  }

  return axios
    .post(
      serverUrl + '/logout',
      {},
      {
        headers: { Authorization: 'Bearer ' + token },
      }
    )
    .then(function () {
      clearSession()
    })
    .catch(function () {
      clearSession()
    })
}
