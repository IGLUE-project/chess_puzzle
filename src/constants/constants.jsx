export const DEFAULT_APP_SETTINGS = {
  skin: "STANDARD",
  actionWhenLoadingIfSolved: true,
  initialSetup: "CLASSIC",

  backgroundImg: "",
  chessboardImg: "images/basic_chessboard.png",
  boxImg: "images/basic_box.svg",
  dragAudio: "sounds/move-check.mp3",
  dropAudio: "sounds/move-self.mp3",
  resetAudio: "sounds/reset.mp3",
  discardAudio: "sounds/box.wav",
};

export const THEMES = {
  STANDARD: "STANDARD",
  FUTURISTIC: "FUTURISTIC",
  RETRO: "RETRO",
};

export const THEME_ASSETS = {
  [THEMES.RETRO]: {
    backgroundImg: "images/background_retro.png",
    chessboardImg: "images/board_retro.png",
    boxImg: "images/box_retro.png",
    dragAudio: "sounds/move-check.mp3",
    dropAudio: "sounds/move-self.mp3",
    resetAudio: "sounds/reset.mp3",
    discardAudio: "sounds/box.wav",
  },
  [THEMES.STANDARD]: {
    backgroundImg: "images/background_standard.png",
    chessboardImg: "images/board_standard.png",
    boxImg: "images/box_standard.svg",
    dragAudio: "sounds/move-check.mp3",
    dropAudio: "sounds/move-self.mp3",
    resetAudio: "sounds/reset.mp3",
    discardAudio: "sounds/box.wav",
  },
  [THEMES.FUTURISTIC]: {
    backgroundImg: "images/background_futuristic.png",
    chessboardImg: "images/board_futuristic.png",
    boxImg: "images/box_futuristic.svg",
    dragAudio: "sounds/move-check.mp3",
    dropAudio: "sounds/move-self.mp3",
    resetAudio: "sounds/reset.mp3",
    discardAudio: "sounds/box.wav",
  },
};

export function createEmptyBoard() {
  return Array(8)
    .fill()
    .map(() => Array(8).fill(null));
}
export const BOARD_EMPTY = createEmptyBoard();

function createClassicBoard() {
  let chessboard = createEmptyBoard();
  
  //White pieces
  chessboard[7] = [
    { id: 1, name: "Rook", white: true, class: "", position: { x: 7, y: 0 }, initialPosition: { x: 7, y: 0 } },
    { id: 2, name: "Knight", white: true, class: "", position: { x: 7, y: 1 }, initialPosition: { x: 7, y: 1 } },
    { id: 3, name: "Bishop", white: true, class: "", position: { x: 7, y: 2 }, initialPosition: { x: 7, y: 2 } },
    { id: 4, name: "Queen", white: true, class: "", position: { x: 7, y: 3 }, initialPosition: { x: 7, y: 3 } },
    { id: 5, name: "King", white: true, class: "", position: { x: 7, y: 4 }, initialPosition: { x: 7, y: 4 } },
    { id: 6, name: "Bishop", white: true, class: "", position: { x: 7, y: 5 }, initialPosition: { x: 7, y: 5 } },
    { id: 7, name: "Knight", white: true, class: "", position: { x: 7, y: 6 }, initialPosition: { x: 7, y: 6 } },
    { id: 8, name: "Rook", white: true, class: "", position: { x: 7, y: 7 }, initialPosition: { x: 7, y: 7 } },
  ];
  chessboard[6] = Array(8)
  .fill()
  .map((_, i) => ({
    id: i + 9,
    name: "Pawn",
    white: true,
    class: "",
    position: { x: 6, y: i },
    initialPosition: { x: 6, y: i },
  }));

  //Black pieces
  chessboard[0] = [
    { id: 17, name: "Rook", white: false, class: "", position: { x: 0, y: 0 }, initialPosition: { x: 0, y: 0 } },
    { id: 18, name: "Knight", white: false, class: "", position: { x: 0, y: 1 }, initialPosition: { x: 0, y: 1 } },
    { id: 19, name: "Bishop", white: false, class: "", position: { x: 0, y: 2 }, initialPosition: { x: 0, y: 2 } },
    { id: 20, name: "Queen", white: false, class: "", position: { x: 0, y: 3 }, initialPosition: { x: 0, y: 3 } },
    { id: 21, name: "King", white: false, class: "", position: { x: 0, y: 4 }, initialPosition: { x: 0, y: 4 } },
    { id: 22, name: "Bishop", white: false, class: "", position: { x: 0, y: 5 }, initialPosition: { x: 0, y: 5 } },
    { id: 23, name: "Knight", white: false, class: "", position: { x: 0, y: 6 }, initialPosition: { x: 0, y: 6 } },
    { id: 24, name: "Rook", white: false, class: "", position: { x: 0, y: 7 }, initialPosition: { x: 0, y: 7 } },
  ];
  chessboard[1] = Array(8)
  .fill()
  .map((_, i) => ({
    id: i + 25,
    name: "Pawn",
    white: false,
    class: "",
    position: { x: 1, y: i },
    initialPosition: { x: 1, y: i },
  }));

  return chessboard;
}
export const BOARD_CLASSIC = createClassicBoard();

