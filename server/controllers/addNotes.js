import Game from "../database/gameSchema.js";
import { ObjectId } from "mongodb";

const addNotes = async (req, res) => {
    try {
        // note mode on
        //coordinate of the board 
        const gameId = new ObjectId(req.params.id);
        const game = await Game.findOne({ _id: gameId });
        const noteMode = game[ "noteMode" ];
        if (noteMode) {
            const problemBoard = game[ "problemBoard" ];
            const dimension = game[ "dimension" ];
            const stack = game[ "stack" ];
            const row = parseInt(req.body.row);
            const col = parseInt(req.body.col);
            const element = parseInt(req.body.element);
            let cell = problemBoard[ row ][ col ].notes;
            cell.forEach((cellRow) => {
                if (cellRow.length < dimension-1) {
                    cellRow.push(element)
                }
            })
            await game.save();
            return res.json({
                game
            })
        }
        return res.json({
            message: "Turn on the game mode!"
        })
    }
    catch (err) {
        console.log(err);
        return res.json({
            message: "Internal server error",
            err
        })
    }

}


export default addNotes;