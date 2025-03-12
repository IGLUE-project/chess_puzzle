const getBaseSelector = (state) => state.chessboard;

export const getChessboard = (state) => getBaseSelector(state).chessboard;

export const getSquareById = (state, id) => {
  return (
    getBaseSelector(state)
      .chessboard.flat()
      .find((square) => square?.id === id) || null
  );
};

export const getSquare = (state, { x, y } = cords) => getBaseSelector(state).chessboard[x][y];
