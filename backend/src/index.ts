import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Shortify API is running')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
