import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' }); // Loads environment variables from .env.local file
import express from 'express';
import bodyParser from 'body-parser';
import { connectToServer } from './database/database.js';
import boardManipulationRoute from './routes/boardManipulation.js';
import getBoard from './routes/getBoard.js';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use("/api", boardManipulationRoute);
app.use("/api", getBoard);

const port = 9090;

// Function to start the server
const startServer = async () => {
  try {
    // Connect to MongoDB before starting the server
    await connectToServer();
    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Exit with a failure code
  }
};

// Start the server
startServer();
