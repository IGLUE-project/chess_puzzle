import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cleanPiece, cleanSquare, saveSquare } from "../redux/ChessboardSlicer";
import "./../assets/scss/MainScreen.scss";
import Board from "./Board";
import Box from "./Box";
import { BOXPOSITION } from "../constants/constants";

export default function MainScreen({ show }) {
  const dispatch = useDispatch();
  const [pieceDrag, setPieceDrag] = useState(null);
  //Piezas de la caja, se deben cargar desde la config
  const [boxPieces, setBoxPieces] = useState([
    { id: 0, name: "peon", blanca: false, class: "", position: BOXPOSITION },
    { id: 1, name: "peon", blanca: false, class: "", position: BOXPOSITION },
    { id: 2, name: "peon", blanca: false, class: "", position: BOXPOSITION },
    { id: 3, name: "peon", blanca: false, class: "", position: BOXPOSITION },
    { id: 4, name: "peon", blanca: false, class: "", position: BOXPOSITION },
    { id: 5, name: "peon", blanca: false, class: "", position: BOXPOSITION },
    { id: 6, name: "peon", blanca: false, class: "", position: BOXPOSITION },
    { id: 7, name: "peon", blanca: false, class: "", position: BOXPOSITION },
    { id: 8, name: "torre", blanca: false, class: "", position: BOXPOSITION },
    { id: 9, name: "torre", blanca: false, class: "", position: BOXPOSITION },
    { id: 10, name: "alfil", blanca: false, class: "", position: BOXPOSITION },
    { id: 11, name: "alfil", blanca: false, class: "", position: BOXPOSITION },
    { id: 12, name: "caballo", blanca: false, class: "", position: BOXPOSITION },
    { id: 13, name: "caballo", blanca: false, class: "", position: BOXPOSITION },
    { id: 14, name: "rey", blanca: false, class: "", position: BOXPOSITION },
    { id: 15, name: "reina", blanca: false, class: "", position: BOXPOSITION },
    { id: 90, name: "peon", blanca: true, class: "", position: BOXPOSITION },
    { id: 91, name: "peon", blanca: true, class: "", position: BOXPOSITION },
    { id: 92, name: "peon", blanca: true, class: "", position: BOXPOSITION },
    { id: 93, name: "peon", blanca: true, class: "", position: BOXPOSITION },
    { id: 94, name: "peon", blanca: true, class: "", position: BOXPOSITION },
    { id: 95, name: "peon", blanca: true, class: "", position: BOXPOSITION },
    { id: 96, name: "peon", blanca: true, class: "", position: BOXPOSITION },
    { id: 97, name: "peon", blanca: true, class: "", position: BOXPOSITION },
    { id: 98, name: "torre", blanca: true, class: "", position: BOXPOSITION },
    { id: 99, name: "torre", blanca: true, class: "", position: BOXPOSITION },
    { id: 910, name: "alfil", blanca: true, class: "", position: BOXPOSITION },
    { id: 911, name: "alfil", blanca: true, class: "", position: BOXPOSITION },
    { id: 912, name: "caballo", blanca: true, class: "", position: BOXPOSITION },
    { id: 913, name: "caballo", blanca: true, class: "", position: BOXPOSITION },
    { id: 914, name: "rey", blanca: true, class: "", position: BOXPOSITION },
    { id: 915, name: "reina", blanca: true, class: "", position: BOXPOSITION },
  ]);

  //Evento cuando coges una pieza
  const handleDragStart = (e, piece) => {
    console.log("dragged");
    setPieceDrag({ ...piece, class: "dragged" });
    setBoxPieces((pieces) =>
      pieces.map((p) => {
        if (p.id === piece.id) {
          return { ...p, class: "dragged" };
        }
        return p;
      }),
    );
  };

  //evento al soltar una pieza
  const handleDragEnd = (e, piece) => {
    if (pieceDrag) {
      if (!(piece.position.x === pieceDrag.x && piece.position.y === pieceDrag.y)) {
        setBoxPieces((prevPieces) => {
          if (prevPieces.some((p) => p.id === piece.id)) {
            return prevPieces.map((p) => (p.id === piece.id ? { ...p, class: "" } : p));
          }
          return [...prevPieces, { ...piece, class: "" }];
        });
        dispatch(cleanPiece({ piece }));
      }
    }
    setPieceDrag(null);
  };

  //evento cuando pasas por un recuadro mientas sujetas una pieza
  const handleDragEnter = (e, x, y) => {
    //compueba que sigue dentro del cuadrado
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) return;

    if (pieceDrag && e.currentTarget.childNodes.length === 0) {
      dispatch(saveSquare({ piece: { ...pieceDrag, shadow: true }, x, y }));
    }
  };

  //evento cuando sales de un recuadro mientas sujetas una pieza
  const handleDragLeave = (e, x, y, piece) => {
    //compueba que sigue dentro del cuadrado
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) return;

    if (pieceDrag && pieceDrag.id === piece.id && piece.shadow) {
      dispatch(cleanSquare({ piece: pieceDrag, x, y }));
    }
  };

  //evento cuando sueltas una pieza en un recuadro
  const handleDrop = (e, x, y, piece) => {
    if (pieceDrag && piece.id === pieceDrag.id) {
      dispatch(cleanPiece({ piece: pieceDrag }));
      dispatch(saveSquare({ piece: { ...pieceDrag, class: "", position: { x, y } }, x, y }));
      setBoxPieces((prevPieces) => prevPieces.filter((p) => p.id !== pieceDrag.id));
      setPieceDrag(null);
    }
  };

  return (
    <div id="MainScreen" className={`screen_wrapper ${show ? "" : "screen_hidden"}`}>
      <div className="frame">
        <div className="border-frame">
          <Board
            handleDrop={handleDrop}
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
          />
          <Box boxPieces={boxPieces} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        </div>
      </div>
    </div>
  );
}
