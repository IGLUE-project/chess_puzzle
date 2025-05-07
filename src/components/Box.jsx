import { useEffect } from "react";
import Piece from "./Piece";
import "../assets/scss/Box.scss";

export default function Box({ boxPieces, handleDragStart, handleDragEnd, theme, size }) {
  useEffect(() => {}, []);

  return (
    <div
      className={`Box box-${theme.name}`}
      style={{
        backgroundImage: `url(${theme.boxImg})`,
        height: size.height * 0.35,
        width: size.height * 0.35,
        padding: size.height * 0.05,
      }}
    >
      {boxPieces.map((piece) => (
        <div className="square" key={piece.id} style={{ width: size.height * 0.0435, height: size.height * 0.0695 }}>
          <Piece
            piece={piece}
            handleDragStart={handleDragStart}
            key={piece.id}
            handleDragEnd={handleDragEnd}
            theme={theme}
          />
        </div>
      ))}
      {/* <img className="box" src={`/src/assets/images/${stylePuzzle}_box.svg`}></img> */}
    </div>
  );
}
