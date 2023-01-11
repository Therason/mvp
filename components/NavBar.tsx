import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import styled from "styled-components";

const Header = styled.header`
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  background: rgba(21,20,20,0.95);
  width: 100vw;
  max-width: 100%;
  height: 10vh;
  padding: 1rem;
  position: sticky;
  top: 0px;

  * {
    font-weight: bold;
  }

  a {
    font-size: 2.5rem;
    color: #f44250;
  }

  a:nth-child(2) {
    color: #fecc1b;
  }

  a:nth-child(3) {
    color: #3992ff;
  }


  button {
    background: none;
    color: #6bd968;
    font-size: 2.5rem;
    cursor: pointer;
    border: none;
  }
`;

const Home = styled(Link)``;

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <Header>
      <Home href="/">Home</Home>
      <Link href="/browse">Browse</Link>
      {/* Display correct button if user is logged in or not */}
      {!session && <Link href="/userAuth">Log In</Link>}
      {session && <Link href="/newPost">New Post</Link>}
      {session && <button onClick={() => signOut()}>Sign Out</button>}
    </Header>
  );
}