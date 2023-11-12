const checkIfValid = (board) => {
    let rows = new Set();
    let cols = new Set();
    let squares = new Set();
    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board[ 0 ].length; j++){
            if (board[ i ][ j ] != ".") {
                let curr = board[ i ][ j ];
                let rowVal = curr + "row" + i;
                let colVal = curr + "col" + j;
                let square = curr + "square" + i / 3 + "-" + j / 3;
                if (rows.has(rowVal) || cols.has(colVal) || squares.has(square)) {
                    return false;
                }
                else {
                    rows.add(rowVal);
                    cols.add(colVal);
                    squares.add(square);
                }
            }
        }
    }
    
}
return true;