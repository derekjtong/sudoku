import { useEffect, useCallback } from "react";
import Cell from "./Cell";
import Keypad from "./Keypad";
import { getNineBoard } from "../../api/getBoard";
import { useSelectedCell } from "./hooks/useSelectedCell";
import { getSingleGameById } from "../../api/getGame";
import PropTypes from "prop-types";
import { useSudokuBoard } from "../providers/board-provider";

function Board9x9({ currentGameId, setCurrentGameId, showNotes, setShowNotes }) {
  const { sudokuGrid, setSudokuGrid, handleCellChange } = useSudokuBoard(); // Context
  const { selectedCell, setSelectedCell, handleCellClick } = useSelectedCell();

  useEffect(() => {
    const fetchGame = async () => {
      if (currentGameId !== "") {
        // Load existing game
        console.log("Found existing game id in local storage, loading it:", currentGameId);
        const data = await getSingleGameById(currentGameId);
        setSudokuGrid(data.game.problemBoard);
      } else {
        // Load a new game
        console.log("Did not find game id in local storage, load new game:");
        const data = await getNineBoard();
        setSudokuGrid(data.game.problemBoard);
        setCurrentGameId(data.game._id);
        console.log(data.game._id);
      }
    };

    fetchGame();
    console.log("Board9x9 useEffect");
  }, [currentGameId, setCurrentGameId, setSudokuGrid]);

  const handleKeypadClick = (value) => {
    if (selectedCell.row !== null && selectedCell.col !== null) {
      handleCellChange(selectedCell.row, selectedCell.col, {
        value: value.toString(),
        notes: sudokuGrid[selectedCell.row][selectedCell.col].notes,
      });
    }
  };

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
          <tr key={`row-${startRow + rowIndex}`}>
            {[...Array(3)].map((_, colIndex) => {
              const cellObj = sudokuGrid[startRow + rowIndex][startCol + colIndex];
              return (
                <Cell
                  key={`cell-${startRow + rowIndex}-${startCol + colIndex}`}
                  row={startRow + rowIndex}
                  col={startCol + colIndex}
                  cell={cellObj}
                  onChange={(newCell) => handleCellChange(startRow + rowIndex, startCol + colIndex, newCell)}
                  onCellClick={handleCellClick}
                  showNotes={showNotes}
                  isSelected={
                    (startRow + rowIndex === selectedCell.row && startCol + colIndex === selectedCell.col) ||
                    isSelectedQuadrant(startRow + rowIndex, startCol + colIndex)
                  }
                  isPrimarySelected={startRow + rowIndex === selectedCell.row && startCol + colIndex === selectedCell.col}
                  className={`
                  ${rowIndex > 0 && "border-top"}
                  ${colIndex > 0 && "border-left"}
                  ${rowIndex === 2 && "border-bottom"}
                  ${colIndex === 2 && "border-right"}
                  ${getQuadrantColor(quadrantIndex)}
                  ${isSelectedQuadrant(startRow + rowIndex, startCol + colIndex) && "bg-gray-200"}
                  ${startRow + rowIndex === selectedCell.row && startCol + colIndex === selectedCell.col && "bg-red-500 text-white"}
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
        const newRow = Math.max(0, Math.min(8, selectedCell.row + ARROW_KEYS[e.key].row));
        const newCol = Math.max(0, Math.min(8, selectedCell.col + ARROW_KEYS[e.key].col));
        setSelectedCell({ row: newRow, col: newCol });
      }
    },
    [selectedCell, setSelectedCell],
  );

  const handlePhysicalKeyboardInput = useCallback(
    (e) => {
      const value = e.key;
      if (selectedCell.row == null || selectedCell.col == null) {
        return;
      }

      if (/^[1-9]$/.test(value)) {
        handleCellChange(selectedCell.row, selectedCell.col, value);
      } else {
        // Invalid input, do nothing
        // handleCellChange(selectedCell.row, selectedCell.col, "");
      }
    },
    [selectedCell, handleCellChange],
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
          {[0, 3, 6].map((startRow, quadrantRowIndex) => (
            <tr key={quadrantRowIndex}>
              {[0, 3, 6].map((startCol, quadrantColIndex) => (
                <td key={quadrantColIndex} className="border-0 bg-gray-800">
                  <table className={`subgrid ${getQuadrantColor(3 * quadrantRowIndex + quadrantColIndex)}`}>
                    {renderSubgrid(startRow, startCol, 3 * quadrantRowIndex + quadrantColIndex)}
                  </table>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <center>
        <Keypad onKeypadClick={handleKeypadClick} />
      </center>
    </div>
  );
}

Board9x9.propTypes = {
  currentGameId: PropTypes.string.isRequired,
  setCurrentGameId: PropTypes.func.isRequired,
  showNotes: PropTypes.bool.isRequired,
  setShowNotes: PropTypes.func.isRequired,
};
export default Board9x9;
