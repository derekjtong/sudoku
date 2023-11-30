import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let dbConnection;

export const connectToServer = async () => {
    try {
        await client.connect();
        dbConnection = client.db('sudokuDB');
        console.log("Successfully connected to MongoDB.");
    } catch (err) {
        console.error("Could not connect to MongoDB", err);
        throw err; // This allows the error to be handled by the caller of connectToServer
    }
};

export const getDb = () => {
    if (!dbConnection) {
        throw new Error('Database connection is not established');
    }
    return dbConnection;
};
