import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalContext } from "./GlobalContext.jsx";
import { getChessboard } from "../redux/ChessboardSliceSelector.jsx";
import { saveChessboard, setPieceSolved, setSolved } from "../redux/ChessboardSlicer.jsx";
import {
  DEFAULT_APP_SETTINGS,
  SKIN_SETTINGS,
  ESCAPP_CLIENT_SETTINGS,
  createEmptyBoard,
  createClassicBoard,
  createBoardAfterQueenGambit,
  createBoardAfterSpanishOpening,
  createBoardAfterItalianOpening,
  BOX_POSITION,
  BOX_EMPTY,
  createBoxWithAllPieces,
} from "../constants/constants.jsx";
import MainScreen from "./MainScreen.jsx";
import "./../assets/scss/app.scss";

export default function App() {
  const { escapp, setEscapp, appSettings, setAppSettings, Storage, setStorage, Utils, I18n } =
    useContext(GlobalContext);
  const hasExecutedEscappValidation = useRef(false);
  const gameEnded = useRef(false);
  const firstLoad = useRef(true);
  const solutionSended = useRef(false);
  const [solutionLoaded, setSolutionLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const chessboard = useSelector(getChessboard);
  const [boxPieces, setBoxPieces] = useState([]);
  const [moves, setMoves] = useState("");
  const [fail, setFail] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    //Init Escapp client
    if (escapp !== null) {
      return;
    }
    //Create the Escapp client instance.
    let _escapp = new ESCAPP(ESCAPP_CLIENT_SETTINGS);
    setEscapp(_escapp);
    Utils.log("Escapp client initiated with settings:", _escapp.getSettings());

    //Use the storage feature provided by Escapp client.
    setStorage(_escapp.getStorage());

    //Get app settings provided by the Escapp server.
    let _appSettings = processAppSettings(_escapp.getAppSettings());
    setAppSettings(_appSettings);
  }, []);

  useEffect(() => {
    if (!hasExecutedEscappValidation.current && escapp !== null && appSettings !== null && Storage !== null) {
      hasExecutedEscappValidation.current = true;

      //Register callbacks in Escapp client and validate user.
      escapp.registerCallback("onNewErStateCallback", function (erState) {
        try {
          Utils.log("New escape room state received from ESCAPP", erState);
          restoreAppState(erState);
        } catch (e) {
          Utils.log("Error in onNewErStateCallback", e);
        }
      });

      escapp.registerCallback("onErRestartCallback", function (erState) {
        try {
          Utils.log("Escape Room has been restarted.", erState);
          if (typeof Storage !== "undefined") {
            Storage.removeSetting("state");
          }
        } catch (e) {
          Utils.log("Error in onErRestartCallback", e);
        }
      });

      //Validate user. To be valid, a user must be authenticated and a participant of the escape room.
      escapp.validate((success, erState) => {
        try {
          Utils.log("ESCAPP validation", success, erState);
          if (success) {
            restoreAppState(erState);
            setLoading(false);
          }
        } catch (e) {
          Utils.log("Error in validate callback", e);
        }
      });
    }
  }, [escapp, appSettings, Storage]);

  useEffect(() => {
    if (
      appSettings &&
      moves.split(";").length === appSettings.solutionLength &&
      !gameEnded.current &&
      !solutionSended.current
    ) {
      checkResult(moves);
      solutionSended.current = true;
    }
  }, [moves]);

  useEffect(() => {
    if (solutionLoaded && gameEnded.current) {
      winAnimation();
    }
  }, [solutionLoaded]);

  function restoreAppState(erState) {
    Utils.log("Restore application state based on escape room state:", erState);
    // Si el puzle está resuelto lo ponemos en posicion de resuelto
    if (escapp.getAllPuzzlesSolved() && appSettings.actionWhenLoadingIfSolved) {
      const _solution = escapp.getLastSolution();
      if (_solution) {
        gameEnded.current = true;
        loadSolution(_solution);
      }
    } else {
      const state = Storage.getSetting("state");
      if (state) {
        loadSolution(state);
      }
    }
  }

  function processAppSettings(_appSettings) {
    if (typeof _appSettings !== "object") {
      _appSettings = {};
    }
    if (typeof _appSettings.skin === "undefined" && typeof DEFAULT_APP_SETTINGS.skin === "string") {
      _appSettings.skin = DEFAULT_APP_SETTINGS.skin;
    }

    let skinSettings = SKIN_SETTINGS[_appSettings.skin] || {};
    let DEFAULT_APP_SETTINGS_SKIN = Utils.deepMerge(DEFAULT_APP_SETTINGS, skinSettings);
    // Merge _appSettings with DEFAULT_APP_SETTINGS_SKIN to obtain final app settings
    _appSettings = Utils.deepMerge(DEFAULT_APP_SETTINGS_SKIN, _appSettings);

    let newChessboard;
    let newBox;

    switch (_appSettings.initialSetup) {
      case "EMPTY_BOARD":
        newChessboard = createEmptyBoard();
        newBox = createBoxWithAllPieces();
        break;
      case "QUEEN_GAMBIT":
        newChessboard = createBoardAfterQueenGambit();
        newBox = BOX_EMPTY;
        break;
      case "SPANISH_OPENING":
        newChessboard = createBoardAfterSpanishOpening();
        newBox = BOX_EMPTY;
        break;
      case "ITALIAN_OPENING":
        newChessboard = createBoardAfterItalianOpening();
        newBox = BOX_EMPTY;
        break;
      case "CUSTOM":
        newBox = _appSettings.customBox.map((piece, index) => ({
          ...piece,
          id: index,
          class: "",
          position: BOX_POSITION,
          initialPosition: BOX_POSITION,
        }));

        newChessboard = createEmptyBoard();
        _appSettings.customBoard.forEach((piece, index) => {
          let position = positionToCoordinates(piece.position);
          newChessboard[position.x][position.y] = {
            ...piece,
            id: index + newBox.length,
            class: "",
            position: position,
            initialPosition: position,
          };
        });
        break;
      case "CLASSIC":
      default:
        newChessboard = createClassicBoard();
        newBox = BOX_EMPTY;
    }

    setBoxPieces(newBox);
    dispatch(saveChessboard(newChessboard));

    //Init internacionalization module
    I18n.init(_appSettings);

    //Change HTTP protocol to HTTPs in URLs if necessary
    _appSettings = Utils.checkUrlProtocols(_appSettings);

    //Preload resources (if necessary)
    //Utils.preloadImages([]);
    Utils.log("App settings:", _appSettings);
    return _appSettings;
  }

  function checkResult(_solution) {
    escapp.checkNextPuzzle(_solution, {}, (success, erState) => {
      Utils.log("Check solution Escapp response", success, erState);
      if (success) {
        winAnimation();
        gameEnded.current = true;
        try {
          setTimeout(() => {
            submitPuzzleSolution(_solution);
          }, 2000);
        } catch (e) {
          Utils.log("Error in checkNextPuzzle", e);
        }
      } else {
        if (appSettings.resetOnFail) resetPieces();
      }
    });
  }
  function submitPuzzleSolution(_solution) {
    Utils.log("Submit puzzle solution", _solution);

    escapp.submitNextPuzzle(_solution, {}, (success, erState) => {
      Utils.log("Solution submitted to Escapp", _solution, success, erState);
    });
  }

  function winAnimation() {
    new Audio(appSettings.winAudio).play();
    dispatch(setSolved(true));
  }

  function positionToCoordinates(position) {
    if (position === "Box") return { x: -1, y: -1 };
    const column = position[0].toLowerCase();
    const row = position[1];

    const x = parseInt(row) - 1;
    const y = column.charCodeAt(0) - "a".charCodeAt(0);

    return { x, y };
  }
  function coordinatesToPosition(x, y) {
    if (x === -1 && y === -1) return "Box";
    const column = String.fromCharCode("a".charCodeAt(0) + y);
    const row = (x + 1).toString();

    return column + row;
  }

  function parseSolution(_solutionStr) {
    return _solutionStr
      .split(";")
      .map((entry, index) => {
        const parts = entry.split(",");

        let name;
        let whiteStr;
        let initialPosStr;
        let currentPosStr;

        if (parts.length === 4) {
          // Pieza que viene de la caja
          [name, whiteStr, initialPosStr, currentPosStr] = parts;
        } else if (parts.length === 2) {
          // Pieza que ya estaba en el tablero
          [initialPosStr, currentPosStr] = parts;
          name = "";
          whiteStr = "";
        } else {
          Utils.log("⚠️ Entrada inválida en solución:", entry);
          return null;
        }

        return {
          id: (index + 1) * 1000,
          name,
          white: whiteStr === "White",
          class: "",
          initialPosition: positionToCoordinates(initialPosStr),
          position: positionToCoordinates(currentPosStr),
        };
      })
      .filter(Boolean); // Elimina los null en caso de errores
  }

  function loadSolution(_solutionStr) {
    const parsedSolution = parseSolution(_solutionStr);
    const newChessboard = chessboard.map((row) => row.map((cell) => (cell ? { ...cell } : null)));
    const newBoxPieces = [...boxPieces.map((p) => ({ ...p }))];

    parsedSolution.forEach((solPiece) => {
      const { name, white, initialPosition, position } = solPiece;
      let found = null;
      let tablePiece = null;

      // 1. Buscar en el tablero
      if (initialPosition.x >= 0 && initialPosition.y >= 0) {
        tablePiece = newChessboard[initialPosition.x][initialPosition.y];
        if (tablePiece) {
          found = tablePiece;
          newChessboard[initialPosition.x][initialPosition.y] = null;
        }
      }

      // 2. Buscar en la caja
      if (!found && name) {
        const index = newBoxPieces.findIndex(
          (p) =>
            p.position.x === initialPosition.x &&
            p.position.y === initialPosition.y &&
            p.name === name &&
            p.white === white,
        );
        if (index !== -1) {
          found = newBoxPieces[index];
          newBoxPieces.splice(index, 1);
        }
      }

      if (found) {
        found.initialPosition = initialPosition;
        found.position = position;

        if (position.x === -1 && position.y === -1) {
          newBoxPieces.push({ ...found, moved: true });
        } else {
          if (newChessboard[position.x][position.y]) {
            //hay una pieza en la posición, movemos la pieza comida a  la caja
            newBoxPieces.push({ ...newChessboard[position.x][position.y], position: BOX_POSITION });
          }
          newChessboard[position.x][position.y] = { ...found, moved: true };
        }
      } else {
        //Utils.log("⚠️ Pieza no encontrada para mover:", solPiece);
      }
    });

    setSolutionLoaded(true);
    dispatch(saveChessboard(newChessboard));
    setBoxPieces(newBoxPieces);
    setMoves(_solutionStr);
    return parsedSolution;
  }

  function addMove(prervPiece, piece) {
    const from = coordinatesToPosition(prervPiece.position.x, prervPiece.position.y);
    const to = coordinatesToPosition(piece.position.x, piece.position.y);
    const color = piece.white ? "White" : "Black";

    if (from !== to) {
      let move = moves ? ";" : "";
      move += prervPiece.position.x === -1 ? `${piece.name},${color},${from},${to}` : `${from},${to}`;

      Storage.saveSetting("state", moves + move);
      setMoves((prevMoves) => prevMoves + move);
    }
  }

  const resetPieces = () => {
    setAppSettings(processAppSettings(escapp.getAppSettings()));
    setMoves("");
    Storage.saveSetting("state", "");
    document.getElementById("audio_reset").play();
    solutionSended.current = false;
  };

  return (
    <div
      id="global_wrapper"
      className={`${
        appSettings !== null && typeof appSettings.skin === "string" ? appSettings.skin.toLowerCase() : ""
      }`}
    >
      <div className={`main-background ${fail ? "fail" : ""}`}>
        {!loading && (
          <>
            <MainScreen boxPieces={boxPieces} setBoxPieces={setBoxPieces} resetPieces={resetPieces} addMove={addMove} />
            <audio id="audio_reset" src={appSettings.resetAudio} autostart="false" preload="auto" />
          </>
        )}
      </div>
    </div>
  );
}
