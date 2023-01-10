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
        {/* Display correct button if user is logged in or not */}
        {/* TODO: Move this stuff to a layout component */}
        {!session && <Link href="/userAuth">Log In</Link>}
        {session && (
          <>
            <Link href="/browse">Browse</Link>
            <Link href="newPost">New Post</Link>
            <button onClick={() => signOut()}>Sign Out</button>
          </>
        )}

        <div>
          <h1>Art Block Avenue</h1>
          <p>A place for artists of all kinds to share their works</p>
        </div>
      </main>
    </>
  )
}
