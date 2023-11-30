import express from 'express';
import { getFourBoard } from '../controllers/getFourBoard.js';
import { getNineBoard } from '../controllers/getNineBoard.js';

const router = express.Router();

// router.get("/getBoard", (req, res) => {
//     res.json(res.body.matrix);
// })
router.get("/newboard/:id", getFourBoard);
router.get("/newboard/:id", getNineBoard);

export default router;