import Game from "../database/gameSchema.js";

const updateGame = async (updatedBoard, gameId, updatedStack) => {
  try {
    await Game.updateOne(
      { _id: gameId },
      {
        problemBoard: updatedBoard,
        stack: updatedStack,
      },
    );
  } catch (error) {
    console.error("Error updating game:", error);
  }
};

export default updateGame;
