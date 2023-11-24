import stack from "../helpers/stack.js";

const undo = (req, res) => {
  // Check if the stack is empty
  if (stack.size() === 0) {
    return res.status(400).json({ error: "Stack is empty." });
  }

  // Pop an item from the stack
  const { grid } = stack.pop();

  return res.json({
    board: grid, // Use the grid from the popped state
  });
};

export default undo;
