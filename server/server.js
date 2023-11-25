
import express from 'express';
import bodyParser from 'body-parser'
import boardManipulationRoute from './routes/boardManipulation.js';
import boardRouter from "./routes/getBoard.js";
import makeDB from './database/database.js';
import gamesRouter from './routes/games.js';


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// all routes called here
app.use("/api", boardManipulationRoute);
app.use("/api", boardRouter);
app.use("/api", gamesRouter);
// app.use('/api',require('./routes/boardManipulation'));





const port = 9090;

app.listen(port, (err) => {
  makeDB();
  if (!err) {
    console.log('Server is up and running..');
  }
  else {
    console.log(err);
  }
  
})
