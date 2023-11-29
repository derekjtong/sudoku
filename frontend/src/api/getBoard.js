import axios from "axios";

const BASE_URL = "http://localhost:9090";

/**
 * Get a 4x4 sudoku board.
 * @param {string} id - The identifier for the board.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const getFourBoard = (id) => {
  return axios
    .get(`${BASE_URL}/newboard/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error fetching 4x4 board: ${error.message}`);
    });
};

/**
 * Get a 9x9 sudoku board.
 * @param {string} id - The identifier for the board.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const getNineBoard = (id) => {
  return axios
    .get(`${BASE_URL}/newboard/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error fetching 9x9 board: ${error.message}`);
    });
};

/**
 * Get a 16x16 sudoku board.
 * @param {string} id - The identifier for the board.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const getSixteenBoard = (id) => {
  return axios
    .get(`${BASE_URL}/newboard/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error fetching 16x16 board: ${error.message}`);
    });
};
