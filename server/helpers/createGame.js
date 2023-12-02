import Game from "../database/gameSchema.js";
const createGame = async (problemBoard, solutionBoard, dimension, stack) => {
  try {
    const newGame = new Game({
      problemBoard,
      solutionBoard,
      dimension,
      stack,
    });

    const savedGame = await newGame.save();
    console.log("Game saved:", savedGame);
    return savedGame;
  } catch (error) {
    console.error("Error saving game:", error);
    throw error;
  }
};

export default createGame;
