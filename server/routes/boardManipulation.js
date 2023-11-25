import express from 'express';
import { addElementIntoBoard } from '../controllers/addElementIntoBoard.js';
import { deleteElementFromBoard } from '../controllers/deleteElementFromBoard.js';
import { checkIfSolved } from '../controllers/checkIfSolved.js';
import { correctSoFar } from '../controllers/correctSoFar.js';
import undo from '../controllers/undo.js';
import undoUntilCorrect from '../controllers/undoUntilCorrect.js';
import getRandomHint from '../controllers/getRandomHint.js';
import getSpecificHint from '../controllers/getHintSpecificHint.js';

const router = express.Router();

router.post("/addelement/:id", addElementIntoBoard);
router.post("/deleteelement/:id", deleteElementFromBoard);
router.get("/checksolved/:id", checkIfSolved);
router.get("/correctSoFar/:id", correctSoFar);
router.get("/getRandomHint/:id", getRandomHint);
router.post("/getSpecificHint/:id", getSpecificHint);
router.get('/undo/:id', undo);
router.get('/undountilcorrect/:id', undoUntilCorrect);


export default router;
