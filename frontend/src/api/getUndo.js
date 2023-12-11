import axios from "axios";

const BASE_URL = "http://localhost:9090/api";


export const getUndoFour = (GameID) => {
    return axios
      .get(`${BASE_URL}/undo/${GameID}`)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(`Error fetching undo: ${error.message}`);
      });
  };

  export const getUndoUntilCorrectFour = (GameID) => {
    return axios
      .get(`${BASE_URL}/undountilcorrect/${GameID}`)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(`Error fetching undo until correct: ${error.message}`);
      });
  };
