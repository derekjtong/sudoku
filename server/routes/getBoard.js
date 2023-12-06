import express from "express";
import { getFourBoard } from "../controllers/getFourBoard.js";
import { getNineBoard } from "../controllers/getNineBoard.js";

const boardRouter = express.Router();

boardRouter.get("/getBoard", (req, res) => {
    res.json(res.body.matrix);
})
boardRouter.get("/newboard/:id", getFourBoard);
boardRouter.get("/newboard/:id", getNineBoard);

export default boardRouter;
