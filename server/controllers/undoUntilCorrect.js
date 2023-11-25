import Game from "../database/gameSchema.js";
import stack from "../helpers/stack.js";

const undoUntilCorrect = async(req, res) => {
 const gameId = new ObjectId(req.params.id);
  let stackDb = await Game.findOne({ _id: gameId });
  stackDb = stackDb[ 'stack' ];
  if (stackDb.size() === 0) {
    return res.status(400).json({ error: "Stack is empty." });
  }

  let correct;
  let { grid, booleanValue } = stackDb.peek();

  // Undo changes until a correct state is reached
  while (!booleanValue && stackDb.size() > 0) {
    correct = stackDb.pop();
    ({ grid, booleanValue } = correct);
    
  }
  let updateGame=await Game.updateOne({ _id: gameId }, {problemBoard:grid, stack: stackDb });

  return res.json({
    board: grid, // Use the grid from the last correct state
    game:updateGame
  });
};

export default undoUntilCorrect;
