import express from 'express';
import addElementIntoBoard from '../controllers/addElementIntoBoard';
const router = express.Router();

router.post('/addelement', addElementIntoBoard);

export default router;