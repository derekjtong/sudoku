import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
const url = process.env.MONGODB_URI;

function makeDB() {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Conected to db..");
    })
    .catch((err) => {
      console.error("Error connecting to database: " + err.message);
    });
}
export default makeDB;
// import dotenv from "dotenv";
// dotenv.config();
// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri);

// let dbConnection;

// export const connectToServer = (callback) => {
//   client.connect((err, db) => {
//     if (err) {
//       console.error("Could not connect to MongoDB", err);
//       return callback(err);
//     }
//     dbConnection = db.db("sudokuDB");
//     console.log("Successfully connected to MongoDB.");
//     return callback(null);
//   });
// };

// export const getDb = () => {
//   return dbConnection;
// };
