const express = require('express')
const app = express()
const port = 3001

app.post('/sign-in', (req, res) => {
  res.send('/sign-in')
})

app.post('/sign-up', (req, res) => {
  res.send('/sign-up')
})

app.post('/posts', (req, res) => {
  res.send('POST /posts')
})

app.get('/posts', (req, res) => {
  res.send('GET /posts')
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})