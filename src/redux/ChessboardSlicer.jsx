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
      state.chessboard[p.x][p.y] = p.piece;
    },
    cleanSquare: (state, action) => {
      const p = action.payload;
      state.chessboard[p.x][p.y] = null;
    },
  },
});

export const { saveChessboard, saveSquare, cleanSquare } = chessboard.actions;
export default chessboard.reducer;
