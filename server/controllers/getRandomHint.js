import checkIfValid from "../helpers/checkIfValid.js";
import { ObjectId } from "mongodb";
import Game from "../database/gameSchema.js";

const checkIfValidInDB = (board, row, col, num) => {
  //check it from the db and see the element is valid or not 
  const solutionBoard = board[ "solutionBoard" ];
  if (solutionBoard[ row ][ col ] === num) {
    return true;
  }
  return false;
}
const getRandomHint = async (req, res) => {
  console.log("Random Hint: ")
  try {
    const gameId = new ObjectId(req.params.id);
    console.log("Game ID: " + gameId)
    let board = await Game.findOne({ _id: gameId });
    // console.log(board["problemBoard"])
    const gridSize = board["problemBoard"].length;
    const badCells = [];

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (board[ "problemBoard" ][ row ][ col ].val !== -1) {
          const num = board[ "problemBoard" ][ row ][ col ].value;
          if (!checkIfValidInDB(board, row, col, num)) {
            badCells.push({ row, col });

          }
        }
      }
    }
    if (badCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * badCells.length);
      const { row, col } = badCells[ randomIndex ];
      return res.json({ suggestedMove: { row, col, num: board["solutionBoard"][row][col] } });
    }
    // incase we dont have the board is empty
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (board["problemBoard"][row][col] === -1) {
            return res.json({ suggestedMove: { row, col, num: board["solutionBoard"][row][col] } });
        }
      }
    }

    return res.json({ message: "No hint available", suggestedMove: null });
  } catch (err) {
    return res.json({ message: "Internal Server Error", error: err });
  }
};

export default getRandomHint;
