import styled from "styled-components";
import { keyframes } from "styled-components";
import Image from "next/image";
import { Rowdies } from "@next/font/google";
import { Roboto_Mono } from "@next/font/google";
import { Merriweather } from "@next/font/google";

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

  div {
    width: 80%;
    padding-bottom: 2rem;
    background: url("/rip.svg") bottom;
    position: relative;
    z-index: -1;
  }

  div::before {
    content: "";
    width: 100%;
    height: 20px;
    background: url("/rip.svg") bottom;
    transform: rotate(180deg);
    position: absolute;
    left: 0;
    top: -20px;
    z-index: -1;
  }

  h1 {
    font-size: 4rem;
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

const Container2 = styled.div`
  width: 100%;
  height: 90vh;
  background: #ff6631;
`;

const ImgAnimation = keyframes`
  0% {
    transform: translateX(-100vw) rotate(-20deg);
  }
  100% {
    transform: translateX(100vw) rotate(20deg) scale(0.9);
  }
`;

const Mona = styled(Image)`
  position: absolute;
  transform: translateX(-200%);
  z-index: -1;
  animation: ${ImgAnimation} 45s linear infinite;
  animation-delay: 0s;
`;

const Lit = styled(Image)`
  position: absolute;
  margin-top: 200px;
  transform: translateX(-200vw);
  z-index: -2;
  animation: ${ImgAnimation} 60s linear infinite;
  animation-delay: 0s;
`;



// homepage component
export default function Home() {
  return (
    <>
      <Container1>
        <Mona src="/monalisa.jpg" alt="mona lisa" width="400" height="400"/>
        <Lit src="/le_lit.jpg" alt="le lit" width="200" height="200" />
        <div>
          <h1><span className={merriweather.className}>Art</span> <span className={rowdies.className}>Block</span> <span className={roboto.className}>Avenue</span></h1>
          <p>Placeholder text</p>
        </div>
      </Container1>
      <Container2></Container2>
    </>
  )
}
