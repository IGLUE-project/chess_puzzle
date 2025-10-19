export const DEFAULT_APP_SETTINGS = {
  skin: "STANDARD",
  actionWhenLoadingIfSolved: true,
  initialSetup: "CLASSIC",
  resetOnFail: false,

  backgroundImg: "images/background_standard.png",
  chessboardImg: "images/board_standard.png",
  boxImg: "images/box_standard.png",
  pawn_white_img: "images/Pawn_white_standard.svg",
  pawn_black_img: "images/Pawn_black_standard.svg",
  rook_white_img: "images/Rook_white_standard.svg",
  rook_black_img: "images/Rook_black_standard.svg",
  knight_white_img: "images/Knight_white_standard.svg",
  knight_black_img: "images/Knight_black_standard.svg",
  bishop_white_img: "images/Bishop_white_standard.svg",
  bishop_black_img: "images/Bishop_black_standard.svg",
  queen_white_img: "images/Queen_white_standard.svg",
  queen_black_img: "images/Queen_black_standard.svg",
  king_white_img: "images/King_white_standard.svg",
  king_black_img: "images/King_black_standard.svg",
  dropAudio: "sounds/move_end_standard.mp3",
  discardAudio: "sounds/move_end_tobox_standard.wav",
  captureAudio: "sounds/capture_standard.wav",
  resetAudio: "sounds/reset_standard.mp3",
  winAudio: "sounds/win_standard.wav",
};

export const SKIN_SETTINGS = {
  STANDARD: {},
  REALISTIC: {
    chessboardImg: "images/board_realistic.png",
    boxImg: "images/box_realistic.png",
    pawn_white_img: "images/Pawn_white_realistic.png",
    pawn_black_img: "images/Pawn_black_realistic.png",
    rook_white_img: "images/Rook_white_realistic.png",
    rook_black_img: "images/Rook_black_realistic.png",
    knight_white_img: "images/Knight_white_realistic.png",
    knight_black_img: "images/Knight_black_realistic.png",
    bishop_white_img: "images/Bishop_white_realistic.png",
    bishop_black_img: "images/Bishop_black_realistic.png",
    queen_white_img: "images/Queen_white_realistic.png",
    queen_black_img: "images/Queen_black_realistic.png",
    king_white_img: "images/King_white_realistic.png",
    king_black_img: "images/King_black_realistic.png",
  },
  FUTURISTIC: {
    backgroundImg: "images/background_futuristic.png",
    chessboardImg: "images/board_futuristic.png",
    boxImg: "images/box_futuristic.png",
    pawn_white_img: "images/Pawn_white_futuristic.png",
    pawn_black_img: "images/Pawn_black_futuristic.png",
    rook_white_img: "images/Rook_white_futuristic.png",
    rook_black_img: "images/Rook_black_futuristic.png",
    knight_white_img: "images/Knight_white_futuristic.png",
    knight_black_img: "images/Knight_black_futuristic.png",
    bishop_white_img: "images/Bishop_white_futuristic.png",
    bishop_black_img: "images/Bishop_black_futuristic.png",
    queen_white_img: "images/Queen_white_futuristic.png",
    queen_black_img: "images/Queen_black_futuristic.png",
    king_white_img: "images/King_white_futuristic.png",
    king_black_img: "images/King_black_futuristic.png",
    dropAudio: "sounds/move_end_futuristic.wav",
    discardAudio: "sounds/move_end_tobox_futuristic.wav",
    resetAudio: "sounds/reset_futuristic.wav",
  },
};

export function createEmptyBoard() {
  return Array(8)
    .fill()
    .map(() => Array(8).fill(null));
};

