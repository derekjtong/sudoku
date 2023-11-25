
const getSpecificHint = async(req, res) => {

  const gameId = new ObjectId(req.params.id);
  let solution = await Game.findOne({ _id: gameId });
  solution = board["solutionBoard"];
  let indexes = JSON.parse(req.body.indexes);
  let r = indexes["row"];
  let c = indexes[ "col" ];
  return res.json({ suggestedMove: solution[ r ][ c ] });
};

export default getSpecificHint;
