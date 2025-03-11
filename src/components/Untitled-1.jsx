import Board from "./Board";
import "./../assets/scss/MainScreen.scss";
import React, { useState } from "react";

export default function MainScreen({ chessBoard, resetButton, show }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", "dragged-item"); // Guardamos un identificador
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    console.log("Elemento soltado:", data);
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necesario para permitir el drop
  };

  return (
    <div id="MainScreen" className={`screen_wrapper ${show ? "" : "screen_hidden"}`}>
      <div className="frame">
        <div className="border-frame">
          <img
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{ width: "40%" }}
            src="/src/components/chessboard.jpg"
            alt="Tablero"
          />
          <div className="box-container">
            <div
              className="rojo"
              draggable
              onDragStart={handleDragStart}
              onDragEnd={() => setIsDragging(false)}
              style={{ width: "50px", height: "50px", backgroundColor: "red", cursor: "grab" }}
            ></div>
            <img src="/src/components/caja.svg" alt="Caja" />
          </div>
        </div>
      </div>
    </div>
  );
}
