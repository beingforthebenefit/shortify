import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
const PORT = process.env.PORT || 5000
const prisma = new PrismaClient()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Shortify API is running')
})

app.post('/shorten', async (req, res) => {
  const { longUrl } = req.body
  const shortUrl = generateShortUrl() // Implement this function
  const newUrl = await prisma.url.create({
    data: { longUrl, shortUrl },
  })
  res.json(newUrl)
})

app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params
  const url = await prisma.url.findUnique({
    where: { shortUrl },
  })
  if (url) {
    res.redirect(url.longUrl)
  } else {
    res.status(404).send('URL not found')
  }
})

function generateShortUrl() {
  return Math.random().toString(36).substring(2, 8)
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
