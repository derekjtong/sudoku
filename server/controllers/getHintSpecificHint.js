import Game from "../database/gameSchema.js";
import { ObjectId } from "mongodb";
//{suggestedMove}
const getSpecificHint = async (req, res) => {
  console.log("SPECIFIC HINT: ")
  try {
    const gameId = new ObjectId(req.params.id);
    
    console.log("Game ID: " + gameId)
    let solution = await Game.findOne({ _id: gameId });
    console.log("Solution: " + solution)
    solution = board["solutionBoard"];
    console.log("Solution: " + solution)
    let indexes = JSON.parse(req.body.indexes);
    let r = indexes["row"];
    let c = indexes["col"];
    return res.json({ suggestedMove: solution[r][c] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default getSpecificHint;

