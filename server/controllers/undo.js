import Game from "../database/gameSchema.js";
import stack from "../helpers/stack.js";

const undo = async(req, res) => {
  // Check if the stack is empty
  const gameId = new ObjectId(req.params.id);
  let stackDb = await Game.findOne({ _id: gameId });
  stackDb = stackDb[ 'stack' ];
  if (stackDb.size() === 0) {
    return res.status(400).json({ error: "Stack is empty." });
  }

  // Pop an item from the stack
  stackDb.pop();
  await Game.updateOne({ _id: gameId }, { problemBoard:board,stack: stackDb });
  const { grid } = stackDb.peek();
  return res.json({
    board: grid, // Use the grid from the popped state
  });
};

export default undo;
