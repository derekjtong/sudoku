import { useState } from "react";
import { addElementToBoard } from "../../../api/boardManipulation";
import { addNote } from "../../../api/notes";

export function useSudokuGrid(size, currentGameId, initialGrid) {
  // Initialize the grid state
  const [sudokuGrid, setSudokuGrid] = useState(() => {
    // If an initial grid is provided, use it; otherwise, create an empty grid
    return initialGrid || Array.from({ length: size }, () => Array(size).fill({ value: 0, notes: Array(9).fill([]) }));
  });

  const handleCellChange = async (row, col, value, addNoteMode) => {
    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) return;
    // Adding notes
    if (addNoteMode) {
      // Create a deep copy of the grid
      const newGrid = sudokuGrid.map((row) => row.map((cell) => ({ ...cell })));
      const notes = sudokuGrid[row][col].notes;
      // creates a copy of the notes
      const newNotes = [...notes];

      const notesArrayLocation = getNotesArray(numberValue);
      // remove the number value from notes if it exists
      if (notes.flat(1).includes(numberValue)) {
        newNotes[notesArrayLocation].splice(notes.indexOf(numberValue), 1);
      } else {
        newNotes[notesArrayLocation].push(numberValue);
      }

      // Update the value of the specified cell
      newGrid[row][col].notes = newNotes;

      newGrid[row][col].value = 0;

      addNote(currentGameId, row, col, value);
      // setSudokuGrid(response.game.problemBoard);
      // Update the state with the new grid
      setSudokuGrid(newGrid);
      console.log("Complete");
    }
    // Adding values
    else {
      if (sudokuGrid[row][col].value === numberValue) {
        console.log("handleCellChange - no change, did not call API");
        return;
      }

      // Create a deep copy of the grid
      const newGrid = sudokuGrid.map((row) => row.map((cell) => ({ ...cell })));

      // Update the value of the specified cell
      newGrid[row][col].value = numberValue;

      // Call API
      console.log("Call api");
      addElementToBoard(currentGameId, row, col, numberValue);

      // Update the state with the new grid
      setSudokuGrid(newGrid);

      console.log("Complete");
    }
  };

  return { sudokuGrid, setSudokuGrid, handleCellChange };
}

const getNotesArray = (n) => {
  if (n <= 3) {
    return 0;
  } else if (n <= 6) {
    return 1;
  } else {
    return 2;
  }
};
