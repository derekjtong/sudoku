import express from "express";
import { addElementIntoBoard } from "../controllers/addElementIntoBoard.js";
import { deleteElementFromBoard } from "../controllers/deleteElementFromBoard.js";
import { checkIfSolved } from "../controllers/checkIfSolved.js";
import { correctSoFar } from "../controllers/correctSoFar.js";
import undo from "../controllers/undo.js";
import undoUntilCorrect from "../controllers/undoUntilCorrect.js";
import getRandomHint from "../controllers/getRandomHint.js";
import getSpecificHint from "../controllers/getHintSpecificHint.js";
import addNotes from "../controllers/addNotes.js";
import switchNote from "../controllers/switchNotes.js";
import resetGame from "../controllers/resetGame.js";
import deleteNotes from "../controllers/deleteNotes.js";

const router = express.Router();

// @route /api/addelement/{dbId}
router.post("/addelement/:id", addElementIntoBoard); // {valid:true or false, board,stack}

// @route /api/deleteelement/{dbId}
router.post("/deleteelement/:id", deleteElementFromBoard); // {valid:true or false, board}

// @route /api/checksolved/{dbId}
router.get("/checksolved/:id", checkIfSolved); // {isSolved:true/false}

//@route /api/correctSoFar/{dbId}
router.get("/correctSoFar/:id", correctSoFar); // {valid:true/false}

// @route /api/getRandomHint/{dbId}
router.get("/getRandomHint/:id", getRandomHint); // {suggestedMove:{row,col,num}}

// @route /api/getSpecificHint/{dbId}
router.post("/getspecifichint/:id", getSpecificHint); // {suggestedMove} suggestedMove means the element that we can add

// @route /api/undo/{dbId}
router.get("/undo/:id", undo); // {board}

// @route /api/undountilcorrect/{dbId}
router.get("/undountilcorrect/:id", undoUntilCorrect); // {board}

// @route /api/switchnote
router.put("/switchnote/:id", switchNote);

// @route /api/addnote/{dbId}
router.put("/addnote/:id", addNotes);

// @route /api/deletenote/{dbId}
router.delete("/deletenote/:id", deleteNotes);

// @route /api/reset/{dbId}
router.put("/reset/:id", resetGame);

export default router;
