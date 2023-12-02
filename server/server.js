
import express from 'express';
import bodyParser from 'body-parser'
import {generateBoard}  from './helpers/generateBoard.js';
import boardManipulationRoute from './routes/boardManipulation.js';
import getBoard from './routes/getBoard.js'
import { connectToServer } from './database/database.js';


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("dist"));

// API routes
app.use("/api", boardManipulationRoute);
app.use("/api", getBoard);
// app.use('/api',require('./routes/boardManipulation'));





const port = 9090;

connectToServer((error) => {
  if (error) {
    console.error("Failed to connect to the database!", error);
    process.exit();
  }

  app.listen(port, () => {
    console.log(`Started server on http://localhost:${port}/`);
  });
});
