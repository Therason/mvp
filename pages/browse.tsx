import Image from "next/image";
import { useRouter } from "next/router";

export default function Browse({ data }) {
  const router = useRouter();

  // redirect to post
  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    router.push(`/posts/${(e.target as HTMLElement).id}`)
  }

  return (
    <>
      <h1>Browse</h1>
      {data.map((post) => <Image onClick={handleClick} id={post._id} key={post._id} src={post.url} alt={post.description} width="400" height="400" style={{objectFit: 'cover'}} />)}
    </>
  )
}

// SSR page since posts need to be up to date
export async function getServerSideProps() {
  // fetch posts
  const res = await fetch(`${process.env.URL}/api/getPosts`);
  const { data } = await res.json();

  return { props: { data } };
}