import { useSession, signIn, signOut } from "next-auth/react"

export default function SignInOut() {
  const { data: session } = useSession()

  if (session) {
    console.log(session)
    return (
      <>
        <h1>hi {session.user?.name}</h1>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}