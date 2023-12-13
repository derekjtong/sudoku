import PropTypes from "prop-types";
import Board from "../sudoku/Board";
import { resetGame } from "../../api/boardManipulation";
import { useSudokuBoard } from "../providers/board-provider";

function Content({ boardDimension, difficulty, currentGameId, setCurrentGameId, addNoteMode }) {
  const { setSudokuGrid } = useSudokuBoard();
  let BoardComponent;
  switch (boardDimension) {
    case 4:
      // BoardComponent = <Board4x4 currentGameId={currentGameId} setCurrentGameId={setCurrentGameId} addNoteMode={addNoteMode} />;
      // TODO 4x4 board
      break;
    case 9:
      BoardComponent = <Board currentGameId={currentGameId} setCurrentGameId={setCurrentGameId} addNoteMode={addNoteMode} />;
      break;
    default:
      BoardComponent = <Board currentGameId={currentGameId} setCurrentGameId={setCurrentGameId} addNoteMode={addNoteMode} />;
  }
  let difficultyText;
  switch (difficulty) {
    case 1:
      difficultyText = "Easy";
      break;
    case 2:
      difficultyText = "Medium";
      break;
    case 3:
      difficultyText = "Hard";
      break;
    default:
      difficultyText = null;
  }
  const handleResetGame = async () => {
    const response = await resetGame(currentGameId);
    setSudokuGrid(response.problemBoard);
  };
  return (
    <div className="container mx-auto mt-32 flex flex-col items-center justify-center ">
      {difficultyText}
      {BoardComponent}
      <button onClick={handleResetGame}>ADMIN reset game</button>
    </div>
  );
}
Content.propTypes = {
  boardDimension: PropTypes.number.isRequired,
  difficulty: PropTypes.number.isRequired,
  currentGameId: PropTypes.string.isRequired,
  setCurrentGameId: PropTypes.func.isRequired,
  addNoteMode: PropTypes.bool.isRequired,
};
export default Content;
