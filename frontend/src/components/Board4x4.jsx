import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import Keypad from "./Keypad4x4";

function Board4x4() {
  const [sudokuGrid, setSudokuGrid] = useState(Array.from({ length: 4 }, () => Array(4).fill("")));
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });

  const handleCellChange = (row, col, value) => {
    const newGrid = [...sudokuGrid];
    newGrid[row][col] = value;
    setSudokuGrid(newGrid);
  };

  const handleCellClick = (row, col) => {
    console.log(`Selected cell: (${row + 1}, ${col + 1})`);
    setSelectedCell({ row, col });
  };

  const handleKeypadClick = (value) => {
    if (selectedCell.row !== null && selectedCell.col !== null) {
      handleCellChange(selectedCell.row, selectedCell.col, value.toString());
    }
  };

  const isSelectedQuadrant = (row, col) => {
    const selectedRow = selectedCell.row;
    const selectedCol = selectedCell.col;
    return (
      selectedRow !== null &&
      selectedCol !== null &&
      Math.floor(row / 2) === Math.floor(selectedRow / 2) &&
      Math.floor(col / 2) === Math.floor(selectedCol / 2)
    );
  };

  const getQuadrantColor = (quadrantIndex) => (quadrantIndex % 2 === 0 ? "bg-white" : "bg-yellow-100");

  const renderSubgrid = (startRow, startCol, quadrantIndex) => {
    return (
      <tbody key={`subgrid-${startRow}-${startCol}`}>
        {[...Array(2)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {[...Array(2)].map((_, colIndex) => (
              <Cell
                key={`${startRow + rowIndex}-${startCol + colIndex}`}
                row={startRow + rowIndex}
                col={startCol + colIndex}
                value={sudokuGrid[startRow + rowIndex][startCol + colIndex]}
                onChange={(value) => handleCellChange(startRow + rowIndex, startCol + colIndex, value)}
                onCellClick={handleCellClick}
                isSelected={
                  startRow + rowIndex === selectedCell.row ||
                  startCol + colIndex === selectedCell.col ||
                  isSelectedQuadrant(startRow + rowIndex, startCol + colIndex)
                }
                className={`
                  ${rowIndex > 0 && "border-top"}
                  ${colIndex > 0 && "border-left"}
                  ${rowIndex === 1 && "border-bottom"}
                  ${colIndex === 1 && "border-right"}
                  ${getQuadrantColor(quadrantIndex)}
                  ${isSelectedQuadrant(startRow + rowIndex, startCol + colIndex) && "bg-gray-200"}
                  ${startRow + rowIndex === selectedCell.row && startCol + colIndex === selectedCell.col && "bg-red-500 text-white"}
                `}
              />
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  const handleArrowKeys = (e) => {
    const currentRow = selectedCell.row;
    const currentCol = selectedCell.col;

    let newRow = currentRow;
    let newCol = currentCol;

    switch (e.key) {
      case "ArrowUp":
        newRow = Math.max(0, currentRow - 1);
        break;
      case "ArrowDown":
        newRow = Math.min(3, currentRow + 1);
        break;
      case "ArrowLeft":
        newCol = Math.max(0, currentCol - 1);
        break;
      case "ArrowRight":
        newCol = Math.min(3, currentCol + 1);
        break;
      default:
        return;
    }

    setSelectedCell({ row: newRow, col: newCol });
  };

  const handlePhysicalKeyboardInput = (e) => {
    const value = e.key;

    if (/^[1-4]$/.test(value) && selectedCell.row !== null && selectedCell.col !== null) {
      handleCellChange(selectedCell.row, selectedCell.col, value);
    } else if (e.code === "Backspace" && selectedCell.row !== null && selectedCell.col !== null) {
      // Handle Backspace to clear the cell
      handleCellChange(selectedCell.row, selectedCell.col, "");
    } else if (/^[A-Za-z]$/.test(value) && selectedCell.row !== null && selectedCell.col !== null) {
      // Clear the cell for alphabets
      handleCellChange(selectedCell.row, selectedCell.col, "");
      e.preventDefault();
    } else if (/^[5-9]$/.test(value) && selectedCell.row !== null && selectedCell.col !== null) {
      // Clear the cell for 5 - 9 numbers
      handleCellChange(selectedCell.row, selectedCell.col, "");
      e.preventDefault();
    } else if (/^[0]$/.test(value) && selectedCell.row !== null && selectedCell.col !== null) {
      // Clear the cell for zero
      handleCellChange(selectedCell.row, selectedCell.col, "");
      e.preventDefault(); // Prevent the default behavior of the keypress event
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleArrowKeys);
    document.addEventListener("keydown", handlePhysicalKeyboardInput);
    return () => {
      document.removeEventListener("keydown", handleArrowKeys);
      document.removeEventListener("keydown", handlePhysicalKeyboardInput);
    };
  }, [selectedCell]);

  return (
    <div>
      <table className="sudoku-grid mb-4 border border-black">
        <tbody>
          {[0, 2].map((startRow, quadrantRowIndex) => (
            <tr key={quadrantRowIndex}>
              {[0, 2].map((startCol, quadrantColIndex) => (
                <td
                  key={quadrantColIndex}
                  className="subgrid-cell"
                  style={{
                    border: "4px solid green",
                    boxSizing: "border-box",
                  }}
                >
                  <table className={`subgrid ${getQuadrantColor(2 * quadrantRowIndex + quadrantColIndex)}`}>
                    {renderSubgrid(startRow, startCol, 2 * quadrantRowIndex + quadrantColIndex)}
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

export default Board4x4;
