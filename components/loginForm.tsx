import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginForm() {
  const router = useRouter()

  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)

  const [ valid, setValid ] = useState<boolean>(true);

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

    // redirect on success
    if (!result.error && result.ok) {
      router.push('/')
    } else {
      // TODO: alert user of invalid credentials
      setValid(false);
    }

  }

  return (
    <>
      <label>Username:
        <input type="text" ref={username}></input>
      </label>
      <label>Password:
        <input type="password" ref={password}></input>
      </label>
      {!valid && <p style={{ color: '#f44250' }}>Invalid credentials!</p>}
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}