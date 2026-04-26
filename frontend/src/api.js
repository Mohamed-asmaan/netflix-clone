const isDev = import.meta.env.DEV
/** Fallback if VITE_API_URL is unset. Prefer env; rename the Railway project for a neutral hostname. */
const productionApi = 'https://netflix-clone-production-291f.up.railway.app'
export const serverUrl = isDev ? '/api' : import.meta.env.VITE_API_URL || productionApi
