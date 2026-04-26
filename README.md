# Netflix UI Clone — React & Express

Full-stack app with a Netflix-inspired streaming-style UI: sign up, sign in, and a protected browse view. Express holds users in memory with simple token sessions (for demos, not production).

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

Set `VITE_API_URL` to your deployed API origin (no `/api` suffix). Then:

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

- **API (Railway):** set the service **root directory** to `backend` so the build finds `package.json`. Start command: `npm start` (`node index.js`). Railway provides `PORT`.
- **Frontend (Vercel):** set env **`VITE_API_URL`** to your public Railway URL (no trailing slash, no `/api` suffix), then redeploy. `frontend/vercel.json` rewrites to `index.html` so deep links and refresh on routes like `/dashboard` load the SPA.

## Layout

```
netflix/
├── backend/    Express API
└── frontend/   React (Vite)
```

## Disclaimer

For learning only. Not affiliated with Netflix. In-memory auth resets on restart; use a database, hashing, and proper security for real users.

## License

MIT
