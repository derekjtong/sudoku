import React, { useState } from 'react';
import './Buttons.css';

const Buttons = ({ onUndo, onErase, onToggleNotes, onGetHint }) => {
  const [notesOn, setNotesOn] = useState(false);

  const toggleNotes = () => {
    setNotesOn(!notesOn);
    onToggleNotes(!notesOn); // Call the provided prop function with the updated state
  };

  return (
    <div className="buttons-container">
      <button onClick={onUndo}>Undo</button>
      <button onClick={toggleNotes}>
        {notesOn ? 'Notes On' : 'Notes Off'}
      </button>
      <button onClick={onGetHint}>Hint</button>
      <button onClick={onErase}>Check Board</button>
    </div>
  );
};

export default Buttons;
