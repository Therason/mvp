import { useState } from "react"
import SignupForm from "../components/signupForm"
import LoginForm from "../components/loginForm";
import styled from "styled-components";

const Container = styled.div`
  width: 30vw;
  min-width: 300px;
  height: 70vh;
  padding: 10px 20px;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 20px 50px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  background: rgb(32, 30, 30);

  p {
    cursor: pointer;
    width: fit-content;
    padding: 5px 10px;
  }

  button {
    margin-top: auto;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    width: fit-content;
    font-size: 1rem;
    padding: 5px 10px;
  }

  button:hover, p:hover {
    background: #3a3737;
    border-radius: 5px;
  }

  input {
    background: none;
    border: none;
    border-bottom: 1px solid gray;
    color: inherit;
  }

  input:focus {
    outline-width: 0;
  }
`;

// component for logging in and signing up
export default function UserAuth() {
  const [ login, setLogin ] = useState(true);

  if (login) {
    return (
      <Container>
        <h1>Login</h1>
        <LoginForm />
        <p onClick={() => setLogin(false)}>Don&apos;t have an account?</p>
      </Container>
    )
  }

  return (
    <Container>
      <h1>Sign Up</h1>
      <SignupForm />
      <p onClick={() => setLogin(true)}>Have an account already?</p>
    </Container>
  )
}