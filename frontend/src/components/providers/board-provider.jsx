import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import { useSudokuGrid } from "../sudoku/hooks/useSudokuGrid";
import { useSelectedCell } from "../sudoku/hooks/useSelectedCell";

const SudokuBoardContext = createContext();

export const useSudokuBoard = () => useContext(SudokuBoardContext);

export const SudokuBoardProvider = ({ size, currentGameId, children }) => {
  const sudokuBoard = useSudokuGrid(size, currentGameId);
  const selectedCell = useSelectedCell();

  const contextValue = {
    ...sudokuBoard,
    ...selectedCell,
  };
  return <SudokuBoardContext.Provider value={contextValue}>{children}</SudokuBoardContext.Provider>;
};

SudokuBoardProvider.propTypes = {
  size: PropTypes.number.isRequired,
  currentGameId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
