import type { Square } from "chess.js";

export type GameStatus =
  | "playing"
  | "check"
  | "checkmate"
  | "stalemate"
  | "draw";

export type MovePair = {
  moveNumber: number;
  white?: string;
  black?: string;
  whiteIndex?: number;
  blackIndex?: number;
};

export type Evaluation = {
  /** White minus black, in pawns (e.g. +1.5) */
  score: number;
  whiteMaterial: number;
  blackMaterial: number;
  /** 0–100, white share of total material on board */
  whitePercent: number;
};

export type ChessGameState = {
  currentFen: string;
  sans: string[];
  currentIndex: number;
  isAtLatest: boolean;
  gameStatus: GameStatus;
  turn: "w" | "b";
  movePairs: MovePair[];
  pgn: string;
};

export type ChessGameActions = {
  makeMove: (from: Square, to: Square, promotion?: string) => boolean;
  goToStart: () => void;
  goToPrevious: () => void;
  goToNext: () => void;
  goToEnd: () => void;
  goToIndex: (index: number) => void;
  loadPgn: (pgn: string) => { ok: true } | { ok: false; error: string };
  resetGame: () => void;
};

export type ControlTab = "moves" | "pgn";
