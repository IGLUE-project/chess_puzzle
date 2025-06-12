import { useSelector } from "react-redux";
import "../assets/scss/Piece.scss";
import { getIsSolved } from "../redux/ChessboardSliceSelector";

export default function Piece({ piece, handleDragStart, handleDragEnd, theme }) {
  const img = piece.blanca ? piece.name : `${piece.name}_negro`;

  const solved = useSelector(getIsSolved);

  return (
    <div className={`Piece ${piece.class}${solved ? " solved" : ""}`}>
      <img
        draggable={!solved}
        onDragStart={(e) => {
          if (!solved) handleDragStart(e, piece);
        }}
        onDragEnd={(e) => {
          if (!solved) handleDragEnd(e, piece);
        }}
        src={`/src/assets/images/${img}_${theme.skin}.png`}
        alt={piece.name}
      />
    </div>
  );
}
