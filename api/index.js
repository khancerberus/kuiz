import express from 'express'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json('Hello World')
})

app.post('/hello', (req, res) => {
  console.log(req.body)
  return res.json({ received: req.body })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
