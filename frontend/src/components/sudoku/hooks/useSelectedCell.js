import { useState } from "react";

export function useSelectedCell() {
  const [selectedCell, setSelectedCell] = useState({ row: -1, col: -1 });

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };

  return { selectedCell, setSelectedCell, handleCellClick };
}
