export const PAINTING_SCREEN = "painting";
export const SAFE_CLOSED_SCREEN = "safe_closed";
export const SAFE_OPEN_SCREEN = "safe_open";
export const CONTROL_PANEL_SCREEN = "control_panel";
export const KEYPAD_SCREEN = "keypad";

export function emptyChessboard() {
  return Array(8)
    .fill()
    .map(() => Array(8).fill(null));
}
export const EMPTY_CHESSBOARD = emptyChessboard();

export const BOXPOSITION = { x: -1, y: -1 };
export const ALLPIECES = [
  { id: 0, name: "peon", blanca: false, class: "", position: BOXPOSITION },
  { id: 1, name: "peon", blanca: false, class: "", position: BOXPOSITION },
  { id: 2, name: "peon", blanca: false, class: "", position: BOXPOSITION },
  { id: 3, name: "peon", blanca: false, class: "", position: BOXPOSITION },
  { id: 4, name: "peon", blanca: false, class: "", position: BOXPOSITION },
  { id: 5, name: "peon", blanca: false, class: "", position: BOXPOSITION },
  { id: 6, name: "peon", blanca: false, class: "", position: BOXPOSITION },
  { id: 7, name: "peon", blanca: false, class: "", position: BOXPOSITION },
  { id: 8, name: "torre", blanca: false, class: "", position: BOXPOSITION },
  { id: 9, name: "torre", blanca: false, class: "", position: BOXPOSITION },
  { id: 10, name: "alfil", blanca: false, class: "", position: BOXPOSITION },
  { id: 11, name: "alfil", blanca: false, class: "", position: BOXPOSITION },
  { id: 12, name: "caballo", blanca: false, class: "", position: BOXPOSITION },
  { id: 13, name: "caballo", blanca: false, class: "", position: BOXPOSITION },
  { id: 14, name: "rey", blanca: false, class: "", position: BOXPOSITION },
  { id: 15, name: "reina", blanca: false, class: "", position: BOXPOSITION },
  { id: 16, name: "peon", blanca: true, class: "", position: BOXPOSITION },
  { id: 17, name: "peon", blanca: true, class: "", position: BOXPOSITION },
  { id: 18, name: "peon", blanca: true, class: "", position: BOXPOSITION },
  { id: 19, name: "peon", blanca: true, class: "", position: BOXPOSITION },
  { id: 20, name: "peon", blanca: true, class: "", position: BOXPOSITION },
  { id: 21, name: "peon", blanca: true, class: "", position: BOXPOSITION },
  { id: 22, name: "peon", blanca: true, class: "", position: BOXPOSITION },
  { id: 23, name: "peon", blanca: true, class: "", position: BOXPOSITION },
  { id: 24, name: "torre", blanca: true, class: "", position: BOXPOSITION },
  { id: 25, name: "torre", blanca: true, class: "", position: BOXPOSITION },
  { id: 26, name: "alfil", blanca: true, class: "", position: BOXPOSITION },
  { id: 27, name: "alfil", blanca: true, class: "", position: BOXPOSITION },
  { id: 28, name: "caballo", blanca: true, class: "", position: BOXPOSITION },
  { id: 29, name: "caballo", blanca: true, class: "", position: BOXPOSITION },
  { id: 30, name: "rey", blanca: true, class: "", position: BOXPOSITION },
  { id: 31, name: "reina", blanca: true, class: "", position: BOXPOSITION },
];
export const ONEPIECEEACH = [
  { id: 0, name: "peon", blanca: false, class: "", position: BOXPOSITION },
  { id: 1, name: "torre", blanca: false, class: "", position: BOXPOSITION },
  { id: 2, name: "alfil", blanca: false, class: "", position: BOXPOSITION },
  { id: 3, name: "caballo", blanca: false, class: "", position: BOXPOSITION },
  { id: 4, name: "rey", blanca: false, class: "", position: BOXPOSITION },
  { id: 5, name: "reina", blanca: false, class: "", position: BOXPOSITION },
  { id: 6, name: "peon", blanca: true, class: "", position: BOXPOSITION },
  { id: 7, name: "torre", blanca: true, class: "", position: BOXPOSITION },
  { id: 8, name: "alfil", blanca: true, class: "", position: BOXPOSITION },
  { id: 9, name: "caballo", blanca: true, class: "", position: BOXPOSITION },
  { id: 10, name: "rey", blanca: true, class: "", position: BOXPOSITION },
  { id: 11, name: "reina", blanca: true, class: "", position: BOXPOSITION },
];

export const CONFIG = {
  ALLPIECES: "all",
  ONEPIECEEACH: "each",
  EMPTYBOARD: "empty",
  CUSTOMBOX: "custom box",
  CUSTOMCHESSBOARD: "custom chessboard",
};

export const PIECEMAP = {
  PEON: "peon",
  TORRE: "torre",
  ALFIL: "alfil",
  CABALLO: "caballo",
  REINA: "reina",
  REY: "rey",
};
