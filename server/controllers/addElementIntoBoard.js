//the frontend passes the element which have to be added and the coordinates
import { getDb } from "../database/database.js";
import checkIfValid from "../helpers/checkIfValid.js";
import { getDb } from '../../database/databas.js'; // Adjust the path as necessary
export const addElementIntoBoard = (req, res) => {
  console.log("before");
  const board = JSON.parse(req.body.board.matrix);
  // console.log("after")
  const row = parseInt(req.body.board.row);
  const col = parseInt(req.body.board.col);
  const element = parseInt(req.body.board.element);

    if (stack.length === 0) {
      stack.push({ grid: board, booleanValue: checkIfValid(board) });
    }
    board[row][col] = element;
    stack.push({ grid: board, booleanValue: checkIfValid(board) });
    updateGame(board, gameId, stack);

    for (let i = 0; i < board.length; i++) {
      //check in row
      if (board[i][col] === element) {
        return res.json({
          valid: false,
        });
      }
      //check in col
      if (board[col][i] === element) {
        return res.json({
          valid: false,
        });
      }
      //check in the block
      if (board[Math.floor(3 * (row / 3) + i / 3)][Math.floor(3 * (col / 3) + (i % 3))] === element) {
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
      stack,
    });
  } catch (err) {
    console.log(err, "On addElementBoard");
    return res.status(500).json({
      message: "Interal Server error",
    });
  }
};
