import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cleanPiece, cleanSquare, saveSquare } from "../redux/ChessboardSlicer";
import "./../assets/scss/MainScreen.scss";
import Board from "./Board";
import Box from "./Box";

const BOXPOSITION = { x: -1, y: -1 };

export default function MainScreen({ show }) {
  const dispatch = useDispatch();
  const [pieceDrag, setPieceDrag] = useState(null);
  const [dropArea, setDropArea] = useState(null);
  const [boxPieces, setBoxPieces] = useState([
    { id: 0, name: "peon", blanca: true, class: "", position: BOXPOSITION, isShadow: false },
    { id: 1, name: "caballo", blanca: false, class: "", position: BOXPOSITION, isShadow: false },
    { id: 2, name: "torre", blanca: false, class: "", position: BOXPOSITION, isShadow: false },
  ]);

  const handleDragStart = (e, piece) => {
    setPieceDrag({ ...piece, class: "dragged", shadow: false });
    setBoxPieces((pieces) =>
      pieces.map((p) => {
        if (p.id === piece.id) {
          return { ...p, class: "dragged", shadow: false };
        }
        return p;
      }),
    );
  };

  const handleDragEnd = (e, piece) => {
    e.preventDefault();
    console.log("fin drag de: " + piece.name + " en " + dropArea);
    if (!dropArea) {
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
    setDropArea(null);
  };

  const handleDragEnter = (e, x, y) => {
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) return;

    console.log(`${pieceDrag?.name} pasa por casilla ${x},${y}. Ocupada: ${e.currentTarget.childNodes.length > 0}`);

    if (pieceDrag && e.currentTarget.childNodes.length === 0) {
      setDropArea({ x, y });
      dispatch(saveSquare({ piece: { ...pieceDrag, shadow: true }, x, y }));
    }
  };

  const handleDragLeave = (e, x, y, piece) => {
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) return;

    console.log(`${pieceDrag?.name} sale de la casilla ${x},${y}`);

    if (pieceDrag && pieceDrag.id === piece.id && piece.shadow) {
      setDropArea(null);
      dispatch(cleanSquare({ piece: pieceDrag, x, y }));
    }
  };

  const handleDrop = (e, x, y, piece) => {
    e.preventDefault();

    if (pieceDrag && piece.id === pieceDrag.id) {
      dispatch(cleanPiece({ piece: pieceDrag }));
      dispatch(saveSquare({ piece: { ...pieceDrag, class: "", position: { x, y } }, x, y }));

      setBoxPieces((prevPieces) => prevPieces.filter((p) => p.id !== pieceDrag.id));

      setPieceDrag(null);
      setDropArea(null);
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
