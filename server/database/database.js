import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/sudoku";



function makeDB() {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Conected to MongoDB Atlas");
    })
    .catch((err) => {
      console.error("Error connecting to database: " + err.message);
    });
}
export default makeDB;
