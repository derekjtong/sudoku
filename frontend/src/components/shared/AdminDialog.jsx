// Kayla, Derek
import PropTypes from "prop-types";
import { resetGame } from "../../api/boardManipulation";
import { useSudokuBoard } from "../providers/board-provider";

const AdminDialog = ({ onClose, currentGameId, setShowDifficultyDialog }) => {
  const { setSudokuGrid } = useSudokuBoard();

  const handleResetGame = async () => {
    const response = await resetGame(currentGameId);
    setSudokuGrid(response.problemBoard);
    onClose();
  };

  const handleShowDifficultyDialog = async () => {
    setShowDifficultyDialog((cur) => !cur);
    onClose();
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-md bg-white p-8 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Admin Commands</h2>
        <button className="mb-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600" onClick={handleResetGame}>
          Reset Game
        </button>
        <button className="mb-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600" onClick={handleShowDifficultyDialog}>
          Show Difficulty
        </button>
        <div className="mt-6 flex justify-end">
          <button className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

AdminDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentGameId: PropTypes.string.isRequired,
  setShowDifficultyDialog: PropTypes.func.isRequired,
};

export default AdminDialog;
