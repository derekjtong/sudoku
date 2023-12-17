// Derek
import logo from "../../assets/sudoku-white-small.png";

// Free for personal and commercial use with attribution
// www.flaticon.com/free-icon/sudoku_5190595

function Logo() {
  return (
    <a className="flex items-center" href="/">
      <img className="mr-4" src={logo} />
      <a className="text-4xl font-bold text-white hover:text-gray-300">Sudoku</a>
    </a>
  );
}

export default Logo;
