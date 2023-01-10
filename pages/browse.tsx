import ImageList from "../components/ImageList";

export default function Browse({ data }) {
  return (
    <>
      <h1>Browse</h1>
      <ImageList data={data} />
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