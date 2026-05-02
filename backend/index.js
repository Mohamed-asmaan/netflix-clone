const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

let userList = [
  { name: 'Demo User', email: 'demo@example.com', password: 'StreamDemo#9' },
]

let loggedInUsers = {}

/** One active session per email — old tokens stop working after a new login. */
function revokeSessionsForEmail(emailLower) {
  const keys = Object.keys(loggedInUsers)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (loggedInUsers[key].email === emailLower) {
      delete loggedInUsers[key]
    }
  }
}

function readBearerToken(req) {
  const header = req.headers.authorization
  if (header == null || typeof header !== 'string') {
    return null
  }
  const match = header.match(/^Bearer\s+(\S+)/i)
  return match ? match[1] : null
}

function makeToken() {
  return 't' + Date.now() + 'x' + Math.floor(Math.random() * 1e9)
}

app.get('/', (req, res) => {
  res.json({ message: 'StreamCove API' })
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

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

  revokeSessionsForEmail(newUser.email)
  const token = makeToken()
  loggedInUsers[token] = { email: newUser.email, name: newUser.name }

  res.status(201).json({
    message: 'Account created',
    token: token,
    user: { email: newUser.email, name: newUser.name },
  })
})

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

  revokeSessionsForEmail(foundUser.email)
  const token = makeToken()
  loggedInUsers[token] = { email: foundUser.email, name: foundUser.name }

  res.json({
    message: 'Login successful',
    token: token,
    user: { email: foundUser.email, name: foundUser.name },
  })
})

app.post('/logout', (req, res) => {
  const token = readBearerToken(req)
  if (token == null || token === '') {
    return res.status(401).json({ message: 'No token provided' })
  }
  if (loggedInUsers[token] == null) {
    return res.status(204).send()
  }
  delete loggedInUsers[token]
  res.json({ message: 'Logged out' })
})

app.get('/dashboard', (req, res) => {
  const token = readBearerToken(req)
  if (token == null || token === '') {
    return res.status(401).json({ message: 'No token provided' })
  }
  const user = loggedInUsers[token]
  if (user == null) {
    return res.status(401).json({ message: 'Invalid or expired session' })
  }
  res.json({
    message: 'OK',
    user: user,
  })
})

const port = process.env.PORT ? Number(process.env.PORT) : 5000
app.listen(port, () => {
  console.log('Server running on http://localhost:' + port)
})
