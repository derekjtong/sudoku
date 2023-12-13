import express from "express";
import { addElementIntoBoard } from "../controllers/addElementIntoBoard.js";
import { deleteElementFromBoard } from "../controllers/deleteElementFromBoard.js";
import { checkIfSolved } from "../controllers/checkIfSolved.js";
import { correctSoFar } from "../controllers/correctSoFar.js";
import undo from "../controllers/undo.js";
import undoUntilCorrect from "../controllers/undoUntilCorrect.js";
import addNotes from "../controllers/addNotes.js";
import switchNote from "../controllers/switchNotes.js";
import resetGame from "../controllers/resetGame.js";
import deleteNotes from "../controllers/deleteNotes.js";
import callRandomHint from "../controllers/getRandomHint.js";
import callSpecificHint from "../controllers/getSpecificHint.js";

const router = express.Router();

// @route /api/addelement/{dbId}
router.post("/addelement/:id", addElementIntoBoard); // {valid:true or false, board,stack}

// TODO frontend
// @route /api/deleteelement/{dbId}
router.post("/deleteelement/:id", deleteElementFromBoard); // {valid:true or false, board}

// TODO frontend
// @route /api/checksolved/{dbId}
router.get("/checksolved/:id", checkIfSolved); // {isSolved:true/false}

// TODO frontend
//@route /api/correctSoFar/{dbId}
router.get("/correctSoFar/:id", correctSoFar); // {valid:true/false}

// TODO Safal
// @route /api/getRandomHint/{dbId}
router.get("/getRandomHint/:id", callRandomHint); //{suggestedMove:{row,col,num}}

// @route /api/getSpecificHint/{dbId}
router.post("/getSpecificHint/:id", callSpecificHint); //{suggestedMove} suggestedMove means the element that we can add

// @route /api/undo/{dbId}
router.get("/undo/:id", undo); // {board}

// @route /api/undountilcorrect/{dbId}
router.get("/undountilcorrect/:id", undoUntilCorrect); // {board}

// TODO ??
// @route /api/switchnote
router.put("/switchnote/:id", switchNote);

// TODO frontend
// @route /api/addnote/{dbId}
router.put("/addnote/:id", addNotes);

// TODO frontend
// @route /api/deletenote/{dbId}
router.delete("/deletenote/:id", deleteNotes);

// TODO frontend
// @route /api/reset/{dbId}
router.put("/reset/:id", resetGame);

export default router;
