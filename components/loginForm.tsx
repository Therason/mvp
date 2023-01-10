import { useEffect, useRef } from "react";
import { signIn, useSession } from "next-auth/react";

export default function LoginForm() {
  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!username.current || !password.current) return
    e.preventDefault()
    const result = await signIn('credentials', {
      redirect: false,
      username: username.current.value,
      password: password.current.value,
    })
    console.log(result)
  }

  const { data: session, status } = useSession()

  useEffect(() => {
    console.log(session)
    console.log(status)
  }, [status, session])

  return (
    <>
      <label>Username:
        <input type="text" ref={username}></input>
      </label>
      <label>Password:
        <input type="text" ref={password}></input>
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}