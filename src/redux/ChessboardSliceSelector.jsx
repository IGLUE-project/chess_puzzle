const getBaseSelector = (state) => state.chessboard;

export const getChessboard = (state) => getBaseSelector(state).chessboard;
// export const getSquare = (state, id) => {
//   const board = getBaseSelector(state).chessboard;

//   for (let i = 0; i < board.length; i++) {
//     const row = board[i];
//     for (let j = 0; j < row.length; j++) {
//       if (row[j] === id) return { x: i, y: j };
//     }
//   }
// };

export const getSquare = (state, { x, y } = cords) => getBaseSelector(state).chessboard[x][y];
