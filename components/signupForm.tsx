import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignupForm() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [ validUsername, setValidUsername ] = useState<boolean>(true);
  const [ validPass, setValidPass ] = useState<boolean>(true);
  const [ notTaken, setNotTaken ] = useState<boolean>(true);

  const router = useRouter();

  // POST to API endpoint
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setValidPass(true);
    setValidUsername(true);
    setNotTaken(true);

    if (!username.current || !password.current) return;
    const enteredUser = username.current.value
    const enteredPass = password.current.value

    // basic form validation
    if (enteredUser.length === 0) {
      setValidUsername(false);
      return;
    }
    if (enteredPass.length < 8) {
      setValidPass(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ username: enteredUser, password: enteredPass }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error creating a user')
      }

      // auto sign-in
      const result = await signIn('credentials', {
        redirect: false,
        username: username.current.value,
        password: password.current.value,
      });
      if (!result.error && result.ok) {
        router.push('/')
      };
    } catch {
      // user likely already exists(?)
      setNotTaken(false);
    }
  }

  return (
    <>
      <label>Username:
        <input type="text" ref={username}></input>
      </label>
      {!validUsername && <p style={{ color: '#f44250' }}>Please enter a username!</p>}
      {!notTaken && <p style={{ color: '#f44250' }}>Username taken!</p>}
      <label>Password:
        <input type="password" ref={password}></input>
      </label>
      {!validPass && <p style={{ color: '#f44250' }}>Password must be at least 8 characters!</p>}
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}