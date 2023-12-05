import { useEffect, useCallback } from "react";
import Cell from "./Cell";
import Keypad from "./Keypad";
import { getNineBoard } from "../../api/getBoard";
import { useSelectedCell } from "./hooks/useSelectedCell";
import { useSudokuGrid } from "./hooks/useSudokuGrid";

function Board9x9() {
  const { sudokuGrid, handleCellChange } = useSudokuGrid(9);
  const { selectedCell, setSelectedCell, handleCellClick } = useSelectedCell();

  useEffect(() => {
    console.log("getNineBoard");
    getNineBoard().then((data) => console.log(data));
  }, []);

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
                  ${rowIndex === 2 && "border-bottom"}
                  ${colIndex === 2 && "border-right"}
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
        handleCellChange(selectedCell.row, selectedCell.col, "");
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
                <td
                  key={quadrantColIndex}
                  className="subgrid-cell"
                  style={{
                    border: "4px solid green",
                    boxSizing: "border-box",
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
      <center>
        <Keypad onKeypadClick={handleKeypadClick} />
      </center>
    </div>
  );
}

export default Board9x9;
