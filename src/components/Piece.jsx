import { useSelector } from "react-redux";
import { getIsSolved } from "../redux/ChessboardSliceSelector";
import { THEMES } from "../constants/constants";

export default function Piece({ piece, handleDragStart, handleDragEnd, theme }) {
  const img = piece.white ? piece.name : `${piece.name}_black`;
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
        src={`images/${img}_${theme.skin.toLowerCase()}.png`}
        alt={piece.name}
      />
    </div>
  );
}
