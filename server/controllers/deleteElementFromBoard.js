import checkIfValid from "../helpers/checkIfValid.js";
import stack from "../helpers/stack.js";

export const deleteElementFromBoard = (req, res) => {
  try {
    const board = JSON.parse(req.body.board.matrix);
    stack.push(board, checkIfValid(board));

    const row = parseInt(req.body.board.row);
    const col = parseInt(req.body.board.col);

    if (isNaN(row) || isNaN(col) || row < 0 || col < 0 || row >= board.length || col >= board[0].length) {
      // Invalid coordinates
      return res.status(400).json({ error: "Invalid coordinates" });
    }

    if (board[row][col] !== -1) {
      board[row][col] = -1;
      stack.push(board, checkIfValid(board));
    }

    return res.json({
      valid: true,
      board,
    });
  } catch (error) {
    console.error("Error deleting element from the board:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
