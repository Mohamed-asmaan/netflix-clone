const isDev = import.meta.env.DEV
const productionApi = 'https://netflix-clone-production-291f.up.railway.app'
export const serverUrl = isDev ? '/api' : import.meta.env.VITE_API_URL || productionApi
