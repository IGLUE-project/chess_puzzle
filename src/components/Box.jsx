import { useEffect } from "react";
import Piece from "./Piece";
import "../assets/scss/Box.scss";

export default function Box({ boxPieces, handleDragStart, handleDragEnd, theme }) {
  useEffect(() => {}, []);

  return (
    <div className={`Box box-${theme.name}`} style={{ backgroundImage: `url(${theme.boxImg})` }}>
      {boxPieces.map((piece) => (
        <Piece
          piece={piece}
          handleDragStart={handleDragStart}
          key={piece.id}
          handleDragEnd={handleDragEnd}
          theme={theme}
        />
      ))}
      {/* <img className="box" src={`/src/assets/images/${stylePuzzle}_box.svg`}></img> */}
    </div>
  );
}
