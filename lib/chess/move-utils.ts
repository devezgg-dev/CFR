import { Chess, DEFAULT_POSITION } from "chess.js";
import type { GameStatus, MovePair } from "./types";

export function getGameStatus(chess: Chess): GameStatus {
  if (chess.isCheckmate()) return "checkmate";
  if (chess.isStalemate()) return "stalemate";
  if (chess.isDraw()) return "draw";
  if (chess.isCheck()) return "check";
  return "playing";
}

export function buildMovePairs(sans: string[]): MovePair[] {
  const pairs: MovePair[] = [];

  for (let i = 0; i < sans.length; i += 2) {
    pairs.push({
      moveNumber: Math.floor(i / 2) + 1,
      white: sans[i],
      black: sans[i + 1],
      whiteIndex: i + 1,
      blackIndex: sans[i + 1] ? i + 2 : undefined,
    });
  }

  return pairs;
}

export function replayGameFromSans(sans: string[]): {
  fens: string[];
  error?: string;
} {
  const fens = [DEFAULT_POSITION];
  const replay = new Chess();

  for (const san of sans) {
    const move = replay.move(san);
    if (!move) {
      return { fens: [DEFAULT_POSITION], error: `Invalid move: ${san}` };
    }
    fens.push(replay.fen());
  }

  return { fens };
}

export function buildPgnFromSans(sans: string[]): string {
  const game = new Chess();

  for (const san of sans) {
    game.move(san);
  }

  return game.pgn();
}

export function loadPgnIntoTimeline(pgn: string): {
  fens: string[];
  sans: string[];
  error?: string;
} {
  const game = new Chess();

  try {
    game.loadPgn(pgn.trim());
  } catch {
    return { fens: [DEFAULT_POSITION], sans: [], error: "Invalid PGN format." };
  }

  const sans = game.history();
  const { fens, error } = replayGameFromSans(sans);

  if (error) {
    return { fens: [DEFAULT_POSITION], sans: [], error };
  }

  return { fens, sans };
}

export const GAME_STATUS_LABEL: Record<GameStatus, string> = {
  playing: "In progress",
  check: "Check",
  checkmate: "Checkmate",
  stalemate: "Stalemate",
  draw: "Draw",
};
