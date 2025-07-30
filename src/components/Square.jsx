import { useSelector } from "react-redux";
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
  theme,
}) {
  const piece = useSelector((state) => getSquare(state, { x, y }));

  return (
    <div
      onDrop={(e) => handleDrop(e, x, y, piece)}
      onDragEnter={(e) => handleDragEnter(e, x, y, piece)}
      onDragLeave={(e) => handleDragLeave(e, x, y, piece)}
      onDragOver={(e) => e.preventDefault()}
      className={`Square ${color}`}
    >
      {piece && <Piece piece={piece} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} theme={theme} />}
    </div>
  );
}
