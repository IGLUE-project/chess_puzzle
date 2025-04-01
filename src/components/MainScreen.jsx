import { useState } from "react";
import { useDispatch } from "react-redux";
import { cleanPiece, cleanSquare, saveSquare } from "../redux/ChessboardSlicer";
import "./../assets/scss/MainScreen.scss";
import Board from "./Board";
import Box from "./Box";
import { BOXPOSITION } from "../constants/constants";

export default function MainScreen({ show, boxPieces, setBoxPieces }) {
  const dropAudio = document.getElementById("audio_drop");
  const dragAudio = document.getElementById("audio_grab");
  const boxAudio = document.getElementById("audio_dropbox");

  const dispatch = useDispatch();
  const [pieceDrag, setPieceDrag] = useState(null);
  const [stylePuzzle, setStylePuzzle] = useState("basic");

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
          return [...prevPieces, { ...piece, class: "", position: BOXPOSITION }];
        });
        dispatch(cleanPiece({ piece }));
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
    }
  };

  return (
    <div id="MainScreen" className={`screen_wrapper bg-${stylePuzzle} ${show ? "" : "screen_hidden"}`}>
      <audio id="audio_drop" src="sounds/move-self.mp3" autostart="false" preload="auto" />
      <audio id="audio_grab" src="sounds/move-check.mp3" autostart="false" preload="auto" />
      <audio id="audio_dropbox" src="sounds/box.wav" autostart="false" preload="auto" />
      <div className="buttons-container">
        <button onClick={() => setStylePuzzle("basic")} className={`button-basic`}>
          basic
        </button>
        <button onClick={() => setStylePuzzle("futuristic")} className={`button-futuristic`}>
          futuristic
        </button>
      </div>
      <div className="frame">
        <div className={`border-frame border-frame-${stylePuzzle}`}>
          <Board
            handleDrop={handleDrop}
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            stylePuzzle={stylePuzzle}
          />
          <Box
            boxPieces={boxPieces}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            stylePuzzle={stylePuzzle}
          />
        </div>
      </div>
    </div>
  );
}
