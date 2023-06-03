export const nextCycle = (board: number[][]): number[][] => {
    let newBoard: number[][] = Array(80).fill(0).map(() => Array(80).fill(0));

    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board.length; y++) {
            const count = countNeighbours(board, x, y)

            if (board[x][y]) {
                if (count === 2 || count === 3) {
                    //console.log(x, y, "stays alive")
                    newBoard[x][y] = 1;
                } else {
                    newBoard[x][y] = 0;
                }
            } else {
                if (count === 3) {
                    //console.log(x, y, "going alive")
                    newBoard[x][y] = 1;
                } else {
                    newBoard[x][y] = 0;
                }
            }
        }
    }
    // console.log(board)
    //console.log(newBoard)
    return newBoard
}

const countNeighbours = (board: number[][], x: number, y: number): number => {
    let count = -board[x][y]

    for (let xOffSet = -1; xOffSet <= 1; xOffSet++) {
        for (let yOffSett = -1; yOffSett <= 1; yOffSett++) {
            if (board[x + xOffSet] ? board[x + xOffSet][y + yOffSett] : undefined) {
                // console.log("checking:", x + xOffSet, y + yOffSett, board[x + xOffSet][y + yOffSett])
                count++
            }
        }
    }


    return count
}
