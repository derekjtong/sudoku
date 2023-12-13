import PropTypes from "prop-types";
import Board from "../sudoku/Board";
import { useState } from "react";
import AdminDialog from "./AdminDialog";

function Content({ boardDimension, difficulty, currentGameId, setCurrentGameId, addNoteMode, setAddNoteMode }) {
  const [showAdminDialog, setShowAdminDialog] = useState(false);

  let BoardComponent;
  switch (boardDimension) {
    case 4:
      BoardComponent = <div>Sorry, we are closed. Switch back to 9x9 board!</div>;
      // BoardComponent = <Board4x4 currentGameId={currentGameId} setCurrentGameId={setCurrentGameId} addNoteMode={addNoteMode} />;
      // TODO 4x4 board
      break;
    case 9:
      BoardComponent = (
        <Board
          currentGameId={currentGameId}
          setCurrentGameId={setCurrentGameId}
          addNoteMode={addNoteMode}
          setAddNoteMode={setAddNoteMode}
        />
      );
      break;
    default:
      BoardComponent = (
        <Board
          currentGameId={currentGameId}
          setCurrentGameId={setCurrentGameId}
          addNoteMode={addNoteMode}
          setAddNoteMode={setAddNoteMode}
        />
      );
  }

  const openAdminDialog = () => {
    setShowAdminDialog(true);
  };

  const closeAdminDialog = () => {
    setShowAdminDialog(false);
  };
  return (
    <div className="container mx-auto mt-32 flex flex-col items-center justify-center ">
      {BoardComponent}
      <button onClick={openAdminDialog} className="mt-4">
        ADMIN COMMANDS
      </button>
      {showAdminDialog && <AdminDialog onClose={closeAdminDialog} currentGameId={currentGameId} />}
    </div>
  );
}
Content.propTypes = {
  boardDimension: PropTypes.number.isRequired,
  difficulty: PropTypes.number.isRequired,
  currentGameId: PropTypes.string.isRequired,
  setCurrentGameId: PropTypes.func.isRequired,
  addNoteMode: PropTypes.bool.isRequired,
  setAddNoteMode: PropTypes.func.isRequired,
};
export default Content;
