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

## Project layout

```
netflix/
├── backend/     Express server (`index.js`)
└── frontend/    React app (Vite)
```

## Disclaimer

This repository is for **educational purposes**. The visual design is inspired by Netflix; it is not affiliated with or endorsed by Netflix. User data is held in process memory and resets when the server restarts—**do not** use this auth pattern for real user accounts without a database, password hashing, and proper security hardening.

## License

Add a license if you open-source this repository (e.g. MIT).
