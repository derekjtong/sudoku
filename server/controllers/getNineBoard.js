import { generateBoard } from "../helpers/generateBoard.js";

export const getNineBoard = (req, res, next) => {
  const id = parseInt(req.params.id);

  // Check if id is not equal to 9
  if (id !== 9) {
    // Assuming you want to skip the rest of the middleware stack
    return next();
    // If you want to send a response, use res.status().json() here
  }

  // Generate a 9x9 Sudoku board and its solution
  const dic = generateBoard(9, 9);
  const board = dic["cell"];
  const solution = dic["solution"];

  // Send the response
  res.json({ board, solution });
};
