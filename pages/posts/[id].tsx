import connect from "../../lib/db";
import { ObjectId } from "mongodb";

export default function Post({ post }) {
  console.log(post);
  return (
    <h1>Post</h1>
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
    return {
      notFound: true,
    }
  }
}