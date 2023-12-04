import axios from "axios";

const BASE_URL = "http://localhost:9090";

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