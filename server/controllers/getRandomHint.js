import checkIfValid from "../helpers/checkIfValid.js";

const getRandomHint = (req, res) => {
  let board = JSON.parse(req.body.board);
    
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      // Find an empty cell
      if (board[row][col] === -1) {
        // Try placing a number from 1 to gridSize
        for (let num = 1; num <= board.length; num++) {
          // Check if the move is valid
          board[row][col] = num;
          if (checkIfValid(board)) {
            // If valid, return the suggested move
            return res.json({ suggestedMove: { row, col, num } });
          }
        }

      }
    }
  }

  // If no empty cell is found, return a response indicating no hint is available
  return res.json({ message: "No hint available", suggestedMove: null });
};

export default getRandomHint;
