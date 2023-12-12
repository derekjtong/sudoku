import PropTypes from "prop-types";

function Cell({ row, col, cell, onCellClick, onChange, isSelected, isPrimarySelected, showNotes }) {
  // TODO: add notes
  const { value, notes } = cell;

  if (showNotes) {
    console.log(notes);
  }

  const handleOnChange = (e) => {
    // Construct a new cell object with the updated value
    const updatedCell = {
      ...cell, // Copy the existing cell object
      value: e.target.value, // Update the value
    };
    onChange(updatedCell);
  };

  return (
    <input
      type="text"
      className={`m-0 h-14 w-14 cursor-default border border-gray-800 text-center caret-transparent focus:outline-none ${
        isSelected ? "bg-gray-200" : ""
      } ${isPrimarySelected ? "bg-gray-400 text-white" : ""}`}
      value={value}
      onChange={handleOnChange}
      onClick={() => onCellClick(row, col)}
      maxLength="1"
    />
  );
}

Cell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  cell: PropTypes.shape({
    value: PropTypes.number.isRequired,
    notes: PropTypes.arrayOf(PropTypes.array).isRequired,
  }).isRequired,
  onCellClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isPrimarySelected: PropTypes.bool.isRequired,
  showNotes: PropTypes.bool.isRequired,
};

export default Cell;
