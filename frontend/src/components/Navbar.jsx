import React, { useState, useRef, useEffect } from 'react';
import Logo from "./Logo";

const Nav = () => {
  const [show4x4Dropdown, setShow4x4Dropdown] = useState(false);
  const [show9x9Dropdown, setShow9x9Dropdown] = useState(false);
  const dropdown4x4Ref = useRef(null);
  const dropdown9x9Ref = useRef(null);

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

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
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
              <ul className="absolute bg-gray-800 p-2 mt-2">
                <li>
                  <a href="#" className="text-white hover:text-gray-300 block">
                    Easy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-300 block">
                    Medium
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-300 block">
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
              <ul className="absolute bg-gray-800 p-2 mt-2">
                <li>
                  <a href="#" className="text-white hover:text-gray-300 block">
                    Easy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-300 block">
                    Medium
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-300 block">
                    Hard
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
