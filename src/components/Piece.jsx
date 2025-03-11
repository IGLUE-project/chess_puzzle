import { useEffect } from "react";
import "../assets/scss/Piece.scss";

export default function Piece({ piece, handleDragStart, handleDragEnd }) {
  useEffect(() => {}, []);

  return (
    <div className={`Piece ${piece.class}`}>
      {piece.blanca ? (
        <img
          draggable
          onDragStart={() => handleDragStart(piece)}
          onDragEnd={() => handleDragEnd(piece)}
          src={`/src/assets/images/${piece.name}.png`}
          alt={piece.name}
        />
      ) : (
        <img
          draggable
          onDragStart={() => handleDragStart(piece)}
          onDragEnd={() => handleDragEnd(piece)}
          src={`/src/assets/images/${piece.name}_negro.png`}
          alt={piece.name}
        />
      )}
    </div>
  );
}
