import axios from "axios";

const BASE_URL = "http://localhost:9090/api";


export const getUndoFour = () => {
    return axios
      .get(`${BASE_URL}/undo/4`)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(`Error fetching undo: ${error.message}`);
      });
  };

  export const getUndoUntilCorrectFour = () => {
    return axios
      .get(`${BASE_URL}/undountilcorrect/4`)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(`Error fetching undo until correct: ${error.message}`);
      });
  };
  export const getUndoNine = () => {
    return axios
      .get(`${BASE_URL}/undo/9`)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(`Error fetching undo: ${error.message}`);
      });
  };

  export const getUndoUntilCorrectNine = () => {
    return axios
      .get(`${BASE_URL}/undountilcorrect/9`)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(`Error fetching undo until correct: ${error.message}`);
      });
  };