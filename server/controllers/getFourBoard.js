import { generateBoard } from "../helpers/generateBoard.js";
import createGame from "../helpers/createGame.js";

export const getFourBoard = async (req, res, next) => {
  const id = parseInt(req.params.id);
  // Check if id is not equal to 9
  if (id !== 9) {
    // Assuming you want to skip the rest of the middleware stack
    return {
      message: "Bad request",
    };
    // If you want to send a response, use res.status().json() here
  }
  if (id === 4) {
    // Generate a 9x9 Sudoku board and its solution
    const dic = generateBoard(4, 4);

    const board = dic["cell"];
    const solution = dic["solution"];
    const game = await createGame(board, solution, 4, []);

    res.json({ game });
  }
};
