import checkIfValid from "../helpers/checkIfValid.js";

const getHint = (req, res) => {
  let board = JSON.parse(req.body.board);
  let solution = JSON.parse(req.body.solution);
  let indexes = JSON.parse(req.body.indexes);
  let r = indexes["row"];
  let c = indexes["col"];

  if (r !== -1 && c !== -1) {
    return res.json({ suggestedMove: solution[r][c] });
  }

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

        // If no valid move is found, reset the cell to -1
        board[row][col] = -1;
      }
    }
  }

  // If no empty cell is found, return a response indicating no hint is available
  return res.json({ message: "No hint available", suggestedMove: null });
};

export default getHint;
