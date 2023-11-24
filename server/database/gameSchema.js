const mongoose = require("mongoose");

const CellSchema = new mongoose.Schema({
  value: {
    type: Number,
    default: -1,
  },
  fixed: {
    type: Boolean,
    default: false,
  },
});

const StackSnapshotSchema = new mongoose.Schema({
  grid: {
    type: [[CellSchema]],
    required: true,
  },
  booleanValue: {
    type: Boolean,
    required: true,
  },
});

const GameSchema = new mongoose.Schema({
  problemBoard: {
    type: [[CellSchema]],
    required: true,
  },
  solutionBoard: {
    type: [[CellSchema]],
    required: true,
  },
  dimension: {
    type: Number,
    required: true,
  },
  stack: [StackSnapshotSchema],
});

const Cell = mongoose.model("Cell", CellSchema);
const StackSnapshot = mongoose.model("StackSnapshot", StackSnapshotSchema);
const Game = mongoose.model("Game", GameSchema);

export { Cell, StackSnapshot, Game };
