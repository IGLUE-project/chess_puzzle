import { useSelector } from "react-redux";
import "../assets/scss/Square.scss";
import { getSquare } from "../redux/ChessboardSliceSelector";
import Piece from "./Piece";

export default function Square({
  color,
  handleDragEnter,
  handleDragLeave,
  handleDrop,
  handleDragStart,
  handleDragEnd,
  x,
  y,
}) {
  const piece = useSelector((state) => getSquare(state, { x, y }));

  return (
    <div
      onDrop={(e) => handleDrop(e, x, y)}
      onDragEnter={(e) => handleDragEnter(e, x, y)}
      onDragLeave={(e) => handleDragLeave(e, x, y)}
      className={`Square ${color}`}
    >
      {piece && <Piece piece={piece} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />}
    </div>
  );
}
