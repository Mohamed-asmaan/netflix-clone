# StreamCove — React & Express

Full-stack app with a streaming-style UI: sign up, sign in, and a protected browse view. Express holds users in memory with simple token sessions (for demos, not production).

## Features

- **Auth**: Register, log in, log out; tokens stored in memory on the server
- **Browse UI**: Hero banner, carousels, navbar and footer
- **Stack**: React 19, Vite, Tailwind CSS, React Router, Axios · Express 5, CORS

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS)

## Run locally

### Backend (API)

```bash
cd backend
npm install
node index.js
```

Default: [http://localhost:5000](http://localhost:5000) — set `PORT` to override (e.g. `set PORT=3000` on Windows).

### Frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually [http://localhost:5173](http://localhost:5173)).

The dev server proxies `/api` to the backend (`frontend/vite.config.js`). Run both processes for full auth and browse.

**Pre-seeded login (in-memory, resets when the server restarts):** `demo@example.com` / `StreamDemo#9`

### Production build

Set **`VITE_APP_URL`** to your Vercel origin (e.g. `https://streamcove.vercel.app`, no trailing slash) and **`VITE_API_URL`** to your deployed API origin (no `/api` suffix). Then:

```bash
cd frontend
npm run build
npm run preview
```

## API

| Method | Path         | Description                          |
|--------|--------------|--------------------------------------|
| GET    | `/`          | Health / API name                    |
| POST   | `/signup`    | Body: `name`, `email`, `password`    |
| POST   | `/login`     | Body: `email`, `password`            |
| POST   | `/logout`    | Header: `Authorization: Bearer <token>` |
| GET    | `/dashboard` | Header: `Authorization: Bearer <token>` |
| GET    | `/health`    | Simple status                        |

## Deploy (Railway + Vercel)

**Production app:** [https://streamcove.vercel.app](https://streamcove.vercel.app)

- **API (Railway):** set the service **root directory** to `backend` so the build finds `package.json`. Start command: `npm start` (`node index.js`). Railway provides `PORT`. For a neutral hostname, rename the Railway project and update `VITE_API_URL` in Vercel.
- **Frontend (Vercel):** set **`VITE_APP_URL`** to `https://streamcove.vercel.app` (no trailing slash) and **`VITE_API_URL`** to `https://streamcove-production.up.railway.app` (no trailing slash, no `/api` suffix), then redeploy. `frontend/vercel.json` rewrites to `index.html` so deep links and refresh on routes like `/dashboard` load the SPA.

### Chrome “Dangerous site” / Google Safe Browsing

That interstitial is **not** a build bug: Google’s [Safe Browsing](https://safebrowsing.google.com/) can flag any page that *looks* like a credential or payment phishing flow (a streaming-style UI plus sign-in is a common false positive on shared hosts like `*.vercel.app`).

**What to do (fastest first):**

1. Check status: [Google Safe Browsing transparency report for your URL](https://transparencyreport.google.com/safe-browsing/search?url=streamcove.vercel.app).
2. If it is a mistake, use Google’s [incorrect phishing warning](https://safebrowsing.google.com/safebrowsing/report_error/?url=https://streamcove.vercel.app/) form (or report through [Search Console](https://search.google.com/search-console) if the property is verified).
3. Add a **custom domain** on Vercel and point the app there: shared `vercel.app` subdomains are sometimes hit in bulk by abuse, which raises false-positive risk.
4. After changing copy and redeploying, re-request a review; clearing the flag is on Google’s side, usually within a few **hours to days** after a successful review.

## Layout

```
netflix/   (repo folder name; app brand is StreamCove)
├── backend/    Express API
└── frontend/   React (Vite)
```

## Disclaimer

For learning only. Fictional brand; not a commercial streaming product. In-memory auth resets on restart; use a database, hashing, and proper security for real users.

## License

MIT
