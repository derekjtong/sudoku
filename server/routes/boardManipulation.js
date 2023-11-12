import express from 'express';
import { addElementIntoBoard } from '../controllers/addElementIntoBoard.js';
import { deleteElementFromBoard } from '../controllers/deleteElementFromBoard.js';
const router = express.Router();

router.post('/addelement', addElementIntoBoard);
router.post("/deleteelement", deleteElementFromBoard);
export default router;