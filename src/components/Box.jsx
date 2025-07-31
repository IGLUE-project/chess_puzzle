import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import Piece from "./Piece";

export default function Box({ boxPieces, handleDragStart, handleDragEnd, size }) {
  const { appSettings } = useContext(GlobalContext);
  useEffect(() => {}, []);

  return (
    <div
      className={`Box box-${appSettings.skin}`}
      style={{
        backgroundImage: `url(${appSettings.boxImg})`,
        height: size.height * 0.93,
        width: size.height * 0.45,
        padding: size.height * 0.05,
        paddingLeft: size.height * 0.067,
      }}
    >
      {boxPieces.map((piece) => (
        <div className="square" key={piece.id} style={{ width: size.height * 0.111, height: size.height * 0.111 }}>
          <Piece
            piece={piece}
            handleDragStart={handleDragStart}
            key={piece.id}
            handleDragEnd={handleDragEnd}
          />
        </div>
      ))}
    </div>
  );
}