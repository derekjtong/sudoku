import Game from "../database/gameSchema.js";
import { ObjectId } from "mongodb";

const undo = async(req, res) => {
  // Check if the stack is empty
  const gameId = new ObjectId(req.params.id);
  let stackDb = await Game.findOne({ _id: gameId });
  stackDb = stackDb[ 'stack' ];
  if (stackDb.length <= 1) {
    return res.status(400).json({ error: "Stack is empty." });
  }
  // Pop an item from the stack
  stackDb.pop();
  const board = stackDb.pop();
  stackDb.push(board);
  await Game.updateOne({ _id: gameId }, { problemBoard:board['grid'],stack: stackDb });
  return res.json({
    board
  });
};

export default undo;
