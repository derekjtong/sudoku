// Cell.js
import React from "react";

function Cell({ row, col, value, onCellClick, onChange, isSelected }) {
  return (
    <input
      type="text"
      className={`m-1 h-10 w-10 border border-gray-800 text-center ${isSelected ? "bg-gray-200" : ""}`}
      value={value}
      onChange={onChange}
      onClick={() => onCellClick(row, col)}
      maxLength="1"
    />
  );
}

export default Cell;
