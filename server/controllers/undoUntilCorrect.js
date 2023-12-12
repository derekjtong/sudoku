import Game from "../database/gameSchema.js";
import { ObjectId } from "mongodb";

const undoUntilCorrect = async (req, res) => {
  console.log("Called undoUntilCorrect for game", req.params.id);
  try {
    const gameId = new ObjectId(req.params.id);
    let game = await Game.findOne({ _id: gameId });

    if (!game || !game.stack || game.stack.length <= 1) {
      console.log("No more moves to undo.");
      return res.json({
        message: "No more moves to undo.",
        board: game ? game.problemBoard : null,
      });
    }

    let isBoardCorrect = false;
    while (!isBoardCorrect && game.stack.length > 1) {
      let currentBoard = game.stack.pop(); // Remove the current state
      let previousBoard = game.stack[game.stack.length - 1]; // Peek at the next state

      isBoardCorrect = checkBoardCorrectness(previousBoard.grid, game.solutionBoard);
      if (isBoardCorrect) {
        await Game.updateOne({ _id: gameId }, { problemBoard: previousBoard.grid, stack: game.stack });
        return res.json({ board: previousBoard });
      }
    }

    console.log("Reached initial state of the game.");
    return res.json({
      message: "Reached initial state of the game.",
      board: game.problemBoard,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

const checkBoardCorrectness = (board, solution) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].value !== solution[i][j]) {
        return false; // Incorrect cell found
      }
    }
  }
  return true; // All cells match the solution
};

export default undoUntilCorrect;
