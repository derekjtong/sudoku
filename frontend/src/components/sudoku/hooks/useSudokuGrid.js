import { useState } from "react";
import { addElementToBoard } from "../../../api/boardManipulation";

export function useSudokuGrid(size, currentGameId, initialGrid) {
  // Initialize the grid state
  const [sudokuGrid, setSudokuGrid] = useState(() => {
    // If an initial grid is provided, use it; otherwise, create an empty grid
    return initialGrid || Array.from({ length: size }, () => Array(size).fill({ value: "", notes: Array(9).fill([]) }));
  });

  const handleCellChange = (row, col, value) => {
    value = Number(value);
    if (sudokuGrid[row][col].value === Number(value)) {
      console.log("handleCellChange - no change, did not call API");
      return;
    }

    // Create a deep copy of the grid
    const newGrid = sudokuGrid.map((row) => row.map((cell) => ({ ...cell })));

    // Update the value of the specified cell
    newGrid[row][col].value = value;

    // Call API
    addElementToBoard(currentGameId, row, col, Number(value));

    // Update the state with the new grid
    setSudokuGrid(newGrid);
  };

  return { sudokuGrid, setSudokuGrid, handleCellChange };
}
