import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px 200px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Img = styled(Image)`
  object-fit: cover;
  cursor: pointer;
`;

export default function ImageList({ data }) {
  const router = useRouter();

  // redirect to post
  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    router.push(`/posts/${(e.target as HTMLElement).id}`)
  }

  return (
    <Container>
      {data.map((post) => <Img width="200" height="200" onClick={handleClick} id={post._id} key={post._id} src={post.url} alt={post.description} />)}
    </Container>
  );
}