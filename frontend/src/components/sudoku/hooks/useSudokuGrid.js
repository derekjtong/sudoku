import { useState } from "react";
import { addElementToBoard } from "../../../api/boardManipulation";

export function useSudokuGrid(size, currentGameId) {
  const [sudokuGrid, setSudokuGrid] = useState(Array.from({ length: size }, () => Array(size).fill("")));

  const handleCellChange = (row, col, value) => {
    const newGrid = [...sudokuGrid];
    newGrid[row][col] = value;
    console.log(value);
    addElementToBoard(currentGameId, row, col, Number(value));
    setSudokuGrid(newGrid);
  };

  return { sudokuGrid, setSudokuGrid, handleCellChange };
}
