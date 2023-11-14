
import express from 'express';
import bodyParser from 'body-parser'
import {generateBoard}  from './helpers/generateBoard.js';
import boardManipulationRoute from './routes/boardManipulation.js';
import getBoard from './routes/getBoard.js'


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// all routes called here
app.use("/api", boardManipulationRoute);
app.use("/api", getBoard);
// app.use('/api',require('./routes/boardManipulation'));





const port = 9090;
app.listen(port, () => {
  console.log(`Started server on http://localhost:${port}/`);
});

