import connect from "../../lib/db"
import ImageList from "../../components/ImageList";

export default function User({ posts }) {
  return (
    <>
      <h1>User</h1>
      <ImageList data={posts} />
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