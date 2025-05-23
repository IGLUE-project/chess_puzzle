import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./../assets/scss/app.scss";
import "./../assets/scss/modal.scss";
import "./../assets/scss/stylePuzzle.scss";

import * as I18n from "../vendors/I18n.js";

import { GLOBAL_CONFIG } from "../config/config.js";
import {
  ALLPIECES,
  BOXPOSITION,
  CONFIG,
  defaultChessboard,
  emptyChessboard,
  KEYPAD_SCREEN,
  ONEPIECEEACH,
  PAINTING_SCREEN,
  THEME_ASSETS,
  THEMES,
} from "../constants/constants.jsx";

import { getChessboard } from "../redux/ChessboardSliceSelector.jsx";
import { saveChessboard } from "../redux/ChessboardSlicer.jsx";
import MainScreen from "./MainScreen.jsx";

let escapp;

const initialConfig = {
  config: {
    theme: THEMES.ANCIENT,
    solutionLength: 4,
  },
  box: CONFIG.ALLPIECES,
  customBox: [
    { name: "peon", blanca: false },
    { name: "torre", blanca: true },
  ],
  chessBoard: CONFIG.DEFAULTCHESSBOARD,
  customChessboard: [
    { position: "a7", name: "peon", blanca: false },
    { position: "b7", name: "peon", blanca: false },
    { position: "c7", name: "peon", blanca: false },
    { position: "d7", name: "torre", blanca: true },
  ],
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(KEYPAD_SCREEN);
  const [prevScreen, setPrevScreen] = useState(PAINTING_SCREEN);
  const chessboard = useSelector(getChessboard);
  const [boxPieces, setBoxPieces] = useState([]);
  const [solution, setSolution] = useState([]);
  const [fail, setFail] = useState(false);
  const [config, setConfig] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    loadConfig(initialConfig);

    //localStorage.clear();  //For development, clear local storage (comentar y descomentar para desarrollo)
    I18n.init(GLOBAL_CONFIG);

    escapp = new ESCAPP(GLOBAL_CONFIG.escapp);
    // escapp.validate((success, er_state) => {
    //   console.log("ESCAPP validation", success, er_state);
    //   try {
    //     if (success) {
    //       //ha ido bien, restauramos el estado recibido
    //       restoreState(er_state);
    //     }
    //   } catch (e) {
    //     console.error(e);
    //   }
    // });

    setLoading(false);
  }, []);

  function solvePuzzle(solution) {
    console.log("Solving puzzle", solution);

    escapp.submitPuzzle(GLOBAL_CONFIG.escapp.puzzleId, solution, {}, (success) => {
      if (success) {
        //mensaje de ganar o siguiente escena
      }
    });
  }

  function onOpenScreen(newscreen_name) {
    console.log("Opening screen", newscreen_name);
    setPrevScreen(screen);
    setScreen(newscreen_name);
  }

  function loadConfig({ config, box, customBox, chessBoard, customChessboard }) {
    let newChessboard;
    let newBox;

    let configuration = {
      ...config,
      theme: {
        name: config.theme,
        ...(THEME_ASSETS[config.theme] || {}),
      },
    };

    switch (box) {
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
        newBox = customBox.map((piece, index) => ({
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

    switch (chessBoard) {
      case CONFIG.EMPTY:
        newChessboard = emptyChessboard();
        break;
      case CONFIG.DEFAULTCHESSBOARD:
        newChessboard = defaultChessboard();
        break;

      case CONFIG.CUSTOMCHESSBOARD:
        newChessboard = emptyChessboard();
        customChessboard.forEach((piece, index) => {
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

    setConfig(configuration);
    setBoxPieces(newBox);
    dispatch(saveChessboard(newChessboard));
  }

  function positionToCoordinates(position) {
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

  useEffect(() => {
    const movedPieces = chessboard
      .flat()
      .filter(
        (piece) =>
          piece !== null &&
          piece.class === "" &&
          (piece.position.x !== piece.initialPosition.x || piece.position.y !== piece.initialPosition.y),
      );

    const movedBoxPieces = boxPieces.filter(
      (piece) =>
        piece !== null &&
        piece.class === "" &&
        (piece.position.x !== piece.initialPosition.x || piece.position.y !== piece.initialPosition.y),
    );

    const updatedSolution = [...movedPieces, ...movedBoxPieces];

    if (JSON.stringify(updatedSolution) !== JSON.stringify(solution)) {
      setSolution(updatedSolution);
    }
  }, [chessboard, boxPieces]);
  useEffect(() => {
    if (config && solution.length === config.solutionLength) {
      solvePuzzle(parseSolution(solution));
    }
  }, [solution]);

  function parseSolution(solution) {
    return solution
      .map(
        (piece) =>
          `${piece.name},${coordinatesToPosition(
            piece.initialPosition.x,
            piece.initialPosition.y,
          )},${coordinatesToPosition(piece.position.x, piece.position.y)},${piece.blanca}`,
      )
      .join(";");
  }

  const resetPieces = () => {
    loadConfig(initialConfig);
  };
  const changeTheme = (theme) => {
    initialConfig.config.theme = theme;
    loadConfig(initialConfig);
  };

  return (
    <div id="firstnode">
      <div className={`main-background ${fail ? "fail" : ""}`}>
        {config && (
          <MainScreen
            show={screen === KEYPAD_SCREEN}
            boxPieces={boxPieces}
            setBoxPieces={setBoxPieces}
            resetPieces={resetPieces}
            theme={config.theme}
            changeTheme={changeTheme}
          />
        )}
      </div>
    </div>
  );
}
