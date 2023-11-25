import checkIfValid from "../helpers/checkIfValid.js";
import stack from "../helpers/stack.js";
import Game from "../database/gameSchema.js";
import { ObjectId } from "mongodb";
import updateGame from "../helpers/updateGame.js";

export const deleteElementFromBoard = async(req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);
    //const board = JSON.parse(req.body.board.matrix);
    let board = await Game.findOne({ _id: gameId });
    let stack = board[ "stack" ];
    board = board[ "problemBoard" ];
    
    if (stack.length===0) {
      stack.push({grid:board,booleanValue:checkIfValid(board)});
    }
    

    const row = parseInt(req.body.board.row);
    const col = parseInt(req.body.board.col);

    if (isNaN(row) || isNaN(col) || row < 0 || col < 0 || row >= board.length || col >= board[0].length) {
      // Invalid coordinates
      return res.status(400).json({ error: "Invalid coordinates" });
    }

    if (board[row][col] !== -1) {
      board[row][col] = -1;
      stack.push({ grid: board, booleanValue: checkIfValid(board) });
      updateGame(board, gameId, stack);
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
