
const getSpecificHint = (req, res) => {
  let solution = JSON.parse(req.body.solution);
  let indexes = JSON.parse(req.body.indexes);
  let r = indexes["row"];
  let c = indexes[ "col" ];
  return res.json({ suggestedMove: solution[ r ][ c ] });
};

export default getSpecificHint;
