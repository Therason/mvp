import { MouseEventHandler, useRef } from "react";

export default function SignupForm() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  // POST to API endpoint
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!username.current || !password.current) return;
    const enteredUser = username.current.value
    const enteredPass = password.current.value

    // TODO: better form validation
    if (enteredPass.length < 8 || enteredUser.length === 0) return;

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
      console.log(data);
    } catch(error) {
      console.error(error);
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