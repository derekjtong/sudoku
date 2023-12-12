import { useState } from "react";
import FooterToolbar from "./components/shared/FooterToolbar";
import Content from "./components/shared/Content";
import Navbar from "./components/shared/Navbar";
import useLocalStorage from "./hooks/useLocalStorage";

function Home() {
  const [boardDimension, setBoardDimension] = useState(9);
  const [difficulty, setDifficulty] = useState(1);
  const [currentGameId, setCurrentGameId] = useLocalStorage("currentGameId", "");
  const [showNotes, setShowNotes] = useState(false);

  console.log("currentGameId type = ", typeof currentGameId);
  return (
    <>
      <Navbar setBoardDimension={setBoardDimension} setDifficulty={setDifficulty} setCurrentGameId={setCurrentGameId} />
      <Content boardDimension={boardDimension} difficulty={difficulty} currentGameId={currentGameId} setCurrentGameId={setCurrentGameId} />
      <FooterToolbar currentGameId={currentGameId} setCurrentGameId={setCurrentGameId} showNotes={showNotes} setShowNotes={setShowNotes} />
    </>
  );
}

export default Home;
