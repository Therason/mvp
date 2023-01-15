import ScrollList from "../components/ScrollList";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Browse({ data }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const background = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ['#f44250', '#fecc1b', '#6bd968', '#3992ff'])

  return (
    <motion.div ref={ref} style={{ background }}>
      <ScrollList data={data} />
    </motion.div>
  )
}

// SSR page since posts need to be up to date
export async function getServerSideProps() {
  // fetch posts
  const res = await fetch(`${process.env.URL}/api/getPosts`);
  const { data } = await res.json();

  return { props: { data } };
}