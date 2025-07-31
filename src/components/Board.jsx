import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { useSelector } from "react-redux";
import { getChessboard } from "../redux/ChessboardSliceSelector";
import Square from "./Square";
import "../assets/scss/Board.scss";

export default function Board({handleDragEnter, handleDrop, handleDragStart, handleDragEnd, handleDragLeave, size}) {
  const { appSettings } = useContext(GlobalContext);
  const chessboard = useSelector(getChessboard);

  let padding;
  switch (appSettings.skin) {
    case "REALISTIC":
      padding = size.height * 0.052;
      break;
    case "FUTURISTIC":
      padding = size.height * 0.045;
      break;
    case "STANDARD":
    default:
      padding = size.height * 0.052;
  }

  return (
    <div
      className="Board"
      style={{
        backgroundImage: `url(${appSettings.chessboardImg})`,
        height: size.height * 0.9,
        width: size.height * 0.9,
        padding: padding,
      }}
    >
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
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}