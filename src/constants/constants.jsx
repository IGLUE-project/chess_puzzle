export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath: "./images/",
};

export const ALLOWED_ACTIONS = ["NONE", "LOAD_SOLUTION"];

export function emptyChessboard() {
  return Array(8)
    .fill()
    .map(() => Array(8).fill(null));
}
export function defaultChessboard() {
  let chessboard = emptyChessboard();

  chessboard[0] = [
    { id: 108, name: "torre", blanca: false, class: "", position: { x: 0, y: 0 }, initialPosition: { x: 0, y: 0 } },
    { id: 109, name: "caballo", blanca: false, class: "", position: { x: 0, y: 1 }, initialPosition: { x: 0, y: 1 } },
    { id: 110, name: "alfil", blanca: false, class: "", position: { x: 0, y: 2 }, initialPosition: { x: 0, y: 2 } },
    { id: 111, name: "reina", blanca: false, class: "", position: { x: 0, y: 3 }, initialPosition: { x: 0, y: 3 } },
    { id: 112, name: "rey", blanca: false, class: "", position: { x: 0, y: 4 }, initialPosition: { x: 0, y: 4 } },
    { id: 113, name: "alfil", blanca: false, class: "", position: { x: 0, y: 5 }, initialPosition: { x: 0, y: 5 } },
    { id: 114, name: "caballo", blanca: false, class: "", position: { x: 0, y: 6 }, initialPosition: { x: 0, y: 6 } },
    { id: 115, name: "torre", blanca: false, class: "", position: { x: 0, y: 7 }, initialPosition: { x: 0, y: 7 } },
  ];
  chessboard[1] = Array(8)
    .fill()
    .map((_, i) => ({
      id: i + 100,
      name: "peon",
      blanca: false,
      class: "",
      position: { x: 1, y: i },
      initialPosition: { x: 1, y: i },
    }));
  chessboard[6] = Array(8)
    .fill()
    .map((_, i) => ({
      id: i + 16 + 100,
      name: "peon",
      blanca: true,
      class: "",
      position: { x: 6, y: i },
      initialPosition: { x: 6, y: i },
    }));

  chessboard[7] = [
    { id: 124, name: "torre", blanca: true, class: "", position: { x: 7, y: 0 }, initialPosition: { x: 7, y: 0 } },
    { id: 125, name: "caballo", blanca: true, class: "", position: { x: 7, y: 1 }, initialPosition: { x: 7, y: 1 } },
    { id: 126, name: "alfil", blanca: true, class: "", position: { x: 7, y: 2 }, initialPosition: { x: 7, y: 2 } },
    { id: 127, name: "reina", blanca: true, class: "", position: { x: 7, y: 3 }, initialPosition: { x: 7, y: 3 } },
    { id: 128, name: "rey", blanca: true, class: "", position: { x: 7, y: 4 }, initialPosition: { x: 7, y: 4 } },
    { id: 129, name: "alfil", blanca: true, class: "", position: { x: 7, y: 5 }, initialPosition: { x: 7, y: 5 } },
    { id: 130, name: "caballo", blanca: true, class: "", position: { x: 7, y: 6 }, initialPosition: { x: 7, y: 6 } },
    { id: 131, name: "torre", blanca: true, class: "", position: { x: 7, y: 7 }, initialPosition: { x: 7, y: 7 } },
  ];
  return chessboard;
}
export const BOXPOSITION = { x: -1, y: -1 };
export const ALLPIECES = [
  { id: 200, name: "peon", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 201, name: "peon", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 202, name: "peon", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 203, name: "peon", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 204, name: "peon", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 205, name: "peon", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 206, name: "peon", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 207, name: "peon", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 208, name: "torre", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 209, name: "torre", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 210, name: "alfil", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 211, name: "alfil", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 212, name: "caballo", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 213, name: "caballo", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 214, name: "rey", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 215, name: "reina", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 216, name: "peon", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 217, name: "peon", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 218, name: "peon", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 219, name: "peon", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 220, name: "peon", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 221, name: "peon", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 222, name: "peon", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 223, name: "peon", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 224, name: "torre", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 225, name: "torre", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 226, name: "alfil", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 227, name: "alfil", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 228, name: "caballo", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 229, name: "caballo", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 230, name: "rey", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 231, name: "reina", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
];
export const ONEPIECEEACH = [
  { id: 300, name: "peon", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 301, name: "torre", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 302, name: "alfil", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 303, name: "caballo", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 304, name: "rey", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 305, name: "reina", blanca: false, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 306, name: "peon", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 307, name: "torre", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 308, name: "alfil", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 309, name: "caballo", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 310, name: "rey", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
  { id: 311, name: "reina", blanca: true, class: "", position: BOXPOSITION, initialPosition: BOXPOSITION },
];
export const CONFIG = {
  ALLPIECES: "all",
  ONEPIECEEACH: "each",
  EMPTYBOARD: "empty",
  CUSTOMBOX: "custom box",
  CUSTOMCHESSBOARD: "custom chessboard",
  DEFAULTCHESSBOARD: "default chessboard",
};
export const PIECEMAP = {
  PEON: "peon",
  TORRE: "torre",
  ALFIL: "alfil",
  CABALLO: "caballo",
  REINA: "reina",
  REY: "rey",
};

export const THEMES = {
  BASIC: "BASIC",
  FUTURISTIC: "FUTURISTIC",
  STANDARD: "STANDARD",
  RETRO: "RETRO",
};

export const DEFAULT_APP_SETTINGS = {
  skin: "STANDARD",
  actionAfterSolve: "NONE",
  message: undefined,
  solutionLength: 4,
  saveState: true,

  box: CONFIG.ONEPIECEEACH,
  customBox: [],
  chessBoard: CONFIG.DEFAULTCHESSBOARD,
  customChessboard: [],

  backgroundImg: "",
  chessboardImg: "images/basic_chessboard.png",
  boxImg: "images/basic_box.svg",
  dragAudio: "sounds/move-check.mp3",
  dropAudio: "sounds/move-self.mp3",
  resetAudio: "sounds/reset.mp3",
  discardAudio: "sounds/box.wav",
};

export const THEME_ASSETS = {
  [THEMES.RETRO]: {
    backgroundImg: "images/ancient_table.png",
    chessboardImg: "images/ancient_chessboard.png",
    boxImg: "images/ancient_box.png",
    dragAudio: "sounds/move-check.mp3",
    dropAudio: "sounds/move-self.mp3",
    resetAudio: "sounds/reset.mp3",
    discardAudio: "sounds/box.wav",
  },
  [THEMES.BASIC]: {
    backgroundImg: "images/wooden_table.png",
    chessboardImg: "images/basic_chessboard.png",
    boxImg: "images/basic_box.svg",
    dragAudio: "sounds/move-check.mp3",
    dropAudio: "sounds/move-self.mp3",
    resetAudio: "sounds/reset.mp3",
    discardAudio: "sounds/box.wav",
  },
  [THEMES.STANDARD]: {
    backgroundImg: "images/wooden_table.png",
    chessboardImg: "images/basic_chessboard.png",
    boxImg: "images/basic_box.svg",
    dragAudio: "sounds/move-check.mp3",
    dropAudio: "sounds/move-self.mp3",
    resetAudio: "sounds/reset.mp3",
    discardAudio: "sounds/box.wav",
  },
  [THEMES.FUTURISTIC]: {
    backgroundImg: "images/background_futuristic_alt.png",
    chessboardImg: "images/futuristic_chessboard.png",
    boxImg: "images/futuristic_box.svg",
    dragAudio: "sounds/move-check.mp3",
    dropAudio: "sounds/move-self.mp3",
    resetAudio: "sounds/reset.mp3",
    discardAudio: "sounds/box.wav",
  },
};
