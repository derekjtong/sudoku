//the frontend passes the element which have to be added and the coordinates
import checkIfValid from "../helpers/checkIfValid.js";
export const correctSoFar = (req, res) => {
  const board = JSON.parse(req.body.board.matrix);
  
  return res.json({"valid": checkIfValid(board) });
};
