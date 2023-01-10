import { useRouter } from "next/router";
import Image from "next/image";

export default function ImageList({ data }) {
  const router = useRouter();

  // redirect to post
  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    router.push(`/posts/${(e.target as HTMLElement).id}`)
  }

  return (
    <>
      {data.map((post) => <Image onClick={handleClick} id={post._id} key={post._id} src={post.url} alt={post.description} width="400" height="400" style={{objectFit: 'cover'}} />)}
    </>
  );
}