import { useState } from "react";

const Buttons = ({ onUndo, onErase, onToggleNotes, onGetHint }) => {
  const [notesOn, setNotesOn] = useState(false);

  const toggleNotes = () => {
    setNotesOn(!notesOn);
    onToggleNotes(!notesOn); // Call the provided prop function with the updated state
  };

  return (
    <div className="fixed bottom-0 flex w-full justify-around bg-gray-800 p-4">
      <button className="text-white" onClick={() => { onUndo(); onUserAction('Undo'); }}>
        Undo
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={toggleNotes}>
        {notesOn ? "Notes On" : "Notes Off"}
      </button>
      <button className="text-white" onClick={() => { onGetHint(); onUserAction('Get Hint'); }}>
        Hint
      </button>
      <button className="text-white" onClick={() => { onErase(); onUserAction('Erase'); }}>
        Check Board
      </button>
    </div>
  );
};

export default Buttons;
