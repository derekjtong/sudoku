import { useState } from "react";
import FooterToolbar from "./components/shared/FooterToolbar";
import Content from "./components/shared/Content";
import Navbar from "./components/shared/Navbar";

function Home() {
  const [boardDimension, setBoardDimension] = useState(9);
  const [difficulty, setDifficulty] = useState(1);
  return (
    <>
      <Navbar setBoardDimension={setBoardDimension} setDifficulty={setDifficulty} />
      <Content boardDimension={boardDimension} difficulty={difficulty} />
      <FooterToolbar />
    </>
  );
}

export default Home;
