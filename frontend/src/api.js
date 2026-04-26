// In dev, use '/api' so Vite can proxy to the backend (see vite.config.js). Otherwise use direct URL.
const isDev = import.meta.env.DEV
export const serverUrl = isDev ? '/api' : import.meta.env.VITE_API_URL || 'http://localhost:5000'
