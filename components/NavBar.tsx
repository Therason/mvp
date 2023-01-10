import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import styled from "styled-components";

const Header = styled.header`
  display: inline-flex;
  gap: 20px;
  background: rgba(21,20,20,0.75);
  width: 100vw;
  max-width: 100%;
  height: 10vh;
  padding: 1rem;
  position: sticky;
  top: 0px;

  a {
    font-size: 2rem;
  }

  button {
    background: none;
    color: inherit;
    font-size: 2rem;
    cursor: pointer;
    border: none;
  }
`;

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <Header>
      <Link href="/">Art Block Avenue</Link>
      <Link href="/browse">Browse</Link>
      {/* Display correct button if user is logged in or not */}
      {!session && <Link href="/userAuth">Log In</Link>}
      {session && <Link href="/newPost">New Post</Link>}
      {session && <button onClick={() => signOut()}>Sign Out</button>}
    </Header>
  );
}