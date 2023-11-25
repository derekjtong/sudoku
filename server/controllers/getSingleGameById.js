//db.games.findOne({ _id: ObjectId("65613d985056fc4f970c8cdf") });

import Game from "../database/gameSchema.js";
import {ObjectId} from "mongodb";


const getSingleGameById = async(req, res) => {
    const gameId = new ObjectId(req.params.id);

    const game = await Game.findOne({
        _id:gameId
    })
    if (!game) {
        return res.json({
            message:"No game found",
        })
    }
    return res.json({ game });

}
export default getSingleGameById;