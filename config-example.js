//Copy this file to config.js and specify your own settings

import { CONFIG, THEMES } from "./src/constants/constants";

export let ESCAPP_APP_SETTINGS = {
  //Settings that can be specified by the authors
  skin: THEMES.STANDARD, //skin can be "STANDARD", "RETRO" or "FUTURISTIC" or "BASIC".
  // backgroundImg: "NONE", //background can be "NONE" or a URL.
  actionWhenLoadingIfSolved: false,
  //message: "Custom message",
  saveState: true,

  box: CONFIG.CUSTOMBOX,
  customBox: [
    { name: "Pawn", blanca: false },
    { name: "Rook", blanca: true },
  ],
  chessBoard: CONFIG.DEFAULTCHESSBOARD,
  customChessboard: [
    { position: "a7", name: "Pawn", blanca: false },
    { position: "b7", name: "Pawn", blanca: false },
    { position: "c7", name: "Pawn", blanca: false },
    { position: "d7", name: "Rook", blanca: true },
  ],

  //Settings that will be automatically specified by the Escapp server
  solutionLength: 4,
  locale: "es",

  escappClientSettings: {
    endpoint: "https://escapp.etsisi.upm.es/api/escapeRooms/153",
    linkedPuzzleIds: [2],
    rtc: false,
  },
};
