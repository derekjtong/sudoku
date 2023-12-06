import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import Logo from "./Logo";


const SwitchPuzzleDialog = ({ onCancel, onContinue }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md">
        <p className="text-lg font-semibold mb-4">Switching puzzles</p>
        <p>Your progress will be lost. Are you sure you want to continue?</p>
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 mr-2 text-white bg-gray-500 hover:bg-gray-600 rounded" onClick={onCancel}>
            Cancel
          </button>
          <button className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded" onClick={onContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ setBoardDimension, setDifficulty }) => {
  const [show4x4Dropdown, setShow4x4Dropdown] = useState(false);
  const [show9x9Dropdown, setShow9x9Dropdown] = useState(false);
  const dropdown4x4Ref = useRef(null);
  const dropdown9x9Ref = useRef(null);
  const [showSwitchPuzzleDialog, setShowSwitchPuzzleDialog] = useState(false);

  const toggle4x4Dropdown = () => {
    setShow4x4Dropdown(!show4x4Dropdown);
    setShow9x9Dropdown(false); // Hide 9x9 dropdown if open
  };

  const toggle9x9Dropdown = () => {
    setShow9x9Dropdown(!show9x9Dropdown);
    setShow4x4Dropdown(false); // Hide 4x4 dropdown if open
  };

  const handleClickOutside = (event) => {
    if (
      dropdown4x4Ref.current &&
      !dropdown4x4Ref.current.contains(event.target) &&
      dropdown9x9Ref.current &&
      !dropdown9x9Ref.current.contains(event.target)
    ) {
      setShow4x4Dropdown(false);
      setShow9x9Dropdown(false);
    }
  };

  const handleDifficultyChange = (dimension, difficulty) => {
    console.log("Attempting to change difficulty...");
    setShowSwitchPuzzleDialog(true);
    console.log("Progress exists, showing dialog.");
    setBoardDimension(dimension);
    setDifficulty(difficulty);
  };

  console.log("showSwitchPuzzleDialog value:", showSwitchPuzzleDialog);

  const handleContinueSwitchPuzzle = () => {
    // Logic to continue switching puzzles
    setShowSwitchPuzzleDialog(false);
  };

  const handleCancelSwitchPuzzle = () => {
    setShowSwitchPuzzleDialog(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo or brand */}
        <Logo />

        {/* Navigation links */}
        <ul className="flex space-x-4 text-2xl">
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              New Game
            </a>
          </li>
          <li ref={dropdown4x4Ref}>
            <a href="#" className="text-white hover:text-gray-300" onClick={toggle4x4Dropdown}>
              4 x 4
            </a>
            {show4x4Dropdown && (
              <ul className="absolute mt-2 bg-gray-800 p-2">
                <li>
                  <a href="#" className="block text-white hover:text-gray-300" onClick={() => handleDifficultyChange(4, 1)}>
                    Easy
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-white hover:text-gray-300" onClick={() => handleDifficultyChange(4, 2)}>
                    Medium
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-white hover:text-gray-300" onClick={() => handleDifficultyChange(4, 3)}>
                    Hard
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li ref={dropdown9x9Ref}>
            <a href="#" className="text-white hover:text-gray-300" onClick={toggle9x9Dropdown}>
              9 x 9
            </a>
            {show9x9Dropdown && (
              <ul className="absolute mt-2 bg-gray-800 p-2">
                <li>
                  <a href="#" className="block text-white hover:text-gray-300" onClick={() => handleDifficultyChange(9, 1)}>
                    Easy
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-white hover:text-gray-300" onClick={() => handleDifficultyChange(9, 2)}>
                    Medium
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-white hover:text-gray-300" onClick={() => handleDifficultyChange(9, 3)}>
                    Hard
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      {/* Switch Puzzle Dialog */}
      {showSwitchPuzzleDialog && (
        <SwitchPuzzleDialog onCancel={handleCancelSwitchPuzzle} onContinue={handleContinueSwitchPuzzle} />
      )}
    </nav>
  );
};

Navbar.propTypes = {
  setBoardDimension: PropTypes.func.isRequired,
  setDifficulty: PropTypes.func.isRequired,
};

export default Navbar;
