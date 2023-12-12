import React, { useState } from "react";
import PropTypes from "prop-types";
import { undo, undoUntilCorrect, correctSoFar, getRandomHint, getSpecificHint } from "../../api/boardManipulation";

const FooterToolbar = ({ onToggleNotes, currentGameId, setCurrentGameId }) => {
  const [notesOn, setNotesOn] = useState(false);

  const toggleNotes = () => {
    setNotesOn(!notesOn);
    onToggleNotes(!notesOn); // Call the provided prop function with the updated state
  };

  return (
    <div className="fixed bottom-0 flex w-full justify-around bg-gray-800">
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={() => undo(currentGameId, setCurrentGameId)}>
        Undo
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={() => undoUntilCorrect(currentGameId, setCurrentGameId)}>
        Undo Until Correct
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={toggleNotes}>
        {notesOn ? "Notes On" : "Notes Off"}
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
  onToggleNotes: PropTypes.func.isRequired,
  currentGameId: PropTypes.number.isRequired,
  setCurrentGameId: PropTypes.func.isRequired,
};

export default FooterToolbar;
