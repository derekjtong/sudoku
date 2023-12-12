import axios from "axios";

const BASE_URL = "http://localhost:9090/api";

/**
 * Add element to sudoku board
 * @param {Object} inputData Object containing row, column, and value.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const addElementToBoard = (gameId, row, col, value) => {
  return axios
    .post(`${BASE_URL}/addelement/${gameId}`, {
      row: row,
      col: col,
      element: value,
    })
    .then((response) => response.data)
    .then(console.log("Change cell (" + row + ", " + col + ") to " + value))
    .then((res) => console.log(res))
    .catch((error) => {
      throw new Error(`Error adding element to board: ${error.message}`);
    });
};

/**
 * Delete element from sudoku board
 * @param {Object} inputData Object containing row, column, and value.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const deleteElementFromBoard = (inputData) => {
  return axios
    .post(`${BASE_URL}/deleteelement/`, inputData)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error deleting element from board: ${error.message}`);
    });
};

/**
 * Checking if board solved
 * @param {string} id - The identifier for the board.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const checkIfSolved = (gameId) => {
  return axios
    .get(`${BASE_URL}/checksolved/${gameId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error checking if board is solved: ${error.message}`);
    });
};

/**
 * Checking if board is currently correct
 * @param {string} id - The identifier for the board.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const correctSoFar = (gameId) => {
  return axios
    .get(`${BASE_URL}/correctSoFar/${gameId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error checking board: ${error.message}`);
    });
};

/**
 * Get random hint
 * @param {string} id - The identifier for the board.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const getRandomHint = (gameId) => {
  return axios
    .get(`${BASE_URL}/getRandomHint/${gameId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error getting random hint: ${error.message}`);
    });
};

/**
 * Get specific hint
 * @param {string} id - The identifier for the board.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const getSpecificHint = (gameId) => {
  return axios
    .get(`${BASE_URL}/getSpecificHint/${gameId}`) // ??
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error getting specific hint: ${error.message}`);
    });
};

/**
 * Undo last element on the board
 * @param {string} id - The identifier for the board.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const undo = (gameId) => {
  return axios
    .get(`${BASE_URL}/undo/${gameId}`)
    .then((response) => {
      // If there are no more moves to undo, return a specific response instead of throwing an error
      if (response.data.message && response.data.message === "No more moves to undo.") {
        return { noMoreMoves: true };
      }
      return response.data;
    })
    .catch((error) => {
      console.error("Error during undo operation:", error);
      throw error; // Propagate the error for further handling
    });
};

/**
 * Undo until sudoku board is correct
 * @param {string} gameId - The identifier for the board.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const undoUntilCorrect = (gameId) => {
  console.log("Called undoUntilCorrect");
  return axios
    .get(`${BASE_URL}/undoUntilCorrect/${gameId}`)
    .then((response) => {
      // Handle specific messages or data returned by the backend
      if (response.data.message) {
        if (response.data.message === "No more moves to undo.") {
          return { noMoreMoves: true };
        } else if (response.data.message === "Reached initial state of the game.") {
          return { initialStateReached: true };
        }
      }
      return response.data;
    })
    .catch((error) => {
      console.error("Error during undoUntilCorrect operation:", error);
      throw error; // Propagate the error for further handling
    });
};
