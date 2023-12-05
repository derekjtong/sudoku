import { useState } from "react";

export function useSudokuGrid(size) {
  const [sudokuGrid, setSudokuGrid] = useState(Array.from({ length: size }, () => Array(size).fill("")));

  const handleCellChange = (row, col, value) => {
    const newGrid = [...sudokuGrid];
    newGrid[row][col] = value;
    setSudokuGrid(newGrid);
  };

  return { sudokuGrid, setSudokuGrid, handleCellChange };
}
