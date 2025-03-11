import Board from "./Board";
import "./../assets/scss/MainScreen.scss";
import React, { useState } from "react";
import Box from "./Box";
import { useDispatch } from "react-redux";
import { cleanSquare, saveSquare } from "../redux/ChessboardSlicer";

export default function MainScreen({ show }) {
  const dispatch = useDispatch();
  const [pieceDrag, setPieceDrag] = useState(null);
  const [dropArea, setDropArea] = useState(null);
  const [boxPieces, setBoxPieces] = useState([
    { id: 0, name: "peon", blanca: true, class: "", position: "" },
    { id: 1, name: "caballo", blanca: false, class: "", position: "" },
    { id: 2, name: "torre", blanca: false, class: "", position: "" },
  ]);

  const handleDragStart = (piece) => {
    const updatedPiece = { ...piece, class: "dragged" };
    setBoxPieces((pieces) =>
      pieces.map((p) => {
        if (p.id === piece.id) {
          return { ...p, class: "dragged" };
        }
        return p;
      }),
    );
    setPieceDrag(updatedPiece);
    // setBoxPieces((prevPieces) => prevPieces.filter((p) => p.id !== piece.id));
  };

  const handleDragEnd = (piece) => {
    if (!dropArea) {
      setBoxPieces((pieces) =>
        pieces.map((p) => {
          if (p.id === piece.id) {
            return { ...p, class: "" };
          }
          return p;
        }),
      );
      // setBoxPieces((prevPieces) => [...prevPieces, updatedPiece]);
      setPieceDrag(null);
    }
  };

  const handleDragEnter = (e, x, y) => {
    e.preventDefault();
    setDropArea({ x, y });
    if (pieceDrag) {
      dispatch(saveSquare({ piece: pieceDrag, x, y }));
    }
  };
  const handleDragLeave = (e, x, y) => {
    // setTimeout(() => {
    //   if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
    //     return; // Si el puntero sigue dentro del área, no hagas nada
    //   }
    //   if (pieceDrag) {
    //     setDropArea(null);
    //     dispatch(cleanSquare({ x, y }));
    //   }
    // }, 50);
  };
  const handleDrop = (e, x, y) => {
    e.preventDefault();
    if (pieceDrag) {
      const updatedPiece = { ...pieceDrag, class: "" };
      dispatch(saveSquare({ piece: updatedPiece, x, y }));
      console.log("dropeada");
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
