import styled from "styled-components";
import { keyframes } from "styled-components";
import Image from "next/image";
import { Rowdies } from "@next/font/google";
import { Roboto_Mono } from "@next/font/google";
import { Merriweather } from "@next/font/google";
import { useEffect } from "react";
import Rellax from "rellax";
import Link from "next/link";

const rowdies = Rowdies({ weight: "400", subsets: ["latin"]});
const roboto = Roboto_Mono({style: 'normal', subsets: ["latin"], weight: "300"});
const merriweather = Merriweather({weight: "700", subsets: ["latin"]});

const Container1 = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;

  .rellax {
    width: 100%;
    padding: 2rem 0 3rem;
    background: url("/rip.svg") bottom;
    position: relative;
    z-index: 1;
  }

  .rellax::before {
    content: "";
    width: 100%;
    height: 21px;
    background: url("/rip.svg") bottom;
    transform: rotate(180deg);
    position: absolute;
    left: 0;
    top: -20px;
    z-index: -1;
  }

  h1 {
    font-size: 4rem;
    color: #222222;
  }

  .rainbow {
    background: linear-gradient(
                90deg,
                #f44250,
                orange,
                #fecc1b,
                #6bd968,
                #3992ff,
                purple,
                #f44250
              ) 0 0 / 800% 100%;
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    animation: text-shift 60s linear infinite;
  }

  @keyframes text-shift {
    to {
      background-position: 800%;
    }
  }

  p {
    color: #c1b8a7;
  }
`;

// scrolling image animation
const ImgAnimation = keyframes`
  0% {
    transform: translateX(-100vw) rotate(-20deg);
  }
  100% {
    transform: translateX(100vw) rotate(20deg) scale(0.9);
  }
`;

interface Props {
  margin?: number;
  time: number;
};

const Img = styled(Image)<Props>`
  position: absolute;
  margin-top: ${props => props.margin || 0}px;
  transform: translateX(-200vw);
  z-index: -2;
  animation: ${ImgAnimation} ${props => props.time}s linear infinite;
  animation-delay: 0s;
`;

const Container2 = styled.div`
  width: 100%;
  height: 90vh;
  background: #f1c522;
  color: #222222;
  z-index: 1;
  position: relative;
  overflow: hidden;
  display: flex;

  :before {
    content: "";
    width: 100%;
    height: 50vh;
    background: #222;
    position: absolute;
    top: 90vh;
    right: -10vw;
    transform: rotate(-20deg);
    box-shadow: 0 0 0 40px #f44250;
  }

  h1 {
    font-size: 6rem;
    width: 50vw;
    height: fit-content;
  }
`;

// homepage component
export default function Home() {

  // init parallax classes
  useEffect(() => {
    new Rellax('.rellax', {
      speed: -2,
      center: false,
      wrapper: null,
      round: true,
      vertical: true,
      horizontal: false
    });
    new Rellax('.rellaxI', {
      speed: 3,
      center: true,
      wrapper: null,
      round: true,
      vertical: true,
      horizontal: false
    });
  }, []);

  return (
    <>
      <Container1>
        <div className="rellaxI">
          <Img time={90} margin={100} src="/le_lit.jpg" alt="le lit" width="200" height="200" />
          <Img time={70} margin={-200} src="/starry.jpg" alt="starry night" width="300" height="300" />
          <Img time={50} margin={-100} src="/monalisa.jpg" alt="mona lisa" width="400" height="400"/>
        </div>
        <div className="rellax">
          <h1><span className={`${merriweather.className} rainbow`}>Art</span> <span className={rowdies.className}>Block</span> <span className={roboto.className}>Avenue</span></h1>
          <p>Because we really need another social media site I guess...</p>
        </div>
      </Container1>
      <Container2>
        <h1 className="rellax">Social media without the hassle. <Link href="https://github.com/Therason/mvp" target="_blank"><Image src="/github.svg" width="100" height="100" alt="github logo" /></Link></h1>

      </Container2>
    </>
  )
}
