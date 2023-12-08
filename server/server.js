import dotenv from 'dotenv';
// dotenv.config();
// console.log(process.env.MONGODB_URI);
//console.log(process.env); // This will print all environment variables
import express, { application } from "express";
import bodyParser from "body-parser";
import boardManipulationRoute from "./routes/boardManipulation.js";
import boardRouter from "./routes/getBoard.js";
import makeDB from "./database/database.js";
import gamesRouter from "./routes/games.js";
import cors from "cors";

const app = express();
const port = 9090;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("dist"));

// all routes called here
app.use("/api", boardManipulationRoute);
app.use("/api", boardRouter);
app.use("/api", gamesRouter);
// app.use('/api',require('./routes/boardManipulation'));

app.listen(port, (err) => {
  makeDB();
  if (!err) {
    console.log(`Server is running on http://localhost:${port}/`);
  } else {
    console.log(err);
  }
});

// import express, { application } from "express";
// import bodyParser from "body-parser";
// import boardManipulationRoute from "./routes/boardManipulation.js";
// import boardRouter from "./routes/getBoard.js";
// //import { connectToServer, getDb } from "./database/database.js";
// //import makeDB from "./database/database.js";
// import gamesRouter from "./routes/games.js";
// import cors from "cors";

// const app = express();
// const port = 9090;

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static("dist"));

// // all routes called here
// app.use("/api", boardManipulationRoute);
// app.use("/api", boardRouter);
// app.use("/api", gamesRouter);
// // app.use('/api',require('./routes/boardManipulation'));

// connectToServer((error) => {
//   if (error) {
//     console.error("Failed to connect to the database!", error);
//     process.exit(1); // Exit process with failure code
//   }

//   // Only start the server if there is no error
//   app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}/`);
//   });
// });
