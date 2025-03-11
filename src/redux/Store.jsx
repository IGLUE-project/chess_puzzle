import { configureStore } from "@reduxjs/toolkit";
import ChessboardSlicer from "./ChessboardSlicer";

const store = configureStore({
  reducer: {
    chessboard: ChessboardSlicer,
  },
});

export default store;
