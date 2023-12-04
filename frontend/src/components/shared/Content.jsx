import PropTypes from "prop-types";
import Board9x9 from "../sudoku/Board9x9";
import Board4x4 from "../sudoku/Board4x4";

function Content({ boardDimension, difficulty }) {
  let BoardComponent;
  switch (boardDimension) {
    case 4:
      BoardComponent = <Board4x4 />;
      break;
    case 9:
      BoardComponent = <Board9x9 />;
      break;
    default:
      BoardComponent = null;
  }
  let difficultyText;
  switch (difficulty) {
    case 1:
      difficultyText = "easy";
      break;
    case 2:
      difficultyText = "medium";
      break;
    case 3:
      difficultyText = "hard";
      break;
    default:
      difficultyText = null;
  }
  return (
    <div className="container mx-auto mt-32 flex justify-center ">
      {difficultyText} {BoardComponent}
    </div>
  );
}
Content.propTypes = {
  boardDimension: PropTypes.number.isRequired,
  difficulty: PropTypes.number.isRequired,
};
export default Content;
