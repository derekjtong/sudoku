import Logo from "./Logo";

const Nav = () => {
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
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              4 x 4
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              9 x 9
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
