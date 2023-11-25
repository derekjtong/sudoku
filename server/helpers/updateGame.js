import Game from "../database/gameSchema.js";

const updateGame = async (updatedBoard, gameId, updatedStack) => {
  try {
    let game = await Game.updateOne(
      { _id: gameId },
      {
        problemBoard: updatedBoard,
        stack: updatedStack,
      },
    );

    console.log("Game updated:", game);
    return game;
  } catch (error) {
    console.error("Error updating game:", error);
  }
};

export default updateGame;
