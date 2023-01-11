import connect from "../../lib/db";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";

export default function Post({ post }) {
  return (
    <>
      <h1>Post</h1>
      <Link href={`/users/${post.username}`}>{post.username}</Link>
      <Image src={post.url} alt={post.description} width={800} height={800} style={{objectFit: 'contain'}}/>
      <p>{post.description}</p>
    </>
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