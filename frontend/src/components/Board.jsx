// Board.jsx
import React, { useState } from "react";
import Cell from "./Cell";
import Keypad from "./Keypad";

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

  const handleKeypadClick = (value) => {
    if (selectedCell.row !== null && selectedCell.col !== null) {
      const newGrid = [...sudokuGrid];
      newGrid[selectedCell.row][selectedCell.col] = value.toString();
      setSudokuGrid(newGrid);
    }
  };

  const isSubgridBoundary = (index) => index % 3 === 0;

  const isSelectedQuadrant = (row, col) => {
    const selectedRow = selectedCell.row;
    const selectedCol = selectedCell.col;
    return (
      selectedRow !== null &&
      selectedCol !== null &&
      Math.floor(row / 3) === Math.floor(selectedRow / 3) &&
      Math.floor(col / 3) === Math.floor(selectedCol / 3)
    );
  };

  const getQuadrantColor = (quadrantIndex) => (quadrantIndex % 2 === 0 ? "bg-white" : "bg-yellow-100");

  const renderSubgrid = (startRow, startCol, quadrantIndex) => {
    return (
      <tbody key={`subgrid-${startRow}-${startCol}`}>
        {[...Array(3)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {[...Array(3)].map((_, colIndex) => (
              <Cell
                key={`${startRow + rowIndex}-${startCol + colIndex}`}
                row={startRow + rowIndex}
                col={startCol + colIndex}
                value={sudokuGrid[startRow + rowIndex][startCol + colIndex]}
                onChange={(e) => handleCellChange(startRow + rowIndex, startCol + colIndex, e)}
                onCellClick={handleCellClick}
                isSelected={
                  startRow + rowIndex === selectedCell.row ||
                  startCol + colIndex === selectedCell.col ||
                  isSelectedQuadrant(startRow + rowIndex, startCol + colIndex)
                }
                className={`
                  ${rowIndex > 0 && "border-top"}
                  ${colIndex > 0 && "border-left"}
                  ${rowIndex === 2 && "border-bottom"}
                  ${colIndex === 2 && "border-right"}
                  ${getQuadrantColor(quadrantIndex)}
                  ${isSelectedQuadrant(startRow + rowIndex, startCol + colIndex) && "bg-gray-200"}
                `}
              />
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div>
      <table className="sudoku-grid mb-4 border border-black">
        <tbody>
          {[0, 3, 6].map((startRow, quadrantRowIndex) => (
            <tr key={quadrantRowIndex}>
              {[0, 3, 6].map((startCol, quadrantColIndex) => (
                <td
                  key={quadrantColIndex}
                  className="subgrid-cell"
                  style={{
                    border: "4px solid green",
                    boxSizing: "border-box", // Ensure the border is included in the overall size
                  }}
                >
                  <table className={`subgrid ${getQuadrantColor(3 * quadrantRowIndex + quadrantColIndex)}`}>
                    {renderSubgrid(startRow, startCol, 3 * quadrantRowIndex + quadrantColIndex)}
                  </table>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Keypad onKeypadClick={handleKeypadClick} />
    </div>
  );
}

export default Board;
