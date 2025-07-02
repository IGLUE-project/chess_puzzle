import { useSelector } from "react-redux";
import "../assets/scss/Piece.scss";
import { getIsSolved } from "../redux/ChessboardSliceSelector";
import { THEMES } from "../constants/constants";

export default function Piece({ piece, handleDragStart, handleDragEnd, theme }) {
  const img = piece.blanca ? piece.name : `${piece.name}_negro`;
  const skin = theme.skin === THEMES.STANDARD ? THEMES.BASIC : theme.skin;

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
        src={`images/${img}_${skin.toLowerCase()}.png`}
        alt={piece.name}
      />
    </div>
  );
}
