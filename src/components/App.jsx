import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./../assets/scss/app.scss";
import "./../assets/scss/modal.scss";
import "./../assets/scss/stylePuzzle.scss";

import {
  ALLOWED_ACTIONS,
  ALLPIECES,
  BOXPOSITION,
  CONFIG,
  DEFAULT_APP_SETTINGS,
  defaultChessboard,
  emptyChessboard,
  ESCAPP_CLIENT_SETTINGS,
  ONEPIECEEACH,
  THEME_ASSETS,
} from "../constants/constants.jsx";

import { getChessboard } from "../redux/ChessboardSliceSelector.jsx";
import { saveChessboard, setPieceSolved, setSolved } from "../redux/ChessboardSlicer.jsx";
import { GlobalContext } from "./GlobalContext.jsx";
import MainScreen from "./MainScreen.jsx";

export default function App() {
  const { escapp, setEscapp, appSettings, setAppSettings, Storage, setStorage, Utils, I18n } = useContext(GlobalContext);
  const hasExecutedEscappValidation = useRef(false);

  const gameEnded = useRef(false);
  const [solutionLoaded, setSolutionLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const chessboard = useSelector(getChessboard);
  const [boxPieces, setBoxPieces] = useState([]);
  const [solution, setSolution] = useState([]);
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
    const movedPieces = chessboard
      .flat()
      .filter(
        (piece) =>
          piece !== null &&
          piece.class === "" &&
          (piece.position.x !== piece.initialPosition.x || piece.position.y !== piece.initialPosition.y)
      );

    const movedBoxPieces = boxPieces.filter(
      (piece) =>
        piece !== null &&
        piece.class === "" &&
        (piece.position.x !== piece.initialPosition.x || piece.position.y !== piece.initialPosition.y)
    );

    const updatedSolution = [...movedPieces, ...movedBoxPieces];

    if (JSON.stringify(updatedSolution) !== JSON.stringify(solution) && !gameEnded.current) {
      setSolution(updatedSolution);
    }
  }, [chessboard, boxPieces]);

  useEffect(() => {
    if (appSettings && solution.length === appSettings.solutionLength) {
      checkResult(parseSolution(solution));
    }
  }, [solution]);

  useEffect(() => {
    if (solutionLoaded && gameEnded.current) {
      winAnimation();
    }
  }, [solutionLoaded]);

  function restoreAppState(erState) {
    Utils.log("Restore application state based on escape room state:", erState);
    // Si el puzle está resuelto lo ponemos en posicion de resuelto
    if (escapp.getAllPuzzlesSolved()) {
      if (appSettings.actionAfterSolve === "LOAD_SOLUTION") {
        if (escapp.getAllPuzzlesSolved()) {
          let solution = escapp.getLastSolution();
          if (typeof solution !== "undefined") {
            //parsear la solucion, aplicarla y hacer win animation
            gameEnded.current = true;
            loadSolution(erState.puzzleData[+escapp.getSettings().resourceId].solution || null);
          }
        }
      }
    }
  }

  function processAppSettings(_appSettings) {
    if (typeof _appSettings !== "object") {
      _appSettings = {};
    }

    let skinSettings = THEME_ASSETS[_appSettings.skin] || {};

    let DEFAULT_APP_SETTINGS_SKIN = Utils.deepMerge(DEFAULT_APP_SETTINGS, skinSettings);

    // Merge _appSettings with DEFAULT_APP_SETTINGS_SKIN to obtain final app settings
    _appSettings = Utils.deepMerge(DEFAULT_APP_SETTINGS_SKIN, _appSettings);

    if (!ALLOWED_ACTIONS.includes(_appSettings.actionAfterSolve)) {
      _appSettings.actionAfterSolve = DEFAULT_APP_SETTINGS.actionAfterSolve;
    }

    let newChessboard;
    let newBox;

    switch (_appSettings.box) {
      case CONFIG.ALLPIECES:
        newBox = ALLPIECES;
        break;

      case CONFIG.ONEPIECEEACH:
        newBox = ONEPIECEEACH;
        break;

      case CONFIG.EMPTY:
        newBox = [];
        break;

      case CONFIG.CUSTOMBOX:
        newBox = _appSettings.customBox.map((piece, index) => ({
          ...piece,
          id: index,
          class: "",
          position: BOXPOSITION,
          initialPosition: BOXPOSITION,
        }));
        break;

      default:
        newBox = ALLPIECES;
    }

    switch (_appSettings.chessBoard) {
      case CONFIG.EMPTY:
        newChessboard = emptyChessboard();
        break;
      case CONFIG.DEFAULTCHESSBOARD:
        newChessboard = defaultChessboard();
        break;

      case CONFIG.CUSTOMCHESSBOARD:
        newChessboard = emptyChessboard();
        _appSettings.customChessboard.forEach((piece, index) => {
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

      default:
        newChessboard = emptyChessboard();
    }
    setBoxPieces(newBox);
    dispatch(saveChessboard(newChessboard));

    //Init internacionalization module
    I18n.init(_appSettings);

    if (typeof _appSettings.message !== "string") {
      _appSettings.message = I18n.getTrans("i.message");
    }

    //Change HTTP protocol to HTTPs in URLs if necessary
    _appSettings = Utils.checkUrlProtocols(_appSettings);

    //Preload resources (if necessary)
    Utils.preloadImages([_appSettings.backgroundMessage]);
    //Utils.preloadAudios([_appSettings.soundBeep,_appSettings.soundNok,_appSettings.soundOk]); //Preload done through HTML audio tags
    //Utils.preloadVideos(["videos/some_video.mp4"]);
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
      }
    });
  }
  function submitPuzzleSolution(_solution) {
    Utils.log("Submit puzzle solution", _solution);

    escapp.submitNextPuzzle(_solution, {}, (success, erState) => {
      Utils.log("Solution submitted to Escapp", _solution, success, erState);
    });
  }

  function winAnimation(_solution) {
    new Audio("sounds/win.wav").play();
    dispatch(setSolved(true));

    const sol = _solution ? _solution : solution;

    const highlightedIds = sol.filter((piece) => piece.position.x === -1 && piece.position.y === -1).map((piece) => piece.id);

    setBoxPieces((prev) =>
      prev.map((p) => ({
        ...p,
        class: highlightedIds.includes(p.id) ? "highlighted" : "",
      }))
    );

    sol.forEach(({ position: { x, y } }) => {
      if (x !== -1 || y !== -1) {
        dispatch(setPieceSolved({ x, y }));
      }
    });
  }

  function positionToCoordinates(position) {
    if (position === "box") return { x: -1, y: -1 };
    const column = position[0].toLowerCase();
    const row = position[1];

    const x = parseInt(row) - 1;
    const y = column.charCodeAt(0) - "a".charCodeAt(0);

    return { x, y };
  }
  function coordinatesToPosition(x, y) {
    if (x === -1 && y === -1) return "box";
    const column = String.fromCharCode("a".charCodeAt(0) + y);
    const row = (x + 1).toString();

    return column + row;
  }

  function loadSolution(solutionStr) {
    const parsedSolution = solutionStr.split(";").map((entry, index) => {
      const [name, initialPosStr, currentPosStr, blancaStr] = entry.split(",");

      return {
        id: index * 999, // temporal; se reemplazará al encontrar la pieza real
        name,
        blanca: blancaStr === "true",
        class: "",
        initialPosition: positionToCoordinates(initialPosStr),
        position: positionToCoordinates(currentPosStr),
      };
    });

    // Clonamos el estado actual
    const newChessboard = chessboard.map((row) => row.map((cell) => (cell ? { ...cell } : null)));
    const newBoxPieces = [...boxPieces.map((p) => ({ ...p }))];

    parsedSolution.forEach((solPiece) => {
      const { name, blanca, initialPosition, position } = solPiece;
      let found = null;

      // 1. Buscar la pieza en el tablero
      if (
        initialPosition.x >= 0 &&
        initialPosition.y >= 0 &&
        newChessboard[initialPosition.x][initialPosition.y] &&
        newChessboard[initialPosition.x][initialPosition.y].name === name &&
        newChessboard[initialPosition.x][initialPosition.y].blanca === blanca
      ) {
        found = newChessboard[initialPosition.x][initialPosition.y];
        newChessboard[initialPosition.x][initialPosition.y] = null;
      }

      // 2. Si no está en el tablero, buscarla en la caja
      if (!found) {
        const index = newBoxPieces.findIndex(
          (p) =>
            p.initialPosition.x === initialPosition.x && p.initialPosition.y === initialPosition.y && p.name === name && p.blanca === blanca
        );
        if (index !== -1) {
          found = newBoxPieces[index];
          newBoxPieces.splice(index, 1);
        }
      }

      if (found) {
        // Mover la pieza a su posición final
        found.initialPosition = initialPosition;
        found.position = position;

        if (position.x === -1 && position.y === -1) {
          found.position = BOXPOSITION;
          found.initialPosition = BOXPOSITION;
          newBoxPieces.push(solPiece);
        } else {
          newChessboard[position.x][position.y] = solPiece;
        }
      } else {
        Utils.log("⚠️ Pieza no encontrada para mover:", solPiece);
      }
    });

    setSolutionLoaded(true);
    dispatch(saveChessboard(newChessboard));
    setBoxPieces(newBoxPieces);
    setSolution(parsedSolution);
    return parsedSolution;
  }

  function parseSolution(solution) {
    return solution
      .map(
        (piece) =>
          `${piece.name},${coordinatesToPosition(piece.initialPosition.x, piece.initialPosition.y)},${coordinatesToPosition(
            piece.position.x,
            piece.position.y
          )},${piece.blanca}`
      )
      .join(";");
  }

  const resetPieces = () => {
    setAppSettings(processAppSettings(escapp.getAppSettings()));
  };

  return (
    <div
      id="global_wrapper"
      className={`${appSettings !== null && typeof appSettings.skin === "string" ? appSettings.skin.toLowerCase() : ""}`}
    >
      <div className={`main-background ${fail ? "fail" : ""}`}>
        {appSettings && <MainScreen boxPieces={boxPieces} setBoxPieces={setBoxPieces} resetPieces={resetPieces} theme={appSettings} />}
      </div>
    </div>
  );
}
