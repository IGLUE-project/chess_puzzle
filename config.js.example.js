//Copy this file to config.js and specify your own settings

export let ESCAPP_APP_SETTINGS = {
  //Settings that can be specified by the authors
  skin: "STANDARD", //skin can be "STANDARD", "REALISTIC" or "FUTURISTIC".
  // backgroundImg: "NONE", //background can be "NONE" or a URL.
  initialSetup: "CLASSIC", //determines the initial position of the pieces on the board and in the box.
  //The value of initialSetup can be one of the following: "CLASSIC", "EMPTY_BOARD", "QUEEN_GAMBIT", "SPANISH_OPENING", "ITALIAN_OPENING", or "CUSTOM".
  resetOnFail: false, //if true, the pieces will be reset to their initial positions when the player fails.

  //If initialSetup is "CUSTOM". The settings "customBox" and "customBoard" should be defined.
  // customBox: [
  //   { name: "Pawn", white: false },
  //   { name: "Rook", white: true },
  // ],
  // customBoard: [
  //   { position: "a7", name: "Pawn", white: false },
  //   { position: "b7", name: "Pawn", white: false },
  //   { position: "c7", name: "Pawn", white: false },
  //   { position: "d7", name: "Rook", white: true },
  // ],

  //Settings that will be automatically specified by the Escapp server
  solutionLength: 4, //number of movements from initial position
  locale: "es",

  escappClientSettings: {
    endpoint: "https://escapp.es/api/escapeRooms/id",
    linkedPuzzleIds: [4],
    rtc: false,
  },
};
