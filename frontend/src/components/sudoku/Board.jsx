// Board.jsx
import { useEffect, useCallback } from "react";
import Cell from "./Cell";
import { getFourBoard, getNineBoard } from "../../api/getBoard";
import Keypad from "./Keypad"; // Ensure this is adaptable for different sizes
import { useSelectedCell } from "./hooks/useSelectedCell";
import { useSudokuGrid } from "./hooks/useSudokuGrid";
import PropTypes from "prop-types";

Board.propTypes = {
  size: PropTypes.number.isRequired, // Add prop validation for size
};

function Board({ size }) {
  const { sudokuGrid, setSudokuGrid, handleCellChange } = useSudokuGrid(size);
  const { selectedCell, setSelectedCell, handleCellClick } = useSelectedCell();

  useEffect(() => {
    // Generalized fetching logic based on board size
    console.log(`get${size}x${size}Board`);
    const fetchBoard = size === 4 ? getFourBoard : getNineBoard;
    fetchBoard().then((data) => {
      const loadedBoard = data.game.problemBoard.map((row) => row.map((number) => number.toString()));
      setSudokuGrid(loadedBoard);
    });
  }, [size, setSudokuGrid]);

  const handleKeypadClick = (value) => {
    if (selectedCell.row !== null && selectedCell.col !== null) {
      handleCellChange(selectedCell.row, selectedCell.col, value.toString());
    }
  };

  const isSelectedQuadrant = (row, col) => {
    const quadrantSize = size === 4 ? 2 : 3;
    const selectedRow = selectedCell.row;
    const selectedCol = selectedCell.col;
    return (
      selectedRow !== null &&
      selectedCol !== null &&
      Math.floor(row / quadrantSize) === Math.floor(selectedRow / quadrantSize) &&
      Math.floor(col / quadrantSize) === Math.floor(selectedCol / quadrantSize)
    );
  };

  const getQuadrantColor = (quadrantIndex) => (quadrantIndex % 2 === 0 ? "bg-white" : "bg-yellow-100");

  const renderSubgrid = (startRow, startCol, quadrantIndex) => {
    const subgridSize = size === 4 ? 2 : 3;
    return (
      <tbody key={`subgrid-${startRow}-${startCol}`}>
        {[...Array(subgridSize)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {[...Array(subgridSize)].map((_, colIndex) => (
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
                isPrimarySelected={startRow + rowIndex === selectedCell.row && startCol + colIndex === selectedCell.col}
                className={`
                ${rowIndex > 0 && "border-top"}
                ${colIndex > 0 && "border-left"}
                ${rowIndex === subgridSize - 1 && "border-bottom"}
                ${colIndex === subgridSize - 1 && "border-right"}
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

  const handleArrowKeys = useCallback(
    (e) => {
      const ARROW_KEYS = {
        ArrowUp: { row: -1, col: 0 },
        ArrowDown: { row: 1, col: 0 },
        ArrowLeft: { row: 0, col: -1 },
        ArrowRight: { row: 0, col: 1 },
      };
      if (ARROW_KEYS[e.key]) {
        const maxIndex = size === 4 ? 3 : 8;
        const newRow = Math.max(0, Math.min(maxIndex, selectedCell.row + ARROW_KEYS[e.key].row));
        const newCol = Math.max(0, Math.min(maxIndex, selectedCell.col + ARROW_KEYS[e.key].col));
        setSelectedCell({ row: newRow, col: newCol });
      }
    },
    [selectedCell, setSelectedCell, size],
  );

  const handlePhysicalKeyboardInput = useCallback(
    (e) => {
      const value = e.key;
      if (selectedCell.row == null || selectedCell.col == null) {
        return;
      }

      const validInputRegex = size === 4 ? /^[1-4]$/ : /^[1-9]$/;
      if (validInputRegex.test(value)) {
        handleCellChange(selectedCell.row, selectedCell.col, value);
      }
    },
    [selectedCell, handleCellChange, size],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleArrowKeys);
    document.addEventListener("keydown", handlePhysicalKeyboardInput);
    return () => {
      document.removeEventListener("keydown", handleArrowKeys);
      document.removeEventListener("keydown", handlePhysicalKeyboardInput);
    };
  }, [selectedCell, handleArrowKeys, handlePhysicalKeyboardInput]);

  return (
    <div>
      <table className="sudoku-grid mb-4 border border-black">
        <tbody>
          {[...Array(size).keys()]
            .filter((i) => i % Math.sqrt(size) === 0)
            .map((startRow, quadrantRowIndex) => (
              <tr key={quadrantRowIndex}>
                {[...Array(size).keys()]
                  .filter((i) => i % Math.sqrt(size) === 0)
                  .map((startCol, quadrantColIndex) => (
                    <td key={quadrantColIndex} className="border-0 bg-gray-800">
                      <table className={`subgrid ${getQuadrantColor(quadrantRowIndex * Math.sqrt(size) + quadrantColIndex)}`}>
                        {renderSubgrid(startRow, startCol, quadrantRowIndex * Math.sqrt(size) + quadrantColIndex)}
                      </table>
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
      <center>
        <Keypad onKeypadClick={handleKeypadClick} size={size} />
      </center>
    </div>
  );
}

export default Board;
