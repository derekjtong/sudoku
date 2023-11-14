import checkIfValid from "../helpers/checkIfValid.js";

const getHint = (req, res) => {
    
    let board = JSON.parse(req.body.board);
    console.log(board)
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      // Find an empty cell
      if (board[row][col] === -1) {
        // Try placing a number from 1 to gridSize
          for (let num = 1; num <= board.length; num++) {
              board[ row ][ col ] = num;
          // Check if the move is valid
          if (checkIfValid(board)) {
            // If valid, return the suggested move
            return res.json({ row, col, num });
          }
        }
      }
    }
  }

  // If no empty cell is found, return null (board is full or invalid)
  return res.json({ message: "filled", status: false });
}
export default getHint;
