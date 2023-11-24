import stack from "../helpers/stack";

const undoUntilCorrect = (req, res) => {
  // Check if the stack is empty
  if (stack.size() === 0) {
    return res.status(400).json({ error: "Stack is empty." });
  }

  let correct;
  let { grid, booleanValue } = stack.peek();

  // Undo changes until a correct state is reached
  while (!booleanValue && stack.size() > 0) {
    correct = stack.pop();
    ({ grid, booleanValue } = correct); // Update grid and booleanValue for the next iteration
  }

  return res.json({
    board: grid, // Use the grid from the last correct state
  });
};

export default undoUntilCorrect;
