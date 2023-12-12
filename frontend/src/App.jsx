import { useState } from "react";
import FooterToolbar from "./components/shared/FooterToolbar";
import Content from "./components/shared/Content";
import Navbar from "./components/shared/Navbar";
import useLocalStorage from "./hooks/useLocalStorage";

function Home() {
  const [boardDimension, setBoardDimension] = useState(9);
  const [difficulty, setDifficulty] = useState(1);
  const [currentGameId, setCurrentGameId] = useLocalStorage("current9x9GameId", -1);
  const [showNotes, setShowNotes] = useState(false);

  return (
    <>
      <Navbar setBoardDimension={setBoardDimension} setDifficulty={setDifficulty} setCurrentGameId={setCurrentGameId} />
      <Content
        boardDimension={boardDimension}
        difficulty={difficulty}
        currentGameId={currentGameId}
        setCurrentGameId={setCurrentGameId}
        showNotes={showNotes}
      />
      <FooterToolbar currentGameId={currentGameId} showNotes={showNotes} setShowNotes={setShowNotes} />
    </>
  );
}

export default Home;
