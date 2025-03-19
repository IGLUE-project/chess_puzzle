import { useEffect } from "react";
import Piece from "./Piece";
import "../assets/scss/Box.scss";

export default function Box({ boxPieces, handleDragStart, handleDragEnd, stylePuzzle }) {
  useEffect(() => {}, []);

  return (
    <div className={`Box box-${stylePuzzle}`}>
    
      {boxPieces.map((piece) => (
        <Piece piece={piece} handleDragStart={handleDragStart} key={piece.id} handleDragEnd={handleDragEnd} stylePuzzle={stylePuzzle} />
      ))}
        {/* <img className="box" src={`/src/assets/images/${stylePuzzle}_box.svg`}></img> */}
    </div>
  );
}
