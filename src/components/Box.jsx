import { useEffect } from "react";
import Piece from "./Piece";
import "../assets/scss/Box.scss";

export default function Box({ boxPieces, handleDragStart, handleDragEnd }) {
  useEffect(() => {}, []);

  return (
    <div className="Box">
      {boxPieces.map((piece) => (
        <Piece piece={piece} handleDragStart={handleDragStart} key={piece.id} handleDragEnd={handleDragEnd} />
      ))}
    </div>
  );
}
