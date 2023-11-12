//the frontend passes the element which have to be added and the coordinates
import checkIfValid from "../helpers/checkIfValid.js";
export const deleteElementFromBoard = (req, res) => {
  const board = JSON.parse(req.body.board.matrix);
  const row = parseInt(req.body.board.row);
    const col = parseInt(req.body.board.col);
    if (board[ row ][ col ] !== -1) {
        board[ row ][ col ] = -1;
    }
    return res.json({
        "valid": true,
        board
    })

};
