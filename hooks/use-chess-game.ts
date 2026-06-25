"use client";

import { useCallback, useMemo, useState } from "react";
import { Chess, DEFAULT_POSITION, type Square } from "chess.js";
import {
  buildMovePairs,
  buildPgnFromSans,
  getGameStatus,
  loadPgnIntoTimeline,
  replayGameFromSans,
} from "@/lib/chess/move-utils";
import type { ChessGameActions, ChessGameState } from "@/lib/chess/types";

export function useChessGame(): ChessGameState & ChessGameActions {
  const [fens, setFens] = useState<string[]>([DEFAULT_POSITION]);
  const [sans, setSans] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentFen = fens[currentIndex] ?? DEFAULT_POSITION;
  const isAtLatest = currentIndex === fens.length - 1;

  const chess = useMemo(() => new Chess(currentFen), [currentFen]);

  const gameStatus = useMemo(() => getGameStatus(chess), [chess]);
  const movePairs = useMemo(() => buildMovePairs(sans), [sans]);
  const pgn = useMemo(() => buildPgnFromSans(sans), [sans]);

  const makeMove = useCallback(
    (from: Square, to: Square, promotion = "q"): boolean => {
      if (!isAtLatest) return false;

      const game = new Chess(currentFen);
      let move = game.move({ from, to, promotion });

      if (!move) {
        move = game.move({ from, to });
      }

      if (!move) return false;

      setFens((prev) => [...prev, game.fen()]);
      setSans((prev) => [...prev, move.san]);
      setCurrentIndex((prev) => prev + 1);
      return true;
    },
    [currentFen, isAtLatest],
  );

  const goToIndex = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, fens.length - 1)));
    },
    [fens.length],
  );

  const goToStart = useCallback(() => goToIndex(0), [goToIndex]);
  const goToPrevious = useCallback(
    () => goToIndex(currentIndex - 1),
    [currentIndex, goToIndex],
  );
  const goToNext = useCallback(
    () => goToIndex(currentIndex + 1),
    [currentIndex, goToIndex],
  );
  const goToEnd = useCallback(
    () => goToIndex(fens.length - 1),
    [fens.length, goToIndex],
  );

  const loadPgn = useCallback((pgnText: string) => {
    const result = loadPgnIntoTimeline(pgnText);

    if (result.error) {
      return { ok: false as const, error: result.error };
    }

    setFens(result.fens);
    setSans(result.sans);
    setCurrentIndex(result.fens.length - 1);
    return { ok: true as const };
  }, []);

  const resetGame = useCallback(() => {
    setFens([DEFAULT_POSITION]);
    setSans([]);
    setCurrentIndex(0);
  }, []);

  return {
    currentFen,
    sans,
    currentIndex,
    isAtLatest,
    gameStatus,
    turn: chess.turn(),
    movePairs,
    pgn,
    makeMove,
    goToStart,
    goToPrevious,
    goToNext,
    goToEnd,
    goToIndex,
    loadPgn,
    resetGame,
  };
}
