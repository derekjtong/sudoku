import Game from "../database/gameSchema.js";
import { ObjectId } from "mongodb";
import doubleStack from "./doubleStack.js";
//{suggestedMove}
//{0,0}
//indexes: {row: col:}

const getSpecificHint = (board, row, col) => {
  try {
    let solution = board["solutionBoard"];
    const element = solution[row][col];
    return { suggestedMove: { row, col, num: element } };
  } catch (err) {
    return { message: "Internal Server Error", err };
  }
};
const callSpecificHint = async (req, res) => {
  const gameId = new ObjectId(req.params.id);
  let board = await Game.findOne({ _id: gameId });
  let row = parseInt(req.body.row);
  let col = parseInt(req.body.col);
  const { suggestedMove } = getSpecificHint(board, row, col);
  let problemBoard = board["problemBoard"];
  let gameStack = board["stack"];

  problemBoard = await doubleStack(suggestedMove, board, gameId, gameStack);

  return res.json({
    suggestedMove: suggestedMove.num,
    updatedBoard: problemBoard,
  });
};

export default callSpecificHint;
