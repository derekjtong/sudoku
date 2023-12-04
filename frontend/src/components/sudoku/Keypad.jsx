import PropTypes from "prop-types";

function Keypad({ onKeypadClick }) {
  const keypadNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const keypadTableStyle = {
    borderCollapse: "collapse", // Ensure cell borders collapse
    border: "2px solid green", // Border for the whole table
  };

  const keypadCellStyle = {
    border: "2px solid green", // Border for each cell
  };

  return (
    <table style={keypadTableStyle} className="keypad-table">
      <tbody>
        <tr>
          {keypadNumbers.map((number) => (
            <td key={number} className="keypad-cell" style={keypadCellStyle}>
              <button onClick={() => onKeypadClick(number)} className="keypad-button m-2 border border-black bg-yellow-100 p-2">
                {number}
              </button>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

Keypad.propTypes = {
  onKeypadClick: PropTypes.func.isRequired,
};
export default Keypad;
