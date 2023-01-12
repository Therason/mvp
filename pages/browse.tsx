import ImageList from "../components/ImageList";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export default function Browse({ data }) {
  return (
    <Container>
      <h1>Browse</h1>
      <ImageList data={data} />
    </Container>
  )
}

// SSR page since posts need to be up to date
export async function getServerSideProps() {
  // fetch posts
  const res = await fetch(`${process.env.URL}/api/getPosts`);
  const { data } = await res.json();

  return { props: { data } };
}