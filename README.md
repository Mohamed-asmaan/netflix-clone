# Netflix UI Clone — React & Express

A full-stack learning project: a **Netflix-inspired** streaming-style interface with sign up, sign in, and a protected browse dashboard. The API uses Express with in-memory users and simple token-based sessions (not for production use).

## Features

- **Auth**: Register, log in, log out; session tokens stored in memory on the server
- **Browse UI**: Hero banner, movie-style rows, navbar and footer in a dark streaming aesthetic
- **Stack**: React 19, Vite, Tailwind CSS, React Router, Axios · Express 5, CORS

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)

## Run locally

### 1. Backend (API)

```bash
cd backend
npm install
node index.js
```

Or from the repo root: `node backend/index.js` (if you already ran `cd backend` + `npm install` once).

Default URL: [http://localhost:5000](http://localhost:5000)  
Override port: `set PORT=3000` (Windows) or `export PORT=3000` (macOS/Linux).

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually [http://localhost:5173](http://localhost:5173)).

In development, the app calls `/api/...` and Vite **proxies** those requests to the backend (see `frontend/vite.config.js`). Run both servers for sign up, login, and the dashboard to work.

### Production build

Set `VITE_API_URL` to your deployed API base URL (no trailing `/api` suffix; the app uses the same paths as the Express routes). Build the client:

```bash
cd frontend
npm run build
npm run preview
```

## API overview

| Method | Path         | Description                          |
|--------|--------------|--------------------------------------|
| GET    | `/`          | Health: API name message             |
| POST   | `/signup`    | Body: `name`, `email`, `password`    |
| POST   | `/login`     | Body: `email`, `password`            |
| POST   | `/logout`    | Header: `Authorization: Bearer <token>` |
| GET    | `/dashboard` | Header: `Authorization: Bearer <token>` |

## Deploy API to Railway (no Docker)

This repo is a **monorepo** (`backend/` and `frontend/`). Railway’s builder looks at the folder you set as the **root** of the service. It must be **`backend`**, or the build fails (“cannot find a build plan”).

1. In Railway: open your service → **Settings** → **Root directory** → set to **`backend`** (or use the “Set root directory” button on the error screen).
2. **Start command** can stay the default: **`npm start`** (from `backend/package.json`, runs `node index.js`). Railway will set the **`PORT`** environment variable; the server already uses it.
3. Deploy, then copy the public **API URL** (e.g. `https://xxxx.up.railway.app`).

**Connect the Vercel frontend:** in the Vercel project → **Settings** → **Environment variables**, add:

- **`VITE_API_URL`** = your full Railway API URL (**no** trailing slash, **no** `/api` on the end)

Redeploy the frontend so the build picks up the variable.

Health check: open `GET /` on your deployed API in the browser — you should see JSON from the service.

## Project layout

```
netflix/
├── package.json   Optional helper at repo root (local use)
├── backend/       Express API — **use this as Railway “root directory”**
└── frontend/      React app (Vite) — e.g. deploy on Vercel
```

## Disclaimer

This repository is for **educational purposes**. The visual design is inspired by Netflix; it is not affiliated with or endorsed by Netflix. User data is held in process memory and resets when the server restarts—**do not** use this auth pattern for real user accounts without a database, password hashing, and proper security hardening.

## License

Add a license if you open-source this repository (e.g. MIT).
