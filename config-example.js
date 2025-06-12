//Copy this file to config.js and specify your own settings

import { CONFIG, THEMES } from "./src/constants/constants";

export let ESCAPP_APP_SETTINGS = {
  //Settings that can be specified by the authors
  skin: THEMES.BASIC, //skin can be "STANDARD", "RETRO" or "FUTURISTIC" or "BASIC".
  // backgroundImg: "NONE", //background can be "NONE" or a URL.
  actionAfterSolve: "LOAD_SOLUTION", //actionAfterSolve can be "NONE" or "LOAD_SOLUTION".
  //message: "Custom message",

  box: CONFIG.CUSTOMBOX,
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

  //Settings that will be automatically specified by the Escapp server
  solutionLength: 4,
  locale: "es",

  escappClientSettings: {
    endpoint: "https://escapp.etsisi.upm.es/api/escapeRooms/153",
    linkedPuzzleIds: [2],
    rtc: false,
  },
};
