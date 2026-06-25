"use client";

import { useChessEvaluation } from "@/hooks/use-chess-evaluation";

type EvaluationBarProps = {
  fen: string;
};

export function EvaluationBar({ fen }: EvaluationBarProps) {
  const { evaluation, formattedScore, transitionDurationMs } =
    useChessEvaluation(fen);

  const isWhiteLeading = evaluation.score >= 0;
  const blackPercent = 100 - evaluation.whitePercent;

  return (
    <div className="flex h-full min-h-[320px] w-7 shrink-0 flex-col overflow-hidden rounded-sm border border-zinc-700/80 bg-zinc-900 sm:min-h-[480px] sm:w-8">
      <div className="relative flex flex-1 flex-col">
        <div
          className="bg-zinc-100 transition-[flex-grow] ease-out"
          style={{
            flexGrow: evaluation.whitePercent,
            transitionDuration: `${transitionDurationMs}ms`,
          }}
        />
        <div
          className="bg-zinc-900 transition-[flex-grow] ease-out"
          style={{
            flexGrow: blackPercent,
            transitionDuration: `${transitionDurationMs}ms`,
          }}
        />

        <div
          className={`pointer-events-none absolute inset-x-0 flex justify-center px-0.5 ${
            isWhiteLeading ? "top-2" : "bottom-2"
          }`}
        >
          <span
            className={`rounded px-1 py-0.5 text-[10px] font-semibold tabular-nums sm:text-xs ${
              isWhiteLeading
                ? "bg-zinc-100 text-zinc-900"
                : "bg-zinc-800 text-zinc-100"
            }`}
          >
            {formattedScore}
          </span>
        </div>
      </div>
    </div>
  );
}
