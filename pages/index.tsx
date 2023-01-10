import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
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
        {/* Display correct button if user is logged in or not */}
        {!session && <Link href="/userAuth">Log In</Link>}
        {session && <button onClick={() => signOut()}>Sign Out</button>}
      </main>
    </>
  )
}
