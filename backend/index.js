const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
// so we can read { email, password } from the request body
app.use(express.json())

// Mock users (no database) — e.g. sign in: asmaan@gmail.com / asmaan123
let userList = [
  { name: 'Asmaan', email: 'asmaan@gmail.com', password: 'asmaan123' },
]

// when someone logs in we give them a token (a random-ish string)
// this object remembers: token string -> { email, name }
let loggedInUsers = {}

// make a new token without the crypto module — just time + random numbers
function makeToken() {
  return 't' + Date.now() + 'x' + Math.floor(Math.random() * 1e9)
}


// home
app.get('/', (req, res) => {
  res.json({ message: 'Netflix clone API' })
})

// For monitors / transparency (learning project)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', purpose: 'student-learning-api' })
})

// sign up: add a new user, then log them in
app.post('/signup', (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password

  if (name == null || name === '' || email == null || email === '' || password == null || password === '') {
    return res.status(400).json({ message: 'Name, email, and password are required' })
  }

  const emailLower = email.trim().toLowerCase()

  for (let i = 0; i < userList.length; i++) {
    if (userList[i].email === emailLower) {
      return res.status(409).json({ message: 'An account with this email already exists' })
    }
  }

  const newUser = {
    name: name.trim(),
    email: emailLower,
    password: password,
  }
  userList.push(newUser)

  const token = makeToken()
  loggedInUsers[token] = { email: newUser.email, name: newUser.name }

  res.status(201).json({
    message: 'Account created',
    token: token,
    user: { email: newUser.email, name: newUser.name },
  })
})

// log in: check email and password, then return a token
app.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (email == null || email === '' || password == null || password === '') {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const emailLower = email.trim().toLowerCase()

  let foundUser = null
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].email === emailLower && userList[i].password === password) {
      foundUser = userList[i]
      break
    }
  }

  if (foundUser == null) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  const token = makeToken()
  loggedInUsers[token] = { email: foundUser.email, name: foundUser.name }

  res.json({
    message: 'Login successful',
    token: token,
    user: { email: foundUser.email, name: foundUser.name },
  })
})

// log out: need a valid token in the header
app.post('/logout', (req, res) => {
  const header = req.headers.authorization
  if (header == null) {
    return res.status(401).json({ message: 'No token provided' })
  }
  if (header.indexOf('Bearer ') !== 0) {
    return res.status(401).json({ message: 'No token provided' })
  }
  // cut off "Bearer " (7 characters)
  const token = header.substring(7)
  if (loggedInUsers[token] == null) {
    return res.status(401).json({ message: 'Invalid or expired session' })
  }
  delete loggedInUsers[token]
  res.json({ message: 'Logged out' })
})

// dashboard: only if you send the right token
app.get('/dashboard', (req, res) => {
  const header = req.headers.authorization
  if (header == null) {
    return res.status(401).json({ message: 'No token provided' })
  }
  if (header.indexOf('Bearer ') !== 0) {
    return res.status(401).json({ message: 'No token provided' })
  }
  const token = header.substring(7)
  const user = loggedInUsers[token]
  if (user == null) {
    return res.status(401).json({ message: 'Invalid or expired session' })
  }
  res.json({
    message: 'OK',
    user: user,
  })
})

// Use 5000 so this app does not fight another tool on 3000. Override with: set PORT=3000
const port = process.env.PORT ? Number(process.env.PORT) : 5000
app.listen(port, () => {
  console.log('Server running on http://localhost:' + port)
})
