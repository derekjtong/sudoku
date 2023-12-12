import checkIfValid from "../helpers/checkIfValid.js";
import { ObjectId } from "mongodb";
import Game from "../database/gameSchema.js";
// suggestedMove{row,col,num}
const getRandomHint = async (req, res) => {
  console.log("Random Hint: ")
  try {
    const gameId = new ObjectId(req.params.id);
    console.log("Game ID: " + gameId)
    let board = await Game.findOne({ _id: gameId });
    board = board["problemBoard"];

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
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default getRandomHint;
