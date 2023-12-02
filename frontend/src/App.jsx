import { useState } from "react";
import Buttons from "./components/shared/Buttons";
import Content from "./components/shared/Content";
import Navbar from "./components/shared/Navbar";

function Home() {
  const [boardDimension, setBoardDimension] = useState(9);
  const [difficulty, setDifficulty] = useState(1);
  return (
    <>
      <Navbar setBoardDimension={setBoardDimension} setDifficulty={setDifficulty} />
      <Content boardDimension={boardDimension} difficulty={difficulty} />
      <Buttons />
    </>
  );
}

export default Home;
