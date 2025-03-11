import { useSelector } from "react-redux";
import { getChessboard } from "../redux/ChessboardSliceSelector";
import Square from "./Square";

export default function Board({ handleDragEnter, handleDrop, handleDragStart, handleDragEnd, handleDragLeave }) {
  const chessboard = useSelector(getChessboard);

  return (
    <div className="Board" style={{ display: "flex" }}>
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
            />
          ))}
        </div>
      ))}
    </div>
  );
}
