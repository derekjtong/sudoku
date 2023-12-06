import PropTypes from "prop-types";

function Keypad({ onKeypadClick, size }) {
  // Generate keypad numbers based on the board size
  const keypadNumbers = Array.from({ length: size }, (_, i) => i + 1);

  return (
    <table>
      <tbody>
        <tr>
          {keypadNumbers.map((number) => (
            <td key={number} className="border border-black hover:bg-gray-300">
              <button onClick={() => onKeypadClick(number.toString())} className="p-4 text-2xl">
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
  size: PropTypes.number.isRequired,
};

export default Keypad;
