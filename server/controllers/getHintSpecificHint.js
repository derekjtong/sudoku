import Game from "../database/gameSchema";
import { ObjectId } from "mongodb";
//{suggestedMove}
const getSpecificHint = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);
    let solution = await Game.findOne({ _id: gameId });
    solution = board["solutionBoard"];
    let indexes = JSON.parse(req.body.indexes);
    let r = indexes["row"];
    let c = indexes["col"];
    return res.json({ suggestedMove: solution[r][c] });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default getSpecificHint;
