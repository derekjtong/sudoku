import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbConnection;

export const connectToServer = (callback) => {
    client.connect((err, db) => {
        if (err) {
            console.error("Could not connect to MongoDB", err);
            return callback(err);
        }
        dbConnection = db.db('sudokuDB');
        console.log("Successfully connected to MongoDB.");
        return callback(null);
    });
};

export const getDb = () => {
    return dbConnection;
};
