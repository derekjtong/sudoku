import PropTypes from "prop-types";

function Keypad({ onKeypadClick }) {
  const keypadNumbers = ["1", "2", "3", "4"];

  return (
    <table>
      <tbody>
        <tr>
          {keypadNumbers.map((number) => (
            <td key={number} className="border border-black hover:bg-gray-300">
              <button onClick={() => onKeypadClick(number)} className="p-4 text-2xl">
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
