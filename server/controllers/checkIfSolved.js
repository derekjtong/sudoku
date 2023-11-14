//the frontend passes the element which have to be added and the coordinates
import checkIfValid from "../helpers/checkIfValid.js";
export const checkIfSolved = (req, res) => {
  
    const board = JSON.parse(req.body.board);
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[ 0 ].length; j++) {
            if (board[ i ][ j ] === -1) {
                return res.json({ "isSolved": false });
          }
        }
    }

    return res.json({ "isSolved": true,"valid": checkIfValid(board)});
}