import PropTypes from "prop-types";
import { undo, undoUntilCorrect, correctSoFar, getRandomHint, getSpecificHint } from "../../api/boardManipulation";
import { useSudokuBoard } from "../providers/board-provider";

const FooterToolbar = ({ currentGameId, showNotes, setShowNotes }) => {
  const { setSudokuGrid, setSelectedCell, sudokuGrid } = useSudokuBoard();

  const toggleNotes = () => {
    setShowNotes((cur) => !cur);
  };

  const handleUndo = async () => {
    try {
      const data = await undo(currentGameId);
      if (data.noMoreMoves) {
        console.log("No more moves to undo");
        return;
      }
      const newGrid = data.board.grid;
      setSudokuGrid(newGrid);

      // Find the first cell that is different
      for (let row = 0; row < newGrid.length; row++) {
        for (let col = 0; col < newGrid[row].length; col++) {
          const newValue = Number(newGrid[row][col].value);
          const oldValue = Number(sudokuGrid[row][col].value);
          if (newValue !== oldValue) {
            console.log("Changed cell is", row, col);
            setSelectedCell({ row, col });
            return;
          }
        }
      }
    } catch (error) {
      console.error("Error during undo operation:", error);
    }
  };

  return (
    <div className="fixed bottom-0 flex w-full justify-around bg-gray-800">
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={handleUndo}>
        Undo
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={() => undoUntilCorrect(currentGameId)}>
        Undo Until Correct
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={toggleNotes}>
        {showNotes ? "Notes On" : "Notes Off"}
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={() => getRandomHint(currentGameId)}>
        Random Hint
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={() => getSpecificHint(currentGameId)}>
        Specific Hint
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={() => correctSoFar(currentGameId)}>
        Check Board
      </button>
    </div>
  );
};

FooterToolbar.propTypes = {
  currentGameId: PropTypes.string.isRequired,
  setShowNotes: PropTypes.func.isRequired,
  showNotes: PropTypes.bool.isRequired,
};

export default FooterToolbar;
