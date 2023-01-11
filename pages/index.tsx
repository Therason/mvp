import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

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
`;

// homepage component
export default function Home() {
  return (
    <Container>
      <div>
        <h1>Art Block Avenue</h1>
        <p>A place for artists of all kinds to share their works</p>
      </div>
    </Container>
  )
}
