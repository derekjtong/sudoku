// Derek
import { useEffect, useState } from "react";

export function useSelectedCell() {
  const [selectedCell, setSelectedCell] = useState({ row: -1, col: -1 });

  useEffect(() => {
    console.log("Selected sell:", selectedCell.row, selectedCell.col);
  }, [selectedCell]);
  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };

  return { selectedCell, setSelectedCell, handleCellClick };
}
