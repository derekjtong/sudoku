import { generateBoard } from "../helpers/generateBoard.js";

export const getFourBoard = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (id !== 4) return next();

  try {
    const dic = generateBoard(4, 4);
    const board = dic["cell"];
    const solution = dic["solution"];

    res.json({ board, solution });
  } catch (error) {
    console.error("Error generating the board:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
