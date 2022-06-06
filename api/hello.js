import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

// It is important that the full path is specified here
app.post('/api/hello', function (req, res) {
  const { info } = req.body
  console.log(info)
  res
    .status(200)
    .json({ info })
    .end()
})

export default app
