import { useState } from "react";
import FooterToolbar from "./components/shared/FooterToolbar";
import Content from "./components/shared/Content";
import Navbar from "./components/shared/Navbar";
import useLocalStorage from "./hooks/useLocalStorage";
import { SudokuBoardProvider } from "./components/providers/board-provider";

function Home() {
  const [boardDimension, setBoardDimension] = useState(9);
  const [difficulty, setDifficulty] = useState(1);
  const [currentGameId, setCurrentGameId] = useLocalStorage("currentGameId", "");
  const [showNotes, setShowNotes] = useState(false);

  return (
    <SudokuBoardProvider size={boardDimension} currentGameId={currentGameId}>
      <Navbar setBoardDimension={setBoardDimension} setDifficulty={setDifficulty} setCurrentGameId={setCurrentGameId} />
      <Content
        boardDimension={boardDimension}
        difficulty={difficulty}
        currentGameId={currentGameId}
        setCurrentGameId={setCurrentGameId}
        showNotes={showNotes}
        setShowNotes={setShowNotes}
      />
      <FooterToolbar currentGameId={currentGameId} setCurrentGameId={setCurrentGameId} showNotes={showNotes} setShowNotes={setShowNotes} />
    </SudokuBoardProvider>
  );
}

export default Home;
