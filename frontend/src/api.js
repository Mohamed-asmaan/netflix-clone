const isDev = import.meta.env.DEV
/** Public site origin (Vercel). Used for meta / links; set VITE_APP_URL in production. */
const defaultAppUrl = 'https://streamcove.vercel.app'
export const appUrl = (import.meta.env.VITE_APP_URL || defaultAppUrl).replace(/\/$/, '')

/** Fallback if VITE_API_URL is unset. */
const productionApi = 'https://streamcove-production.up.railway.app'
export const serverUrl = isDev ? '/api' : import.meta.env.VITE_API_URL || productionApi

/**
 * When signup/login show an error but the password was fine — the browser never
 * reached the API (Wi-Fi, VPN, ad blocker, Chrome "Dangerous site", office firewall).
 */
export function friendlyNetworkError() {
  return (
    'Your device blocked the connection to the API (not a wrong password). ' +
    'Try: phone hotspot, another browser, pause ad-blocker/VPN, or in Chrome use Details -> visit site. ' +
    'School/office networks often block *.railway.app.'
  )
}
