import PropTypes from "prop-types";
import { useState } from "react";
import { undo, undoUntilCorrect, correctSoFar, getRandomHint, getSpecificHint } from "../../api/boardManipulation";


const FooterToolbar = ({ onToggleNotes }) => {
  const [notesOn, setNotesOn] = useState(false);

  const toggleNotes = () => {
    setNotesOn(!notesOn);
    onToggleNotes(!notesOn); // Call the provided prop function with the updated state
  };

  return (
    <div className="fixed bottom-0 flex w-full justify-around bg-gray-800">
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={undo}>
        Undo
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={undoUntilCorrect}>
        Undo Until Correct
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={toggleNotes}>
        {notesOn ? "Notes On" : "Notes Off"}
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={getRandomHint}>
        Random Hint
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={getSpecificHint}>
        Specific Hint
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={correctSoFar}>
        Check Board
      </button>
    </div>
  );
};

FooterToolbar.propTypes = {
  onUndo: PropTypes.func.isRequired,
  onErase: PropTypes.func.isRequired,
  onToggleNotes: PropTypes.func.isRequired,
  onUndoUntilCorrect: PropTypes.func.isRequired,
  onGetRandomHint: PropTypes.func.isRequired,
  onGetSpecificHint: PropTypes.func.isRequired,
};

export default FooterToolbar;
