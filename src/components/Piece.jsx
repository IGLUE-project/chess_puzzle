import { useContext } from "react";
import { GlobalContext } from "./GlobalContext.jsx";
import { useSelector } from "react-redux";
import { getIsSolved } from "../redux/ChessboardSliceSelector";

export default function Piece({ piece, handleDragStart, handleDragEnd }) {
  const { appSettings } = useContext(GlobalContext);
  const solved = useSelector(getIsSolved);

  return (
    <div className={`Piece ${piece.name.toLowerCase()} ${piece.class} ${solved ? " solved" : ""}`}>
      <img
        draggable={!solved}
        onDragStart={(e) => {
          if (!solved) handleDragStart(e, piece);
        }}
        onDragEnd={(e) => {
          if (!solved) handleDragEnd(e, piece);
        }}
        src={appSettings[piece.name.toLowerCase() + "_" + (piece.white ? "white" : "black") + "_img"]}
        alt={piece.name}
      />
    </div>
  );
}