//the frontend passes the element which have to be added and the coordinates
import checkIfValid from "../helpers/checkIfValid.js";
import Game from "../database/gameSchema.js";
import updateGame from "../helpers/updateGame.js";
import { ObjectId } from "mongodb";

export const addElementIntoBoard = async(req, res) => {

  const gameId = new ObjectId(req.params.id);
  let board = await Game.findOne({ _id: gameId });
  let stack = board[ 'stack' ];
  board = board[ 'problemBoard' ];
  const row = parseInt(req.body.row);
  const col = parseInt(req.body.col);
  const element = parseInt(req.body.element);
  console.log(row,col,element)
  if (stack.length===0) {
    // stack.push({ board, checkIfValid(board) });
    stack.push({grid:board, booleanValue:checkIfValid(board)})
  }
    board[row][col] = element;
    stack.push({ grid: board, booleanValue: checkIfValid(board) });
    updateGame(board, gameId, stack);
  // console.log(board, row, col, element);
  for (let i = 0; i < board.length; i++) {
    //check in row
    if (board[ i ][ col ] === element) {
      console.log('first');
      return res.json({
        valid: false,
      });
    }
    if (board[ col ][ i ] === element) {
      console.log("second");
      return res.json({
        valid: false,
      });
    }
    if (board[Math.floor(3 * (row / 3) + i / 3)][Math.floor(3 * (col / 3) + (i % 3))] === element) {
      console.log("third");
      return res.json({
        valid: false,
      });
    }
  }

  
  if (checkIfValid(board) === false) {
    return res.json({
      valid: false,
    });
  }

  return res.json({
    valid: true,
    board,
    stack
  });
};
