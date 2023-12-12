//the frontend passes the element which have to be added and the coordinates
import checkIfValid from "../helpers/checkIfValid.js";
import Game from "../database/gameSchema.js";
import updateGame from "../helpers/updateGame.js";
import { ObjectId } from "mongodb";
// json output: valid:either true or false
// valid: true means the added element wont cause any problem and the puzzle is in the suitable position
// but not might not be in the exact position
export const addElementIntoBoard = async (req, res) => {
  console.log("In add element")
  try {
    const gameId = new ObjectId(req.params.id);
    console.log("Game ID: " + gameId)
    let board = await Game.findOne({ _id: gameId });
    let stack = board["stack"];
    board = board["problemBoard"];
    const row = parseInt(req.body.row);
    console.log("body: " + req.body)
    console.log("row: " + row)
    const col = parseInt(req.body.col);
    console.log("col: " + col)
    const element = parseInt(req.body.element);
    console.log("element: " + element)

    if (stack.length === 0) {
      stack.push({ grid: board, booleanValue: checkIfValid(board) });
    }
    board[row][col]['value'] = element;
    stack.push({ grid: board, booleanValue: checkIfValid(board) });
    updateGame(board, gameId, stack);

    for (let i = 0; i < board.length; i++) {
      //check in row
      if (board[i][col].val === element) {
        return res.json({
          valid: false,
          board,
          stack,
        });
      }
      //check in col
      if (board[col][i].val === element) {
        return res.json({
          valid: false,
          board,
          stack,
        });
      }
      //check in the block
      if (board[Math.floor(3 * (row / 3) + i / 3)][Math.floor(3 * (col / 3) + (i % 3))].val === element) {
        return res.json({
          valid: false,
          board,
          stack,
        });
      }
    }

    if (checkIfValid(board) === false) {
      return res.json({
        valid: false,
        board,
        stack,
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
