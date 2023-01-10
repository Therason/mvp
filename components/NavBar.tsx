import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <header style={{display: 'inline-flex', gap: '10px'}}>
      <Link href="/">Art Block Avenue</Link>
      <Link href="/browse">Browse</Link>
      {/* Display correct button if user is logged in or not */}
      {!session && <Link href="/userAuth">Log In</Link>}
      {session && <Link href="/newPost">New Post</Link>}
      {session && <button onClick={() => signOut()}>Sign Out</button>}
    </header>
  );
}