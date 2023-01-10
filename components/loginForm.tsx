import { useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginForm() {
  const router = useRouter()

  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: alert user that the fields are required
    if (!username.current || !password.current) return
    e.preventDefault()

    // attempt to sign in using provided credentials
    const result = await signIn('credentials', {
      redirect: false,
      username: username.current.value,
      password: password.current.value,
    })
    console.log('result', result)

    // redirect on success
    if (!result.error && result.ok) {
      router.push('/')
    }

    // TODO: alert user of invalid credentials
    console.error(result.error)
  }

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