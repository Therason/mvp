import { useRef } from "react";

export default function LoginForm() {
  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  return (
    <>
      <label>Username:
        <input type="text" ref={username}></input>
      </label>
      <label>Password:
        <input type="text" ref={password}></input>
      </label>
      {/* <button onClick={handleSubmit}>Submit</button> */}
    </>
  )
}