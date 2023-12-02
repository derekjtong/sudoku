import PropTypes from "prop-types";

function Cell({ row, col, value, onCellClick, onChange, isSelected }) {
  return (
    <input
      type="text"
      className={`m-0 h-14 w-14 cursor-pointer border border-gray-800 text-center caret-transparent ${isSelected ? "bg-gray-200" : ""}`}
      value={value}
      onChange={onChange}
      onClick={() => onCellClick(row, col)}
      maxLength="1"
    />
  );
}

Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onCellClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default Cell;
