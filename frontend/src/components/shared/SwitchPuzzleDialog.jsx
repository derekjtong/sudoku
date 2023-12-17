// Kayla
import PropTypes from "prop-types";

const SwitchPuzzleDialog = ({ onCancel, onContinue }) => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-md bg-white p-8 shadow-md">
        <p className="mb-4 text-lg font-semibold">Switching puzzles</p>
        <p>Your progress will be lost. Are you sure you want to continue?</p>
        <div className="mt-6 flex justify-end">
          <button className="mr-2 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600" onClick={onCancel}>
            Cancel
          </button>
          <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" onClick={() => onContinue()}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

SwitchPuzzleDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
};

export default SwitchPuzzleDialog;
