// 4*4 9*9 16*16
export const generateBoard = (m, n) => {
  let board = {};

  // Select a random hard coded board
  let boardNum = randomInt(1, 2);
  if (m == 4 && n == 4) {
    let cell = [
      [3, -1, 1, 2],
      [2, 1, 4, 3],
      [1, 2, 3, 4],
      [4, 3, 2, 1],
    ];
    const solution = [
      [3, 4, 1, 2],
      [2, 1, 4, 3],
      [1, 2, 3, 4],
      [4, 3, 2, 1],
    ];
    board["cell"] = cell;
    board["solution"] = solution;
  } else if (m == 9 && n == 9) {
    // TODO: get random board from a board database
    let cell;
    let solution;
    switch (boardNum) {
      case 1:
        cell = [
          [-1, -1, -1, -1, 7, -1, 9, -1, 2],
          [-1, -1, -1, 1, 9, -1, 3, -1, -1],
          [-1, -1, -1, 3, -1, -1, 5, 6, -1],
          [-1, 5, -1, -1, -1, -1, -1, -1, -1],
          [4, 2, 6, -1, -1, -1, -1, 9, -1],
          [7, -1, 3, -1, -1, -1, -1, -1, -1],
          [-1, -1, -1, -1, -1, -1, -1, -1, 4],
          [-1, -1, -1, -1, -1, 9, -1, -1, 5],
          [3, -1, -1, -1, 8, 6, -1, 7, 9],
        ];
        solution = [
          [5, 3, 4, 6, 7, 8, 9, 1, 2],
          [6, 7, 2, 1, 9, 5, 3, 4, 8],
          [1, 9, 8, 3, 4, 2, 5, 6, 7],
          [8, 5, 9, 7, 6, 1, 4, 2, 3],
          [4, 2, 6, 8, 5, 3, 7, 9, 1],
          [7, 1, 3, 9, 2, 4, 8, 5, 6],
          [9, 6, 1, 5, 3, 7, 2, 8, 4],
          [2, 8, 7, 4, 1, 9, 6, 3, 5],
          [3, 4, 5, 2, 8, 6, 1, 7, 9],
        ];
        break;
      case 2:
        cell = [
          [-1, -1, -1, 2, 6, -1, 7, -1, 1],
          [6, 8, -1, -1, 7, -1, -1, 9, -1],
          [1, 9, -1, -1, -1, 4, 5, -1, -1],
          [8, 2, -1, 1, -1, -1, -1, 4, -1],
          [-1, -1, 4, 6, -1, 2, 9, -1, -1],
          [-1, 5, -1, -1, -1, 3, -1, 2, 8],
          [-1, -1, 9, 3, -1, -1, -1, 7, 4],
          [-1, 4, -1, -1, 5, -1, -1, 3, 6],
          [7, -1, 3, -1, 1, 8, -1, -1, -1],
        ];
        solution = [
          [4, 3, 5, 2, 6, 9, 7, 8, 1],
          [6, 8, 2, 5, 7, 1, 4, 9, 3],
          [1, 9, 8, 7, 4, 2, 5, 6, 2],
          [8, 2, 6, 1, 9, 5, 3, 4, 7],
          [3, 7, 4, 6, 8, 2, 9, 1, 5],
          [9, 5, 1, 7, 4, 3, 6, 2, 8],
          [5, 1, 9, 3, 2, 6, 8, 7, 4],
          [2, 4, 8, 9, 5, 7, 1, 3, 6],
          [7, 6, 3, 4, 1, 8, 2, 5, 9],
        ];
        break;
    }
    board["cell"] = cell;
    board["solution"] = solution;
  }

  return board;
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
