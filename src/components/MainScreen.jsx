import { useState } from "react";
import { useDispatch } from "react-redux";
import { ALLPICES } from "../constants/constants";
import { cleanPiece, cleanSquare, saveSquare } from "../redux/ChessboardSlicer";
import "./../assets/scss/MainScreen.scss";
import Board from "./Board";
import Box from "./Box";

export default function MainScreen({ show, solvePuzzle }) {
  const dropAudio = document.getElementById("audio_drop");
  const dragAudio = document.getElementById("audio_grab");
  const boxAudio = document.getElementById("audio_dropbox");

  const dispatch = useDispatch();
  const [pieceDrag, setPieceDrag] = useState(null);
  //Piezas de la caja, se deben cargar desde la config
  const [boxPieces, setBoxPieces] = useState(ALLPICES);

  //Evento cuando coges una pieza
  const handleDragStart = (e, piece) => {
    dragAudio.play();
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
        solvePuzzle();
        boxAudio.play();
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

    setTimeout(() => {
      if (pieceDrag && pieceDrag.id === piece.id && piece.shadow) {
        dispatch(cleanSquare({ piece: pieceDrag, x, y }));
      }
    }, 50);
  };

  //evento cuando sueltas una pieza en un recuadro
  const handleDrop = (e, x, y, piece) => {
    if (pieceDrag && piece.id === pieceDrag.id) {
      dispatch(cleanPiece({ piece: pieceDrag }));
      dispatch(saveSquare({ piece: { ...pieceDrag, class: "", position: { x, y } }, x, y }));
      setBoxPieces((prevPieces) => prevPieces.filter((p) => p.id !== pieceDrag.id));
      dropAudio.play();
      setPieceDrag(null);
      solvePuzzle();
    }
  };

  return (
    <div id="MainScreen" className={`screen_wrapper ${show ? "" : "screen_hidden"}`}>
      <div className="frame">
        <div className="border-frame">
          <audio id="audio_drop" src="sounds/move-self.mp3" autostart="false" preload="auto" />
          <audio id="audio_grab" src="sounds/move-check.mp3" autostart="false" preload="auto" />
          <audio id="audio_dropbox" src="sounds/box.wav" autostart="false" preload="auto" />
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
