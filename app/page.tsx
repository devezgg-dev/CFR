"use client";

import { useCallback } from "react";
import type { Square } from "chess.js";
import { ChessBoardContainer } from "@/components/chess/chess-board-container";
import { ControlPanel } from "@/components/chess/control-panel";
import { useChessGame } from "@/hooks/use-chess-game";

export default function HomePage() {
  const {
    currentFen,
    turn,
    isAtLatest,
    gameStatus,
    movePairs,
    currentIndex,
    pgn,
    sans,
    makeMove,
    goToIndex,
    goToStart,
    goToPrevious,
    goToNext,
    goToEnd,
    loadPgn,
    resetGame,
  } = useChessGame();

  const handleMove = useCallback(
    (from: Square, to: Square) => makeMove(from, to),
    [makeMove],
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 lg:px-8">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Chess Analysis
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Play, review moves, and import PGN
            </p>
          </div>
          <button
            type="button"
            onClick={resetGame}
            className="rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800"
          >
            New game
          </button>
        </header>

        <div className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <section className="flex items-start justify-center">
            <ChessBoardContainer
              fen={currentFen}
              turn={turn}
              isAtLatest={isAtLatest}
              gameStatus={gameStatus}
              onMove={handleMove}
            />
          </section>

          <aside className="min-h-[420px]">
            <ControlPanel
              movePairs={movePairs}
              currentIndex={currentIndex}
              pgn={pgn}
              onSelectMove={goToIndex}
              onGoToStart={goToStart}
              onGoToPrevious={goToPrevious}
              onGoToNext={goToNext}
              onGoToEnd={goToEnd}
              onLoadPgn={loadPgn}
              maxIndex={sans.length}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
