import { generateBoard } from "../helpers/generateBoard.js";

export const getNineBoard = (req, res,next) => {
    const id = parseInt(req.params.id);
    if (id !== 9) next();
  const board = generateBoard(9,9);
  //TODO: add it into the db in the future

  res.json({ board: JSON.stringify(board) });
};
