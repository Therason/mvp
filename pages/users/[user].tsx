import connect from "../../lib/db"
import ImageList from "../../components/ImageList";
import { useRouter } from "next/router";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export default function User({ posts }) {
  const router = useRouter();
  return (
    <Container>
      <h1>{router.query.user}</h1>
      <ImageList data={posts} />
    </Container>
  )
}

export async function getServerSideProps(context) {
  const conn = await connect();
  const db = conn.db();

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

    return {
      props: {
        posts
      }
    }
  } catch {
    // 404 if post id isn't found
    conn.close();
    return {
      notFound: true,
    }
  }
}