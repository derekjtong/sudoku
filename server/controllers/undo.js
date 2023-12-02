import Game from "../database/gameSchema.js";
import { ObjectId } from "mongodb";
// returns board after undo
const undo = async (req, res) => {
  try {
    // Check if the stack is empty
    const gameId = new ObjectId(req.params.id);
    let stackDb = await Game.findOne({ _id: gameId });
    stackDb = stackDb["stack"];
    if (stackDb.length <= 1) {
      return res.status(400).json({ error: "Stack is empty." });
    }
    // Pop an item from the stack
    stackDb.pop();
    const board = stackDb.pop();
    stackDb.push(board);
    await Game.updateOne({ _id: gameId }, { problemBoard: board["grid"], stack: stackDb });
    return res.json({
      board,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default undo;
