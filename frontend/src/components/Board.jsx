// Board.js
import React, { useState } from "react";
import Cell from "./Cell";

function Board() {
  const [sudokuGrid, setSudokuGrid] = useState(Array.from({ length: 9 }, () => Array(9).fill("")));
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });

  const handleCellChange = (row, col, e) => {
    const newGrid = [...sudokuGrid];
    newGrid[row][col] = e.target.value;
    setSudokuGrid(newGrid);
  };

  const handleCellClick = (row, col) => {
    console.log(`Selected cell: (${row + 1}, ${col + 1})`);
    setSelectedCell({ row, col });
  };

  const isSubgridBoundary = (index) => index % 3 === 0;

  return (
    <table className="sudoku-grid">
      <tbody>
        {sudokuGrid.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
                value={cell}
                onChange={(e) => handleCellChange(rowIndex, colIndex, e)}
                onCellClick={handleCellClick}
                isSelected={rowIndex === selectedCell.row || colIndex === selectedCell.col}
                className={`
                  ${isSubgridBoundary(rowIndex) && "border-bottom"}
                  ${isSubgridBoundary(colIndex) && "border-right"}
                  ${rowIndex > 0 && rowIndex % 3 === 0 && "border-top"}
                  ${colIndex > 0 && colIndex % 3 === 0 && "border-left"}
                `}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;
