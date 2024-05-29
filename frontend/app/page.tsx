'use client'

import {useState} from 'react'
import {QRCodeCanvas} from 'qrcode.react'

export default function Home() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [qrSize, setQrSize] = useState(128)
  const [qrBgColor, setQrBgColor] = useState('#ffffff')
  const [qrFgColor, setQrFgColor] = useState('#000000')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setCopied(false)
    setShowQRCode(false)

    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({longUrl}),
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
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const resetForm = () => {
    setLongUrl('')
    setShortUrl('')
    setError('')
    setCopied(false)
    setShowQRCode(false)
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
              {copied ? '✓' : 'Copy'}
            </button>
          </div>
          <button
            onClick={() => setShowQRCode(!showQRCode)}
            className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded"
          >
            {showQRCode ? 'Hide QR Code' : 'Show QR Code'}
          </button>
          {showQRCode && (
            <div className="mt-4 flex flex-col items-center">
              <QRCodeCanvas
                value={shortUrl}
                size={qrSize}
                bgColor={qrBgColor}
                fgColor={qrFgColor}
              />
              <div className="mt-4 flex flex-col items-center">
                <label className="mb-2">
                  Size:
                  <input
                    type="number"
                    value={qrSize}
                    onChange={(e) => setQrSize(Number(e.target.value))}
                    className="ml-2 p-1 border border-gray-300 rounded text-black"
                    min="64"
                    max="512"
                  />
                </label>
                <label className="mb-2">
                  Background Color:
                  <input
                    type="color"
                    value={qrBgColor}
                    onChange={(e) => setQrBgColor(e.target.value)}
                    className="ml-2 p-1 border border-gray-300 rounded"
                  />
                </label>
                <label className="mb-2">
                  Foreground Color:
                  <input
                    type="color"
                    value={qrFgColor}
                    onChange={(e) => setQrFgColor(e.target.value)}
                    className="ml-2 p-1 border border-gray-300 rounded"
                  />
                </label>
              </div>
            </div>
          )}
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
