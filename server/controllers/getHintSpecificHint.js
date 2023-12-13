import Game from "../database/gameSchema.js";
import { ObjectId } from "mongodb";
//{suggestedMove}
const getSpecificHint = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);
    let board = await Game.findOne({ _id: gameId });
    const row = parseInt(req.body.row);
    const col = parseInt(req.body.col);

    board = board["solutionBoard"];

    return res.json({ suggestedMove: board[row][col] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default getSpecificHint;
