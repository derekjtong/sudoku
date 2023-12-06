import axios from "axios";

const BASE_URL = "http://localhost:9090/api";

/**
 * Get one game
 * @param {string} id - The identifier for the board.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const getSingleGameById = (gameId) => {
  return axios
    .get(`${BASE_URL}/getonegame/${gameId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error fetching game: ${error.message}`);
    });
};

/**
 * List all games.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const listAllGamesInDb = () => {
  return axios
    .get(`${BASE_URL}/getallgames`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error fetching all games: ${error.message}`);
    });
};
