import { useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignupForm() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const router = useRouter();

  // POST to API endpoint
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!username.current || !password.current) return;
    const enteredUser = username.current.value
    const enteredPass = password.current.value

    // TODO: better form validation
    if (enteredPass.length < 8 || enteredUser.length === 0) {
      alert('Please enter a username and secure password');
      return;
    };

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
      alert('Username taken!');
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
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}