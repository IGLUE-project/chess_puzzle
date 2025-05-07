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
  theme,
  size,
}) {
  const chessboard = useSelector(getChessboard);

  return (
    <div
      className="Board"
      style={{
        backgroundImage: `url(${theme.chessboardImg})`,
        height: size.height * 0.7,
        width: size.height * 0.7,
        padding: size.height * 0.04,
      }}
    >
      {/* <img className="chessboardimg" src={theme.chessboardImg} alt="chessboard" /> */}

      <div className="chessboard">
        {chessboard.map((row, y) => (
          <div className="row" key={y}>
            {row.map((square, x) => (
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
                theme={theme}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
