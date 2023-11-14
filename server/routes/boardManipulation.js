import express from 'express';
import { addElementIntoBoard } from '../controllers/addElementIntoBoard.js';
import { deleteElementFromBoard } from '../controllers/deleteElementFromBoard.js';
import { checkIfSolved } from '../controllers/checkIfSolved.js';
import { correctSoFar } from '../controllers/correctSoFar.js';
import getHint from '../controllers/getHint.js';
const router = express.Router();

router.post('/addelement', addElementIntoBoard);
router.post("/deleteelement", deleteElementFromBoard);
router.get("/checksolved", checkIfSolved);
router.get("/correctSoFar", correctSoFar);
router.get("/gethint", getHint);
export default router;