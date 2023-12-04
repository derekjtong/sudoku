import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  problemBoard: [[Number]], // Array of arrays of numbers
  solutionBoard: [[Number]], // Array of arrays of numbers
  dimension: Number,
  stack: [
    {
      grid: [[Number]], // Array of arrays of numbers
      booleanValue: Boolean,
    },
  ],
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
