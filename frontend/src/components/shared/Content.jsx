import PropTypes from "prop-types";
import Board9x9 from "../sudoku/Board9x9";
import Board4x4 from "../sudoku/Board4x4";
import { resetGame } from "../../api/boardManipulation";
import { useSudokuBoard } from "../providers/board-provider";

function Content({ boardDimension, difficulty, currentGameId, setCurrentGameId, addNoteMode }) {
  const { setSudokuGrid } = useSudokuBoard();
  let BoardComponent;
  switch (boardDimension) {
    case 4:
      BoardComponent = <Board4x4 currentGameId={currentGameId} setCurrentGameId={setCurrentGameId} addNoteMode={addNoteMode} />;
      break;
    case 9:
      BoardComponent = <Board9x9 currentGameId={currentGameId} setCurrentGameId={setCurrentGameId} addNoteMode={addNoteMode} />;
      break;
    default:
      BoardComponent = null;
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
    // console.log(response.problemBoard);
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
