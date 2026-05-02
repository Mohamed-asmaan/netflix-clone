import axios from 'axios'
import { serverUrl } from '../api'

const TOKEN_KEY = 'nc_session_token'
const USER_KEY = 'nc_session_user'
const LEGACY_TOKEN_KEYS = ['token', 'streamlab_demo_token']

function migrateTokenIfNeeded() {
  for (let i = 0; i < LEGACY_TOKEN_KEYS.length; i++) {
    const k = LEGACY_TOKEN_KEYS[i]
    const v = localStorage.getItem(k)
    if (v != null && v !== '') {
      localStorage.setItem(TOKEN_KEY, v)
      localStorage.removeItem(k)
      break
    }
  }
}

export function getToken() {
  migrateTokenIfNeeded()
  return localStorage.getItem(TOKEN_KEY)
}

export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setSession(token, user) {
  if (token == null || token === '') {
    return
  }
  localStorage.setItem(TOKEN_KEY, token)
  if (user != null) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }
}

/** True if we have a token saved (may still be invalid on the server). */
export function hasStoredToken() {
  migrateTokenIfNeeded()
  const t = localStorage.getItem(TOKEN_KEY)
  return t != null && t !== ''
}

/**
 * Tell the server to forget this token, then always clear the browser.
 * Safe to call even if the network fails — the user wanted to sign out.
 */
export async function logoutRemote() {
  const token = getToken()
  if (token) {
    try {
      await axios.post(`${serverUrl}/logout`, null, {
        headers: { Authorization: 'Bearer ' + token },
        timeout: 15000,
      })
    } catch {
      // Still clear locally so the app does not stay "half logged in".
    }
  }
  clearSession()
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  for (let i = 0; i < LEGACY_TOKEN_KEYS.length; i++) {
    localStorage.removeItem(LEGACY_TOKEN_KEYS[i])
  }
  localStorage.removeItem('streamlab_demo_user')
}
