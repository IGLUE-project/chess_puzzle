import { useSelector } from "react-redux";
import React from "react";
import { getChessboard } from "../redux/ChessboardSliceSelector";
import Square from "./Square";
import "../assets/scss/Board.scss";

export default function Board({
  handleDragEnter,
  handleDrop,
  handleDragStart,
  handleDragEnd,
  handleDragLeave,
  stylePuzzle,
}) {
  const chessboard = useSelector(getChessboard);

  return (
    <div className="Board">
      <img className="chessboardimg" src={`/src/assets/images/${stylePuzzle}_chessboard.png`} alt="chessboard" />
      <div className="chessboard">
        {chessboard.map((row, x) => (
          <div className="row" key={x}>
            {row.map((square, y) => (
              <Square
                handleDrop={handleDrop}
                handleDragEnter={handleDragEnter}
                handleDragLeave={handleDragLeave}
                handleDragStart={handleDragStart}
                handleDragEnd={handleDragEnd}
                key={x + " " + y}
                color={(x + y) % 2 === 1 ? "black" : ""}
                x={x}
                y={y}
                stylePuzzle={stylePuzzle}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
