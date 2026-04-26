const isDev = import.meta.env.DEV
/** Public site origin (Vercel). Used for meta / links; set VITE_APP_URL in production. */
const defaultAppUrl = 'https://streamcove.vercel.app'
export const appUrl = (import.meta.env.VITE_APP_URL || defaultAppUrl).replace(/\/$/, '')

/** Fallback if VITE_API_URL is unset. */
const productionApi = 'https://netflix-clone-production-291f.up.railway.app'
export const serverUrl = isDev ? '/api' : import.meta.env.VITE_API_URL || productionApi
