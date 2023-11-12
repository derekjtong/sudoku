import { generateBoard } from "../helpers/generateBoard.js";

export const getFourBoard = (req, res,next) => {
    const id = parseInt(req.params.id);
    if (id !== 4) next();
    const board = generateBoard(4,4);
    //TODO: add it into the db in the future
    
    res.json({ "board": JSON.stringify(board)});
};
