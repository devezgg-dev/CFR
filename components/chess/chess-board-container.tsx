"use client";

import { useMemo } from "react";
import { Chessboard, ChessboardProvider } from "react-chessboard";
import type { Square } from "chess.js";
import { EvaluationBar } from "@/components/chess/evaluation-bar";
import { GAME_STATUS_LABEL } from "@/lib/chess/move-utils";
import type { GameStatus } from "@/lib/chess/types";

type ChessBoardContainerProps = {
  fen: string;
  turn: "w" | "b";
  isAtLatest: boolean;
  gameStatus: GameStatus;
  onMove: (from: Square, to: Square) => boolean;
};

export function ChessBoardContainer({
  fen,
  turn,
  isAtLatest,
  gameStatus,
  onMove,
}: ChessBoardContainerProps) {
  const boardOptions = useMemo(
    () => ({
      position: fen,
      allowDragging: isAtLatest,
      animationDurationInMs: 200,
      boardStyle: {
        borderRadius: "4px",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.45)",
      },
      darkSquareStyle: { backgroundColor: "#779556" },
      lightSquareStyle: { backgroundColor: "#ebecd0" },
      canDragPiece: ({
        piece,
      }: {
        piece: { pieceType: string };
      }) => {
        if (!isAtLatest) return false;
        const pieceColor = piece.pieceType.startsWith("w") ? "w" : "b";
        return pieceColor === turn;
      },
      onPieceDrop: ({
        sourceSquare,
        targetSquare,
      }: {
        sourceSquare: string;
        targetSquare: string | null;
      }) => {
        if (!targetSquare) return false;
        return onMove(sourceSquare as Square, targetSquare as Square);
      },
    }),
    [fen, turn, isAtLatest, onMove],
  );

  return (
    <div className="flex w-full max-w-[560px] flex-col gap-3">
      <div className="flex items-stretch justify-center gap-3">
        <EvaluationBar fen={fen} />

        <div className="aspect-square w-full min-w-0 flex-1">
          <ChessboardProvider options={boardOptions}>
            <Chessboard />
          </ChessboardProvider>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-md border border-zinc-700/60 bg-zinc-900/80 px-4 py-2 text-sm">
        <span className="text-zinc-400">
          {turn === "w" ? "White to move" : "Black to move"}
          {!isAtLatest && (
            <span className="ml-2 text-amber-400/90">(reviewing)</span>
          )}
        </span>
        <span
          className={`font-medium ${
            gameStatus === "check" || gameStatus === "checkmate"
              ? "text-red-400"
              : gameStatus === "draw" || gameStatus === "stalemate"
                ? "text-amber-400"
                : "text-zinc-300"
          }`}
        >
          {GAME_STATUS_LABEL[gameStatus]}
        </span>
      </div>
    </div>
  );
}
