const express = require('express')
const users = require('./users.json')
const JWT = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
const PORT = 3000
const SECRET = 'shhhh'

app.use(express.json())
app.use(cookieParser())
// app.use(cors())
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}))

app.post('/auth/login', (req, res) => {
  const dataEmail = 'asdf1234@gmail.com'
  const dataPassword = 'asdf1234'
  const email = req.body.email
  const password = req.body.password
  if(email !== dataEmail || password !== dataPassword) {
    throw new Error('Account infomation not vaild')
  }

  const payload = {
    email: email
  }

  const token = JWT.sign(payload, SECRET)
  res.cookie('access_token', token, {
    maxAge: 3600,
    httpOnly: true,
    // secure: true
  })
  res.status(200).json(true)
})


app.use('/api/users', (req, res) => {
  const token = req.cookies.access_token
  console.log(token)
  try {
    const decoded = JWT.verify(token, SECRET)
    console.log(decoded)
  } catch(err) {
    res.status(400)
    throw err
  }
  res.status(200).json(users)
})

app.use((err, req, res, next) => {
  res.json(err)
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})