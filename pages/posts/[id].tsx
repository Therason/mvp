import connect from "../../lib/db";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  display: inline-flex;
  gap: 10px;
  margin: 20px 40px;

  img {
    background: #353333;
  }
`;

export default function Post({ post }) {
  return (
    <Container>
      <Image src={post.url} alt={post.description} width={500} height={500} style={{objectFit: 'contain'}}/>
      <div>
        <Link href={`/users/${post.username}`}>{post.username}</Link>
        <p>{post.description}</p>
      </div>
    </Container>
  );
}

// can't use getStaticPaths since posts update frequently
export async function getServerSideProps(context) {
  const conn = await connect();
  const db = conn.db();

  try {
    // context params can be used to find the dynamic route
    const post = await db.collection("posts").findOne({_id: new ObjectId(context.params.id)});
    conn.close();

    // id has to be converted to string
    return {
      props: {
        post: {
          ...post,
          _id: post._id.toString()
        }
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