import PropTypes from "prop-types";

function Keypad({ onKeypadClick }) {
  const keypadNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="grid grid-cols-9 md:grid-cols-3">
      {keypadNumbers.map((number) => (
        <div key={number} className="flex justify-center border border-black text-2xl hover:bg-gray-300">
          <button onClick={() => onKeypadClick(number)} className="h-20 w-20 p-4 text-3xl">
            {number}
          </button>
        </div>
      ))}
    </div>
  );
}

Keypad.propTypes = {
  onKeypadClick: PropTypes.func.isRequired,
};
export default Keypad;
