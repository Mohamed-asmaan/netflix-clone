// Dev: Vite proxy → backend (see vite.config.js). Prod: Railway API (also in frontend/.env.production).
// Frontend live: https://netflix-clone-beta-jade.vercel.app
const isDev = import.meta.env.DEV
const productionApi = 'https://netflix-clone-production-291f.up.railway.app'
export const serverUrl = isDev ? '/api' : import.meta.env.VITE_API_URL || productionApi
