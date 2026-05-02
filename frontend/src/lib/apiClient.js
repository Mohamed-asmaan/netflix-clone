import axios from 'axios'
import { serverUrl } from '../api'
import { clearSession, getToken } from './auth'

/**
 * One shared client for the Express API. Attaches Bearer token when present.
 * If the dashboard gets 401 (bad or expired token), we clear local storage and send the user to login.
 */
export const apiClient = axios.create({
  baseURL: serverUrl,
  timeout: 20000,
})

apiClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const path = window.location.pathname
      if (path === '/dashboard') {
        clearSession()
        window.location.replace('/login')
      }
    }
    return Promise.reject(error)
  }
)
