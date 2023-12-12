import { useState } from "react";

export function useSelectedCell() {
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };

  return { selectedCell, setSelectedCell, handleCellClick };
}
