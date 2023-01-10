import connect from "../../lib/db"
import Image from "next/image";
import { useRouter } from "next/router";

export default function User({ posts }) {
  const router = useRouter();

  // redirect to post
  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    router.push(`/posts/${(e.target as HTMLElement).id}`)
  }

  return (
    <>
      <h1>User</h1>
      {posts.map((post) => <Image onClick={handleClick} id={post._id} key={post._id} src={post.url} alt={post.description} width="400" height="400" style={{objectFit: 'cover'}} />)}
    </>
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
    const posts = (await db.collection("posts").find({ username: context.params.user }).toArray()).map((post) => {
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