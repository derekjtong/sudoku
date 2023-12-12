import { useCallback, useEffect } from "react";
import Cell from "./Cell";
import Keypad from "./Keypad4x4";
import { getFourBoard } from "../../api/getBoard";
import { useSelectedCell } from "./hooks/useSelectedCell";
import { useSudokuGrid } from "./hooks/useSudokuGrid";
import { getSingleGameById } from "../../api/getGame";
import PropTypes from "prop-types";

function Board4x4({ currentGameId, setCurrentGameId }) {
  const { sudokuGrid, setSudokuGrid, handleCellChange } = useSudokuGrid(4);
  const { selectedCell, setSelectedCell, handleCellClick } = useSelectedCell();

  useEffect(() => {
    const fetchGame = async () => {
      if (currentGameId !== "") {
        // Load existing game
        console.log("Found existing game id in local storage, loading it:", currentGameId);
        const data = await getSingleGameById(currentGameId);
        const loadedBoard = data.game.problemBoard.map((row) => row.map((cell) => cell.value.toString()));
        setSudokuGrid(loadedBoard);
      } else {
        // Load a new game
        console.log("Did not find game id in local storage, load new game:");
        const data = await getFourBoard();
        const loadedBoard = data.game.problemBoard.map((row) => row.map((cell) => cell.value.toString()));
        setSudokuGrid(loadedBoard);
        setCurrentGameId(data.game._id);
        console.log(data.game._id);
      }
    };
    fetchGame();
    console.log("Board4x4 useEffect");
  }, [currentGameId, setCurrentGameId, setSudokuGrid]);

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
                isPrimarySelected={startRow + rowIndex === selectedCell.row && startCol + colIndex === selectedCell.col}
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

  const handleArrowKeys = useCallback(
    (e) => {
      const ARROW_KEYS = {
        ArrowUp: { row: -1, col: 0 },
        ArrowDown: { row: 1, col: 0 },
        ArrowLeft: { row: 0, col: -1 },
        ArrowRight: { row: 0, col: 1 },
      };
      if (ARROW_KEYS[e.key]) {
        const newRow = Math.max(0, Math.min(3, selectedCell.row + ARROW_KEYS[e.key].row));
        const newCol = Math.max(0, Math.min(3, selectedCell.col + ARROW_KEYS[e.key].col));
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

      if (/^[1-4]$/.test(value)) {
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
          {[0, 2].map((startRow, quadrantRowIndex) => (
            <tr key={quadrantRowIndex}>
              {[0, 2].map((startCol, quadrantColIndex) => (
                <td key={quadrantColIndex} className="border-0 bg-gray-800">
                  <table className={`subgrid ${getQuadrantColor(2 * quadrantRowIndex + quadrantColIndex)}`}>
                    {renderSubgrid(startRow, startCol, 2 * quadrantRowIndex + quadrantColIndex)}
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

Board4x4.propTypes = {
  currentGameId: PropTypes.string.isRequired,
  setCurrentGameId: PropTypes.func.isRequired,
};

export default Board4x4;
