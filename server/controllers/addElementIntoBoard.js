//the frontend passes the element which have to be added and the coordinates
import checkIfValid from "../helpers/checkIfValid.js";
import { getDb } from '../../database/databas.js'; // Adjust the path as necessary
export const addElementIntoBoard = (req, res) => {
  console.log("before");
  const board = JSON.parse(req.body.board.matrix);
  // console.log("after")
  const row = parseInt(req.body.board.row);
  const col = parseInt(req.body.board.col);
  const element = parseInt(req.body.board.element);

  // console.log(board, row, col, element);
  for (let i = 0; i < board.length; i++) {
    //check in row
    if (board[i][col] === element) {
      return res.json({
        valid: false,
      });
    }
    if (board[col][i] === element) {
      return res.json({
        valid: false,
      });
    }
    if (board[Math.floor(3 * (row / 3) + i / 3)][Math.floor(3 * (col / 3) + (i % 3))] === element) {
      return res.json({
        valid: false,
      });
    }
  }
  board[row][col] = element;
  if (checkIfValid(board) === false) {
    return res.json({
      valid: false,
    });
  }
  return res.json({
    valid: true,
    board,
  });
};
