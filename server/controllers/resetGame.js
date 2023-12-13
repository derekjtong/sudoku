import Game from "../database/gameSchema.js";
import { ObjectId } from "mongodb";
import updateGame from "../helpers/updateGame.js";

const resetGame = async (req, res) => {
  // TODO: Undo until stack empty instead of this
  try {
    const gameId = new ObjectId(req.params.id);
    const game = await Game.findOne({
      _id: gameId,
    });
    const stack = game["stack"];
    const noteMode = game["noteMode"];
    const problemBoard = game["problemBoard"];
    problemBoard.forEach((arr) => {
      arr.forEach((obj) => {
        obj.value = -1;
        // TODO: Less notes for a 4x4 dimension grid
        obj.notes = [[], [], []];
      });
    });
    console.log(problemBoard);
    updateGame(problemBoard, gameId, stack, noteMode);
    return res.json({
      problemBoard,
    });
  } catch (err) {
    return res.json({
      message: "Internal Server Error",
      err,
    });
  }
};
export default resetGame;
