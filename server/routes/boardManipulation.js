import express from 'express';
import {addElementIntoBoard} from '../controllers/addElementIntoBoard.js';
const router = express.Router();

router.post('/addelement', addElementIntoBoard);
//router.post("/deleteelement", addElementIntoBoard);
export default router;