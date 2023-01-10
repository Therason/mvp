import Image from "next/image";

export default function Browse({ data }) {
  console.log(data)
  return (
    <>
      <h1>Browse</h1>
      {data.map((post) => <Image key={post._id} src={post.url} alt={post.description} width="400" height="400" style={{objectFit: 'cover'}} />)}
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