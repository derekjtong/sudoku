import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const url = process.env.MONGODB_URI;

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