function createBoardAfterQueenGambit() {
  let chessboard = createClassicBoard();

  chessboard[4][3] = {
    ...chessboard[6][3],
    position: { x: 4, y: 3 },
    initialPosition: { x: 4, y: 3 },
  };
  chessboard[6][3] = null;

  chessboard[3][3] = {
    ...chessboard[1][3],
    position: { x: 3, y: 3 },
    initialPosition: { x: 3, y: 3 },
  };
  chessboard[1][3] = null;

  chessboard[4][2] = {
    ...chessboard[6][2],
    position: { x: 4, y: 2 },
    initialPosition: { x: 4, y: 2 },
  };
  chessboard[6][2] = null;

  return chessboard;
}
export const BOARD_QUEEN_GAMBIT = createBoardAfterQueenGambit();

function createBoardAfterSpanishOpening() {
  let chessboard = createClassicBoard();
  
  chessboard[4][4] = {
    ...chessboard[6][4],
    position: { x: 4, y: 4 },
    initialPosition: { x: 4, y: 4 },
  };
  chessboard[6][4] = null;

  chessboard[3][4] = {
    ...chessboard[1][4],
    position: { x: 3, y: 4 },
    initialPosition: { x: 3, y: 4 },
  };
  chessboard[1][4] = null;

  chessboard[5][5] = {
    ...chessboard[7][6],
    position: { x: 5, y: 5 },
    initialPosition: { x: 5, y: 5 },
  };
  chessboard[7][6] = null;

  chessboard[2][2] = {
    ...chessboard[0][1],
    position: { x: 2, y: 2 },
    initialPosition: { x: 2, y: 2 },
  };
  chessboard[0][1] = null;

  chessboard[3][1] = {
    ...chessboard[7][5],
    position: { x: 3, y: 1 },
    initialPosition: { x: 3, y: 1 },
  };
  chessboard[7][5] = null;

  return chessboard;
}
export const BOARD_SPANISH_OPENING = createBoardAfterSpanishOpening();

function createBoardAfterItalianOpening() {
  let chessboard = createClassicBoard();
  
  chessboard[4][4] = {
    ...chessboard[6][4],
    position: { x: 4, y: 4 },
    initialPosition: { x: 4, y: 4 },
  };
  chessboard[6][4] = null;

  chessboard[3][4] = {
    ...chessboard[1][4],
    position: { x: 3, y: 4 },
    initialPosition: { x: 3, y: 4 },
  };
  chessboard[1][4] = null;

  chessboard[5][5] = {
    ...chessboard[7][6],
    position: { x: 5, y: 5 },
    initialPosition: { x: 5, y: 5 },
  };
  chessboard[7][6] = null;

  chessboard[2][2] = {
    ...chessboard[0][1],
    position: { x: 2, y: 2 },
    initialPosition: { x: 2, y: 2 },
  };
  chessboard[0][1] = null;

  chessboard[4][2] = {
    ...chessboard[7][5],
    position: { x: 4, y: 2 },
    initialPosition: { x: 4, y: 2 },
  };
  chessboard[7][5] = null;

  return chessboard;
}
export const BOARD_ITALIAN_OPENING = createBoardAfterItalianOpening();

export const BOX_POSITION = { x: -1, y: -1 };
export const BOX_EMPTY = [];
export const BOX_ALL_PIECES = BOARD_CLASSIC
  .flat()
  .filter(piece => piece != null)
  .map(piece => ({
    ...piece,
    position: { ...BOX_POSITION },
    initialPosition: { ...BOX_POSITION }
  }));

export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath: "./images/",
};