import PropTypes from "prop-types";
import Board from "../sudoku/Board";
import FooterToolbar from "./FooterToolbar";

function Content({ boardDimension, difficulty, currentGameId, setCurrentGameId, showNotes, setShowNotes }) {
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
      {boardDimension && <Board size={boardDimension} setCurrentGameId={setCurrentGameId} showNotes={showNotes} />}
      <FooterToolbar currentGameId={currentGameId} setCurrentGameId={setCurrentGameId} showNotes={showNotes} setShowNotes={setShowNotes} />
    </div>
  );
}
Content.propTypes = {
  boardDimension: PropTypes.number.isRequired,
  difficulty: PropTypes.number.isRequired,
  currentGameId: PropTypes.string.isRequired,
  setCurrentGameId: PropTypes.func.isRequired,
  showNotes: PropTypes.bool.isRequired,
  setShowNotes: PropTypes.func.isRequired,
};
export default Content;
