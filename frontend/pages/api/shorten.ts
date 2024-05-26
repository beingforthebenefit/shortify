import type { NextApiRequest, NextApiResponse } from 'next'

// Proxy request to backend
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  const backendUrl = process.env.API_URL + '/shorten' // URL to the backend service

  if (method === 'POST') {
    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error('Failed to shorten URL')
      }

      const data = await response.json()
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ message: (error as Error).message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
