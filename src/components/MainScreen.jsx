import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanPiece, cleanSquare, saveSquare } from "../redux/ChessboardSlicer";
import "./../assets/scss/MainScreen.scss";
import Board from "./Board";
import Box from "./Box";
import { BOXPOSITION, THEMES } from "../constants/constants";
import { getIsSolved } from "../redux/ChessboardSliceSelector";

let dropAudio;
let dragAudio;
let boxAudio;
let resetAudio;

export default function MainScreen({ boxPieces, setBoxPieces, resetPieces, theme }) {
  const dispatch = useDispatch();
  const [pieceDrag, setPieceDrag] = useState(null);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const solved = useSelector(getIsSolved);

  useEffect(() => {
    dropAudio = document.getElementById("audio_drop");
    dragAudio = document.getElementById("audio_grab");
    boxAudio = document.getElementById("audio_dropbox");
    resetAudio = document.getElementById("audio_reset");
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const aspectRatio = 16 / 9;
      let width = windowWidth * 0.9;
      let height = width / aspectRatio;

      if (height > windowHeight * 0.9) {
        height = windowHeight * 0.9;
        width = height * aspectRatio;
      }
      setSize({ width, height });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      })
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

  function resetPiecesButton() {
    resetAudio.play();
    resetPieces();
  }

  return (
    <div id="MainScreen" className={`screen_wrapper bg-${theme.name} `} style={{ backgroundImage: `url(${theme.backgroundImg})` }}>
      {!solved && (
        <div className="buttons-container">
          <button onClick={() => resetPiecesButton()} className={`button-futuristic`}>
            reset
          </button>
        </div>
      )}
      <div className="frame">
        <div className={`border-frame border-frame-${theme.name}`} style={{ gap: size.height * 0.05 }}>
          <Board
            handleDrop={handleDrop}
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            theme={theme}
            size={size}
          />
          <Box boxPieces={boxPieces} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} theme={theme} size={size} />
        </div>
      </div>
      <>
        <audio id="audio_drop" src={theme.dropAudio} autostart="false" preload="auto" />
        <audio id="audio_grab" src={theme.dragAudio} autostart="false" preload="auto" />
        <audio id="audio_dropbox" src={theme.discardAudio} autostart="false" preload="auto" />
        <audio id="audio_reset" src={theme.resetAudio} autostart="false" preload="auto" />
      </>
    </div>
  );
}
