// Derek
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
  const [addNoteMode, setAddNoteMode] = useState(false);

  return (
    <SudokuBoardProvider size={boardDimension} currentGameId={currentGameId}>
      <Navbar setBoardDimension={setBoardDimension} setDifficulty={setDifficulty} setCurrentGameId={setCurrentGameId} />
      <Content
        boardDimension={boardDimension}
        setBoardDimension={setBoardDimension}
        difficulty={difficulty}
        currentGameId={currentGameId}
        setCurrentGameId={setCurrentGameId}
        addNoteMode={addNoteMode}
        setAddNoteMode={setAddNoteMode}
      />
      <FooterToolbar currentGameId={currentGameId} addNoteMode={addNoteMode} setAddNoteMode={setAddNoteMode} />
    </SudokuBoardProvider>
  );
}

export default Home;
