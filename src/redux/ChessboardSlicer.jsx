import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_CHESSBOARD } from "../constants/constants";

const initialState = {
  chessboard: DEFAULT_CHESSBOARD,
};

const chessboard = createSlice({
  name: "chessboard",
  initialState,
  reducers: {
    saveChessboard: (state, action) => {
      state.chessboard = action.payload;
    },
    saveSquare: (state, action) => {
      const p = action.payload;
      //saveSquareClean(state.chessboard, p);
      state.chessboard[p.x][p.y] = p.piece;
    },
    cleanSquare: (state, action) => {
      const p = action.payload;
      state.chessboard[p.x][p.y] = null;
    },
    cleanPiece: (state, action) => {
      const p = action.payload;
      saveSquareClean(state.chessboard, p);
    },
  },
});

function saveSquareClean(chessBoard, p) {
  try {
    for (let x = 0; x < chessBoard.length; x++) {
      for (let y = 0; y < chessBoard[x].length; y++) {
        if (chessBoard[x][y] && chessBoard[x][y].id === p.piece.id) chessBoard[x][y] = null;
      }
    }
  } catch (error) {
    console.log(error);
    console.log(p);
  }
}

export const { saveChessboard, saveSquare, cleanSquare, cleanPiece } = chessboard.actions;
export default chessboard.reducer;
