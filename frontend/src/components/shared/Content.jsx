import PropTypes from "prop-types";
import Board from "../sudoku/Board";

function Content({ boardDimension, difficulty }) {
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
  return (
    <div className="container mx-auto mt-32 flex flex-col items-center justify-center">
      {difficultyText && <h2>{difficultyText}</h2>}
      {boardDimension && <Board size={boardDimension} />}
    </div>
  );
}
Content.propTypes = {
  boardDimension: PropTypes.number.isRequired,
  difficulty: PropTypes.number.isRequired,
};
export default Content;
