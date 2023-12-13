import PropTypes from "prop-types";
import { undo, undoUntilCorrect, correctSoFar, getRandomHint, getSpecificHint } from "../../api/boardManipulation";
import { useSudokuBoard } from "../providers/board-provider";

const FooterToolbar = ({ currentGameId, addNoteMode, setAddNoteMode }) => {
  const { setSudokuGrid, setSelectedCell, sudokuGrid } = useSudokuBoard();

  const handleUndo = async () => {
    console.log("called undo");
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

  const handleUndoUntilCorrect = async () => {
    try {
      const data = await undoUntilCorrect(currentGameId);
      if (data.noMoreMoves) {
        console.log("No more moves to undo");
        return;
      }
      const newGrid = data.board;
      setSudokuGrid(newGrid);
      setSelectedCell(-1, -1);
    } catch (error) {
      console.error("Error during undoUntilCorrect:", error);
    }
  };

  const handleGetSpecificHint = async () => {
    console.log("Called getSpecificHint");
    try {
      const data = await getSpecificHint(currentGameId);
      console.log(data);
    } catch (error) {
      console.error("Error during getSpecificHint:", error);
    }
  };

  const handleCheckBoard = async () => {
    try {
      const data = await correctSoFar(currentGameId);
      console.log(data);
    } catch (error) {
      console.error("Error duing checkBoard:", error);
    }
  };

  return (
    <div className="fixed bottom-0 flex w-full justify-around bg-gray-800">
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={handleUndo}>
        Undo
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={handleUndoUntilCorrect}>
        Undo Until Correct
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={() => setAddNoteMode((cur) => !cur)}>
        {addNoteMode ? "Notes On" : "Notes Off"}
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={() => getRandomHint(currentGameId)}>
        Random Hint
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={handleGetSpecificHint}>
        Specific Hint
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={handleCheckBoard}>
        Check Board
      </button>
    </div>
  );
};

FooterToolbar.propTypes = {
  currentGameId: PropTypes.string.isRequired,
  addNoteMode: PropTypes.bool.isRequired,
  setAddNoteMode: PropTypes.func.isRequired,
};

export default FooterToolbar;
