
const Nav = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo or brand */}
                <div className="text-white text-lg font-bold">SUDOKU</div>

                {/* Navigation links */}
                <ul className="flex space-x-4">
                    <li>
                        <a href="#" className="text-white hover:text-gray-300">New Game:</a>
                    </li>
                    <li>
                        <a href="#" className="text-white hover:text-gray-300">Easy:4*4</a>
                    </li>
                    <li>
                        <a href="#" className="text-white hover:text-gray-300">Middle:6*6</a>
                    </li>
                    <li>
                        <a href="#" className="text-white hover:text-gray-300">Diffcult:9*9</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};


export default Nav;