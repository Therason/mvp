import { useState } from "react"
import SignupForm from "../components/signupForm"
import LoginForm from "../components/loginForm";

// component for logging in and signing up
export default function UserAuth() {
  const [ login, setLogin ] = useState(true);

  if (login) {
    return (
      <>
        <h1>Login</h1>
        <LoginForm />
        <button onClick={() => setLogin(false)}>Don&apos;t have an account?</button>
      </>
    )
  }

  return (
    <>
      <h1>Sign Up</h1>
      <SignupForm />
      <button onClick={() => setLogin(true)}>Have an account already?</button>
    </>
  )
}