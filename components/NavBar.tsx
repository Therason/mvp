import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import styled from "styled-components";

const Header = styled.header`
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(21,20,20);
  width: 100vw;
  max-width: 100%;
  height: 10vh;
  padding: 1rem;
  z-index: 100;
  position: sticky;
  top: 0px;
  overflow: hidden;

  * {
    position: relative;
    font-weight: bold;
    padding: 0.5rem 1rem;
  }

  *:after {
    content: "";
    font-size: 3rem;
    text-align: right;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #2f2c2cf2;
    z-index: -1;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.2s linear;
  }

  *:hover:after {
    transform: scaleX(1);
    transform-origin: left;
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

  .last {
    margin-left: auto;
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
  const router = useRouter();

  return (
    <Header>
      <Home href="/">Home</Home>
      <Link href="/browse">Browse</Link>
      {/* Display correct button if user is logged in or not */}
      {!session && <Link className="last" href="/userAuth">Log In</Link>}
      {session && <Link href="/newPost">New Post</Link>}
      {session && <Link className="last" href={`/users/${session.user.username}`}>Profile</Link>}
    </Header>
  );
}