export function createClassicBoard() {
  let chessboard = createEmptyBoard();

  //White pieces
  chessboard[0] = [
    { id: 1, name: "Rook", white: true, class: "", position: { x: 0, y: 0 }, initialPosition: { x: 0, y: 0 } },
    { id: 2, name: "Knight", white: true, class: "", position: { x: 0, y: 1 }, initialPosition: { x: 0, y: 1 } },
    { id: 3, name: "Bishop", white: true, class: "", position: { x: 0, y: 2 }, initialPosition: { x: 0, y: 2 } },
    { id: 4, name: "Queen", white: true, class: "", position: { x: 0, y: 3 }, initialPosition: { x: 0, y: 3 } },
    { id: 5, name: "King", white: true, class: "", position: { x: 0, y: 4 }, initialPosition: { x: 0, y: 4 } },
    { id: 6, name: "Bishop", white: true, class: "", position: { x: 0, y: 5 }, initialPosition: { x: 0, y: 5 } },
    { id: 7, name: "Knight", white: true, class: "", position: { x: 0, y: 6 }, initialPosition: { x: 0, y: 6 } },
    { id: 8, name: "Rook", white: true, class: "", position: { x: 0, y: 7 }, initialPosition: { x: 0, y: 7 } },
  ];
  chessboard[1] = Array(8)
    .fill()
    .map((_, i) => ({
      id: i + 9 + 0,
      name: "Pawn",
      white: true,
      class: "",
      position: { x: 1, y: i },
      initialPosition: { x: 1, y: i },
    }));

  //Black pieces
  chessboard[7] = [
    { id: 17, name: "Rook", white: false, class: "", position: { x: 7, y: 0 }, initialPosition: { x: 7, y: 0 } },
    { id: 18, name: "Knight", white: false, class: "", position: { x: 7, y: 1 }, initialPosition: { x: 7, y: 1 } },
    { id: 19, name: "Bishop", white: false, class: "", position: { x: 7, y: 2 }, initialPosition: { x: 7, y: 2 } },
    { id: 20, name: "Queen", white: false, class: "", position: { x: 7, y: 3 }, initialPosition: { x: 7, y: 3 } },
    { id: 21, name: "King", white: false, class: "", position: { x: 7, y: 4 }, initialPosition: { x: 7, y: 4 } },
    { id: 22, name: "Bishop", white: false, class: "", position: { x: 7, y: 5 }, initialPosition: { x: 7, y: 5 } },
    { id: 23, name: "Knight", white: false, class: "", position: { x: 7, y: 6 }, initialPosition: { x: 7, y: 6 } },
    { id: 24, name: "Rook", white: false, class: "", position: { x: 7, y: 7 }, initialPosition: { x: 7, y: 7 } },
  ];
  chessboard[6] = Array(8)
    .fill()
    .map((_, i) => ({
      id: i + 25,
      name: "Pawn",
      white: false,
      class: "",
      position: { x: 6, y: i },
      initialPosition: { x: 6, y: i },
    }));

  return chessboard;
};

export function createBoardAfterQueenGambit() {
  let chessboard = createClassicBoard();

  chessboard[3][3] = {
    ...chessboard[1][3],
    position: { x: 3, y: 3 },
    initialPosition: { x: 3, y: 3 },
  };
  chessboard[1][3] = null;

  chessboard[4][3] = {
    ...chessboard[6][3],
    position: { x: 4, y: 3 },
    initialPosition: { x: 4, y: 3 },
  };
  chessboard[6][3] = null;

  chessboard[3][2] = {
    ...chessboard[1][2],
    position: { x: 3, y: 2 },
    initialPosition: { x: 3, y: 2 },
  };
  chessboard[1][2] = null;

  return chessboard;
};

export function createBoardAfterSpanishOpening() {
  let chessboard = createClassicBoard();

  chessboard[3][4] = {
    ...chessboard[1][4],
    position: { x: 3, y: 4 },
    initialPosition: { x: 3, y: 4 },
  };
  chessboard[1][4] = null;

  chessboard[4][4] = {
    ...chessboard[6][4],
    position: { x: 4, y: 4 },
    initialPosition: { x: 4, y: 4 },
  };
  chessboard[6][4] = null;

  chessboard[2][5] = {
    ...chessboard[0][6],
    position: { x: 2, y: 5 },
    initialPosition: { x: 2, y: 5 },
  };
  chessboard[0][6] = null;

  chessboard[5][2] = {
    ...chessboard[7][1],
    position: { x: 5, y: 2 },
    initialPosition: { x: 5, y: 2 },
  };
  chessboard[7][1] = null;

  chessboard[4][1] = {
    ...chessboard[0][5],
    position: { x: 4, y: 1 },
    initialPosition: { x: 4, y: 1 },
  };
  chessboard[0][5] = null;

  return chessboard;
};

export function createBoardAfterItalianOpening() {
  let chessboard = createClassicBoard();

  chessboard[3][4] = {
    ...chessboard[1][4],
    position: { x: 3, y: 4 },
    initialPosition: { x: 3, y: 4 },
  };
  chessboard[1][4] = null;

  chessboard[4][4] = {
    ...chessboard[6][4],
    position: { x: 4, y: 4 },
    initialPosition: { x: 4, y: 4 },
  };
  chessboard[6][4] = null;

  chessboard[2][5] = {
    ...chessboard[0][6],
    position: { x: 2, y: 5 },
    initialPosition: { x: 2, y: 5 },
  };
  chessboard[0][6] = null;

  chessboard[5][2] = {
    ...chessboard[7][1],
    position: { x: 5, y: 2 },
    initialPosition: { x: 5, y: 2 },
  };
  chessboard[7][1] = null;

  chessboard[3][2] = {
    ...chessboard[0][5],
    position: { x: 3, y: 2 },
    initialPosition: { x: 3, y: 2 },
  };
  chessboard[0][5] = null;

  return chessboard;
};

export const BOX_POSITION = { x: -1, y: -1 };
export const BOX_EMPTY = [];

export function createBoxWithAllPieces() {
  return createClassicBoard()
    .flat()
    .filter((piece) => piece != null)
    .map((piece) => ({
      ...piece,
      position: { ...BOX_POSITION },
      initialPosition: { ...BOX_POSITION },
    }));
};

export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath: "./images/",
};