import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { useDispatch, useSelector } from "react-redux";
import { cleanPiece, cleanSquare, saveSquare } from "../redux/ChessboardSlicer";
import Board from "./Board";
import Box from "./Box";
import { BOX_POSITION } from "../constants/constants";
import { getIsSolved } from "../redux/ChessboardSliceSelector";
import "./../assets/scss/MainScreen.scss";

let dropAudio;
let boxAudio;

export default function MainScreen({ boxPieces, setBoxPieces, resetPieces, addMove }) {
  const { appSettings, I18n } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const [pieceDrag, setPieceDrag] = useState(null);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const solved = useSelector(getIsSolved);

  useEffect(() => {
    dropAudio = document.getElementById("audio_drop");
    boxAudio = document.getElementById("audio_dropbox");

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
    e.dataTransfer.effectAllowed = "move";

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
    e.preventDefault();
    if (pieceDrag) {
      if (!(piece.position.x === pieceDrag.x && piece.position.y === pieceDrag.y)) {
        setBoxPieces((prevPieces) => {
          if (prevPieces.some((p) => p.id === piece.id)) {
            return prevPieces.map((p) => (p.id === piece.id ? { ...p, class: "", moved: true } : p));
          }
          return [...prevPieces, { ...piece, class: "", position: BOX_POSITION, moved: true }];
        });
        dispatch(cleanPiece({ piece }));
        boxAudio.play();
        addMove(pieceDrag, { ...piece, class: "", position: BOX_POSITION });
      }
    }
    setPieceDrag(null);
  };

  //evento cuando pasas por un recuadro mientas sujetas una pieza
  const handleDragEnter = (e, x, y) => {
    e.preventDefault();
    //compueba que sigue dentro del cuadrado
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) return;
    if (pieceDrag && e.currentTarget.childNodes.length === 0) {
      dispatch(saveSquare({ piece: { ...pieceDrag, shadow: true }, x, y }));
    }
  };

  //evento cuando sales de un recuadro mientas sujetas una pieza
  const handleDragLeave = (e, x, y, piece) => {
    e.preventDefault();
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
    e.preventDefault();
    if (pieceDrag) {
      if (piece.id === pieceDrag.id) {
        dropAudio.play();
      } else {
        setBoxPieces((prevPieces) => {
          if (prevPieces.some((p) => p.id === piece.id)) {
            return prevPieces.map((p) => (p.id === piece.id ? { ...p, class: "" } : p));
          }
          return [...prevPieces, { ...piece, class: "", position: BOX_POSITION }];
        });
        boxAudio.play();
      }
      setBoxPieces((prevPieces) => prevPieces.filter((p) => p.id !== pieceDrag.id));
      dispatch(cleanPiece({ piece: pieceDrag }));
      dispatch(saveSquare({ piece: { ...pieceDrag, class: "", position: { x, y }, moved: true }, x, y }));
      setPieceDrag(null);
      addMove(pieceDrag, { ...pieceDrag, class: "", position: { x, y } });
    }
  };

  return (
    <div
      id="MainScreen"
      className={`screen_wrapper bg-${appSettings.skin} `}
      style={{ backgroundImage: `url(${appSettings.backgroundImg})` }}
    >
      {!solved && (
        <div className="buttons-container">
          <button onClick={resetPieces} className={`button-reset`}>
            {I18n.getTrans("i.reset")}
          </button>
        </div>
      )}
      <div className="frame">
        <div className={`border-frame border-frame-${appSettings.skin}`} style={{ gap: size.height * 0.05 }}>
          <Board
            handleDrop={handleDrop}
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            appSettings={appSettings}
            size={size}
          />
          <Box boxPieces={boxPieces} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} size={size} />
        </div>
      </div>
      <>
        <audio id="audio_drop" src={appSettings.dropAudio} autostart="false" preload="auto" />
        <audio id="audio_dropbox" src={appSettings.discardAudio} autostart="false" preload="auto" />
      </>
    </div>
  );
}
