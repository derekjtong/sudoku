import { useState } from "react";

const Buttons = ({ onUndo, onErase, onToggleNotes, onGetHint }) => {
  const [notesOn, setNotesOn] = useState(false);

  const toggleNotes = () => {
    setNotesOn(!notesOn);
    onToggleNotes(!notesOn); // Call the provided prop function with the updated state
  };

  return (
    <div className="fixed bottom-0 flex w-full justify-around bg-gray-800">
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={onUndo}>
        Undo
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={toggleNotes}>
        {notesOn ? "Notes On" : "Notes Off"}
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={onGetHint}>
        Hint
      </button>
      <button className="w-full p-4 text-white hover:bg-gray-900" onClick={onErase}>
        Check Board
      </button>
    </div>
  );
};

export default Buttons;
