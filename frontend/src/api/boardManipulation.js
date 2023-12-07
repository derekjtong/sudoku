import axios from "axios";

const BASE_URL = "http://localhost:9090/api";

/**
 * Add element to sudoku board
 * @param {Object} inputData Object containing row, column, and value.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const addElementToBoard = (inputData) => {
  return axios
    .get(`${BASE_URL}/addelement/`, inputData)
    .then((response) => response.data)
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
    .get(`${BASE_URL}/deleteelement/`, inputData)
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
    .get(`${BASE_URL}/undo/${gameId}`)
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
    .get(`${BASE_URL}/undo/${gameId}`)
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
    .get(`${BASE_URL}/undo/${gameId}`)
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
    .get(`${BASE_URL}/undo/${gameId}`) // ??
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
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error undoing last element on the board: ${error.message}`);
    });
};

/**
 * Undo until sudoku board is correct
 * @param {string} id - The identifier for the board.
 * @returns {Promise<Object>} A promise that resolves to the board data.
 */
export const undoUntilCorrect = (gameId) => {
  return axios
    .get(`${BASE_URL}/undountilcorrect/${gameId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error undoing board until correct: ${error.message}`);
    });
};