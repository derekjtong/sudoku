//the frontend passes the element which have to be added and the coordinates
export default addElementIntoBoard = (req, res) => {
    const board = req.body.board.matrix;
    const row = req.body.board.row;
    const col = req.body.board.col;
    const element = req.body.board.element;
    
    
    for (let i = 0; i < board.length; i++){
        //check in row
        if (board[ i ][ col ] === element) {
            return res.json({
                valid: false
            });
        }
        if (board[ col ][ i ] === element) {
            return res.json({
              valid: false,
            });
        }
        if (
          board[Math.floor(3 * (row / 3) + i / 3)][
            Math.floor(3 * (col / 3) + (i % 3))
          ] === element
        ) {
          return res.json({
            valid: false,
          });
        }

    }
    board[ row ][ col ] = element;
    if (!checkIfValid(board)) {
        return res.json({
          valid: false,
        });
    }
    return res.json({
        valid: true,
        board
    })
    
}