import { useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import { MotionValue, useScroll, useTransform, motion } from "framer-motion";

const Container = styled.div`
  margin: 20px 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Sec = styled.section`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  position: relative;
  scroll-snap-align: center;
  perspective: 500px;

  h1 {
    font-size: 3rem;
    cursor: pointer;
  }

  img {
    object-fit: cover;
    cursor: pointer;
  }
`;

function ImageContainer({id, url, description, user}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  const router = useRouter();

  return (
    <Sec>
      <div ref={containerRef}>
        <Image onClick={() => router.push(`/posts/${id}`)} width="300" height="300" id={id} key={id} src={url} alt={description} />
      </div>
      <motion.h1 style={{ y }} onClick={() => router.push(`/users/${user}`)}>{user}</motion.h1>
    </Sec>
  );
}

export default function ScrollList({ data }) {
  return (
    <Container>
      {data.map((post, i: number) => {
        return <ImageContainer id={post._id} key={post._id} url={post.url} description={post.description} user={post.username} />
      })}
    </Container>
  );
}
