import express from "express";
import listAllGamesInDb from "../controllers/listAllGamesInDb.js";

const gamesRouter = express.Router();

gamesRouter.get('/getallgames', listAllGamesInDb);

export default gamesRouter;