import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect } from 'react'

// homepage component
export default function Home() {
  // user session data
  const {data: session, status} = useSession()

  // useEffect(() => {
  //   console.log('session', session)
  //   console.log(status)
  // }, [session, status])

  return (
    <>
      <main>
        <div>
          <h1>Art Block Avenue</h1>
          <p>A place for artists of all kinds to share their works</p>
        </div>
      </main>
    </>
  )
}
