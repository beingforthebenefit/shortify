import {GetServerSideProps} from 'next'
import {useEffect} from 'react'

interface RedirectPageProps {
  longUrl: string
}

const RedirectPage = ({longUrl}: RedirectPageProps) => {
  useEffect(() => {
    if (longUrl) {
      window.location.href = longUrl
    }
  }, [longUrl])

  return <div>Redirecting...</div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {shortUrl} = context.params as {shortUrl: string}
  const backendUrl = `http://backend:5000/${shortUrl}`

  const res = await fetch(backendUrl)
  if (!res.ok) {
    return {
      notFound: true,
    }
  }

  const data = await res.json()
  return {
    props: {
      longUrl: data.longUrl,
    },
  }
}

export default RedirectPage
