import mongoose from "mongoose";
import Game from "../database/gameSchema.js";



const listAllGamesInDb = async(req, res) => {
    const games = await Game.find();
    
    return res.json({
        games
    })
}

export default listAllGamesInDb;