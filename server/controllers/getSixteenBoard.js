import { generateBoard } from "../helpers/generateBoard.js";

export const getSixteenBoard = (req, res,next) => {
    const id = parseInt(req.params.id);
    if (id !== 16) return;
  const board = generateBoard(16,16);
    //TODO: add it into the db in the future
    
  res.json({ board: JSON.stringify(board) });
};