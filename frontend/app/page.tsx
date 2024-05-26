'use client'

import { useState } from 'react'

export default function Home() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl }),
      })

      if (!res.ok) {
        throw new Error('Failed to shorten URL')
      }

      const data = await res.json()
      setShortUrl(`${window.location.origin}/${data.shortUrl}`)
    } catch (error) {
      setError('Error shortening URL')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
  }

  const resetForm = () => {
    setLongUrl('')
    setShortUrl('')
    setError('')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Shortify</h1>
      {!shortUrl ? (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col items-center"
        >
          <input
            type="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter a URL to shorten"
            className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>
      ) : (
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="mt-4 flex items-center w-full">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="w-full p-2 border border-gray-300 rounded mr-2 text-black"
            />
            <button
              onClick={handleCopy}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Copy
            </button>
          </div>
          <button
            onClick={resetForm}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Shorten another URL
          </button>
        </div>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </main>
  )
}
