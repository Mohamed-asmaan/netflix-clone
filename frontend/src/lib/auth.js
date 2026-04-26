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
  if (token != null && token !== '') {
    localStorage.setItem(TOKEN_KEY, token)
  }
  if (user != null) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  for (let i = 0; i < LEGACY_TOKEN_KEYS.length; i++) {
    localStorage.removeItem(LEGACY_TOKEN_KEYS[i])
  }
  localStorage.removeItem('streamlab_demo_user')
}
