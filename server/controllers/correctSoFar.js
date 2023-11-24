import checkIfValid from "../helpers/checkIfValid.js";

export const correctSoFar = (req, res) => {
  try {
    const board = JSON.parse(req.body.board.matrix);

    if (!Array.isArray(board) || board.length === 0 || !board.every((row) => Array.isArray(row))) {
      // Invalid board structure
      return res.status(400).json({ error: "Invalid board structure" });
    }

    const isValid = checkIfValid(board);

    return res.json({ valid: isValid });
  } catch (error) {
    console.error("Error checking if the board is correct so far:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
