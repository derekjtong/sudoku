// Derek
import PropTypes from "prop-types";
import Board from "../sudoku/Board";
import { useState } from "react";
import AdminDialog from "./AdminDialog";

function Content({ boardDimension, difficulty, currentGameId, setCurrentGameId, addNoteMode, setAddNoteMode, setBoardDimension }) {
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [showDifficultyDialog, setShowDifficultyDialog] = useState(false);

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
      difficultyText = "Easy";
  }
  const openAdminDialog = () => {
    setShowAdminDialog(true);
  };

  const closeAdminDialog = () => {
    setShowAdminDialog(false);
  };
  return (
    <div className="container mx-auto mt-32 flex flex-col items-center justify-center pb-28">
      <div data-testid="board">
        <Board
          currentGameId={currentGameId}
          setCurrentGameId={setCurrentGameId}
          addNoteMode={addNoteMode}
          setAddNoteMode={setAddNoteMode}
          boardDimension={boardDimension}
          setBoardDimension={setBoardDimension}
        />
      </div>
      <div className="text-content mx-auto px-4 lg:px-32 xl:px-64">
        <h1 className="py-4 text-2xl">Enjoy Free Sudoku Online!</h1>
        Recognized globally as a classic puzzle game, Sudoku challenges you to fill a 9x9 grid with numbers in such a way that each row,
        column, and 3x3 segment contains all digits from 1 to 9. As a brain-stimulating logic game, regular Sudoku play enhances focus and
        cognitive abilities. Dive into the world of Sudoku and enjoy the thrill of puzzle-solving!
        <h1 className="py-4 text-2xl">Discover Sudoku</h1>
        Sudoku, a well-loved puzzle originating from Japan, revolves around strategically placing numbers. It&apos;s a game of logic that
        doesn&apos;t rely on mathematical calculations but rather on sharp thinking and concentration.
        <h1 className="py-4 text-2xl">Sudoku Gameplay Instructions</h1>
        The objective in Sudoku is to populate a 9x9 grid so that every row, column, and 3x3 section features the numbers 1 through 9,
        without repetition. Initially, some numbers are already placed in the grid, and your task is to fill in the blanks logically.
        Remember, a move is incorrect if:
        <ul className="list-disc pl-8">
          <li>A row has duplicates of any number from 1 to 9</li>
          <li>A column has duplicates of any number from 1 to 9</li>
          <li>A 3x3 grid has duplicates of any number from 1 to 9</li>
        </ul>
        <h1 className="py-4 text-2xl">Tips for Sudoku Beginners</h1>
        Sudoku can be immensely satisfying once you grasp its basics. For beginners, it might seem daunting at first. Here are some
        strategies to build your Sudoku skills:
        <ul className="list-disc pl-8">
          <li>
            Start by focusing on rows, columns, or 3x3 sections with at least five numbers. Analyze the missing numbers and try to deduce
            their rightful places by process of elimination.
          </li>
          <li>
            Visualize the grid in terms of 3 large columns and 3 rows, each containing 3x3 grids. If you spot a number repeated twice in any
            large column or row, the third instance of that number must be in the remaining 9-cell section. This can help you pinpoint the
            missing number&apos;s location.
          </li>
        </ul>
        Now that you&apos;re equipped with some basic knowledge about Sudoku, go ahead and challenge yourself with this engaging online
        game.
      </div>
      <button data-testid="adminButton" onClick={openAdminDialog} className="mt-4">
        ADMIN COMMANDS
      </button>
      {showAdminDialog && (
        <div data-testid="adminDialog">
          <AdminDialog
            onClose={closeAdminDialog}
            currentGameId={currentGameId}
            showDifficultyDialog={showDifficultyDialog}
            setShowDifficultyDialog={setShowDifficultyDialog}
          />
        </div>
      )}
      {showDifficultyDialog && difficultyText}
    </div>
  );
}
Content.propTypes = {
  boardDimension: PropTypes.number.isRequired,
  setBoardDimension: PropTypes.func.isRequired,
  difficulty: PropTypes.number.isRequired,
  currentGameId: PropTypes.string.isRequired,
  setCurrentGameId: PropTypes.func.isRequired,
  addNoteMode: PropTypes.bool.isRequired,
  setAddNoteMode: PropTypes.func.isRequired,
};
export default Content;
