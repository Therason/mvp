import { useState } from "react"
import SignupForm from "../components/signupForm"
import LoginForm from "../components/loginForm";
import styled from "styled-components";

const Container = styled.div`
  width: 30vw;
  min-width: 300px;
  border: 1px solid gray;
  margin: 20px 50px;
`;

// component for logging in and signing up
export default function UserAuth() {
  const [ login, setLogin ] = useState(true);

  if (login) {
    return (
      <Container>
        <h1>Login</h1>
        <LoginForm />
        <button onClick={() => setLogin(false)}>Don&apos;t have an account?</button>
      </Container>
    )
  }

  return (
    <Container>
      <h1>Sign Up</h1>
      <SignupForm />
      <button onClick={() => setLogin(true)}>Have an account already?</button>
    </Container>
  )
}