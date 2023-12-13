// Board.jsx
import { useEffect, useCallback } from "react";
import Cell from "./Cell";
import { getFourBoard, getNineBoard } from "../../api/getBoard";
import Keypad from "./Keypad"; // Ensure this is adaptable for different sizes
import { useSelectedCell } from "./hooks/useSelectedCell";
import { getSingleGameById } from "../../api/getGame";
import PropTypes from "prop-types";
import { useSudokuBoard } from "../providers/board-provider";

Board.propTypes = {
  size: PropTypes.number.isRequired, // Add prop validation for size
};

function Board({ size, currentGameId, setCurrentGameId, showNotes }) {
  const { sudokuGrid, setSudokuGrid, handleCellChange } = useSudokuBoard(size);
  const { selectedCell, setSelectedCell, handleCellClick } = useSelectedCell();

  useEffect(() => {
    const fetchGame = async () => {
      if (currentGameId !== "") {
        // Load existing game
        console.log("Found existing game id in local storage, loading it:", currentGameId);
        const data = await getSingleGameById(currentGameId);
        setSudokuGrid(data.game.problemBoard);
      } else {
        // Load a new game based on the size
        console.log(`Loading new ${size}x${size} game`);
        const fetchBoard = size === 4 ? getFourBoard : getNineBoard;
        const data = await fetchBoard();
        setSudokuGrid(data.game.problemBoard);
        setCurrentGameId(data.game._id);
        console.log(data.game._id);
      }
    };

    fetchGame();
  }, [size, currentGameId, setCurrentGameId, setSudokuGrid]);

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

    // Safety check to ensure sudokuGrid has the expected structure
    const isGridValid = sudokuGrid.length === size && sudokuGrid.every((row) => row.length === size);
    if (!isGridValid) {
      console.error("Invalid sudoku grid structure");
      return null; // or return a placeholder component
    }

    return (
      <tbody key={`subgrid-${startRow}-${startCol}`}>
        {[...Array(subgridSize)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {[...Array(subgridSize)].map((_, colIndex) => {
              const cellRow = startRow + rowIndex;
              const cellCol = startCol + colIndex;
              const cellValue = sudokuGrid[cellRow][cellCol];

              // Create the cell object here
              const cell = {
                value: cellValue, // assuming cellValue is a string here
                notes: [], // replace with actual notes if available
              };
              return (
                <Cell
                  key={`${cellRow}-${cellCol}`}
                  row={cellRow}
                  col={cellCol}
                  value={cellValue}
                  cell={cell}
                  onChange={(value) => handleCellChange(cellRow, cellCol, value)}
                  onCellClick={handleCellClick}
                  showNotes={showNotes}
                  isSelected={cellRow === selectedCell.row || cellCol === selectedCell.col || isSelectedQuadrant(cellRow, cellCol)}
                  isPrimarySelected={cellRow === selectedCell.row && cellCol === selectedCell.col}
                  className={`
                  ${rowIndex > 0 && "border-top"}
                  ${colIndex > 0 && "border-left"}
                  ${rowIndex === subgridSize - 1 && "border-bottom"}
                  ${colIndex === subgridSize - 1 && "border-right"}
                  ${getQuadrantColor(quadrantIndex)}
                  ${isSelectedQuadrant(cellRow, cellCol) && "bg-gray-200"}
                  ${cellRow === selectedCell.row && cellCol === selectedCell.col && "bg-red-500 text-white"}
                `}
                />
              );
            })}
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
Board.propTypes = {
  currentGameId: PropTypes.string.isRequired,
  setCurrentGameId: PropTypes.func.isRequired,
  showNotes: PropTypes.bool.isRequired,
  setShowNotes: PropTypes.func.isRequired,
};
export default Board;
