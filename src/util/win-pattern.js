// arr: the players array
// player: the current player {1, 2}
// index: the current index of the move
// n is the size of the n by n tic tac toe game
export const winningPattern = (arr, player, index, n) => {
    // determine the row of the move
    const row = Math.floor(index / n);
    // determine the column of the move
    const column = index % n;
    // determine if the move lies within the left diagonal
    const leftDiag = index % (n + 1) === 0;
    // determine if the move lies within the right diagonal
    const rightDiag = index % (n - 1) === 0;
    // the starting position of the row to check winning condition for the row
    let rowNumIndex = row * n;
    // the starting position of the column to check winning condition for the column
    let colNumIndex = column;
    // the starting position of the left diagonal to check winning condition for the left diagonal
    let leftDiagIndex = 0;
    // the starting position of the right diagonal to check winning condition for the right diagonal
    let rightDiagIndex = n - 1;
    const lastRowIndex = rowNumIndex + n - 1;
    const lastColIndex = colNumIndex + n * (n - 1);
    const lastLeftDiagIndex = (n - 1) * (n + 1);
    const lastRightDiagIndex = n * (n - 1);
    const rowPattern = new Array(n * n).fill(0);
    const colPattern = new Array(n * n).fill(0);
    const leftDiagPattern = new Array(n * n).fill(0);
    const rightDiagPattern = new Array(n * n).fill(0);
    // array elements represents 1 = true, 0 = false, for row, column, left and right diagonal respectively
    const winConditions = [1, 1, 1, 1];
    
    // index for row increment is always 1, column increment is always n
    while (true) {
        if (
            rowNumIndex > lastRowIndex ||
            colNumIndex > lastColIndex ||
            leftDiagIndex > lastLeftDiagIndex ||
            rightDiagIndex > lastRightDiagIndex
        ) {
            break;
        }
        
        if (arr[rowNumIndex] === player) {
            rowPattern[rowNumIndex] = player;
        } else {
            winConditions[0] = 0;
        }
        
        if (arr[colNumIndex] === player) {
            colPattern[colNumIndex] = player;
        } else {
            winConditions[1] = 0;
        }
        
        if (leftDiag && arr[leftDiagIndex] === player) {
            leftDiagPattern[leftDiagIndex] = player;
        } else {
            winConditions[2] = 0;
        }
        
        if (rightDiag && arr[rightDiagIndex] === player) {
            rightDiagPattern[rightDiagIndex] = player;
        } else {
            winConditions[3] = 0;
        }
    
        rowNumIndex++;
        colNumIndex += n;
        leftDiagIndex += n + 1;
        rightDiagIndex += n - 1;
    }
    
    if (winConditions.some(el => el === 1)) {
        return rowPattern.map((el, index) => {
            for (let i = 0; i < winConditions.length; i++) {
                if (winConditions[i]) {
                    switch (i) {
                        case 0:
                            if (rowPattern[index]) return 1;
                            break;
                        case 1:
                            if (colPattern[index]) return 1;
                            break;
                        case 2:
                            if (leftDiagPattern[index]) return 1;
                            break;
                        case 3:
                            if (rightDiagPattern[index]) return 1;
                            break;
                    }
                }
            }
            
            return 0;
        });
    }
    
    return null;
}