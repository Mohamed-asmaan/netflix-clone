// Dev: Vite proxy → backend (see vite.config.js). Prod: Railway API (also in frontend/.env.production).
// Frontend live: https://netflix-clone-sandy-pi-24.vercel.app
const isDev = import.meta.env.DEV
const productionApi = 'https://netflix-clone-production-c582.up.railway.app'
export const serverUrl = isDev ? '/api' : import.meta.env.VITE_API_URL || productionApi
