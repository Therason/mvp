import connect from "../../lib/db"
import ImageList from "../../components/ImageList";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useSession, getSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

const Container = styled.div`
  padding: 20px 20vw 0;
  display: inline-flex;
  width: 100vw;
  max-width: 100%;
  justify-content: space-between;
  gap: space-between;

  div {
    display: inline-flex;
    gap: 1rem;
  }

  h1 {
    cursor: pointer;
  }
`;

export default function User({ posts, saved }) {
  const router = useRouter();
  const {data: session} = useSession();

  const [images, setImages] = useState(posts);

  // user is looking at their own profile
  if (session && session.user.username === router.query.user) {
    console.log('posts:',posts)
    console.log('saved:',saved)
    return (
      <>
        <Container>
          <div><Image src="/user.svg" width="30" height="30" alt="profile" /> <h1 onClick={() => setImages(posts)}>{router.query.user}</h1></div>
          <h1 onClick={() => setImages(saved)}>saved</h1>
        </Container>
        <ImageList data={images} />
      </>
    )
  }

  return (
    <>
      <Container>
        <div><Image src="/user.svg" width="30" height="30" alt="profile" /> <h1>{router.query.user}</h1></div>
      </Container>
      <ImageList data={posts} />
    </>
  )
}

export async function getServerSideProps(context) {
  const conn = await connect();
  const db = conn.db();

  const session = await getSession(context);

  try {
    // make sure user exists
    const user = await db.collection("users").findOne({ username: context.params.user });
    if (!user) throw new Error();

    // query posts (_id has to be converted to a string)
    const posts = (await db.collection("posts").find({ username: context.params.user })
      .sort({ _id: -1 })
      .toArray())
      .map((post) => {
        return {
          ...post,
          _id: post._id.toString(),
        }
      });

    // retrieve saved posts if user is on their own profile
    if (session && session.user.username === context.params.user) {
      const user = await db.collection("users").findOne({ username: session.user.username });

      // "merge" post ids with actual posts
      const saved = !user.saved ? [] : await Promise.all(user.saved.map(async (id) => {
        const post = await db.collection("posts").findOne({ _id: id });
        return {
          ...post,
          _id: post._id.toString(),
        }
      }).reverse());

      return {
        props: {
          posts,
          saved
        }
      }
    }

    return {
      props: {
        posts
      }
    }
  } catch(error) {
    // 404 if post id isn't found
    console.error(error)
    return {
      notFound: true,
    }
  }
}