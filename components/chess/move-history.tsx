"use client";

import type { MovePair } from "@/lib/chess/types";

type MoveHistoryProps = {
  movePairs: MovePair[];
  currentIndex: number;
  onSelectMove: (index: number) => void;
  onGoToStart: () => void;
  onGoToPrevious: () => void;
  onGoToNext: () => void;
  onGoToEnd: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
};

function MoveCell({
  label,
  moveIndex,
  currentIndex,
  onSelect,
}: {
  label: string;
  moveIndex: number;
  currentIndex: number;
  onSelect: (index: number) => void;
}) {
  const isActive = currentIndex === moveIndex;

  return (
    <button
      type="button"
      onClick={() => onSelect(moveIndex)}
      className={`rounded px-2 py-1.5 text-left font-mono text-sm transition-colors ${
        isActive
          ? "bg-emerald-600/30 text-emerald-300 ring-1 ring-emerald-500/50"
          : "text-zinc-300 hover:bg-zinc-800"
      }`}
    >
      {label}
    </button>
  );
}

export function MoveHistory({
  movePairs,
  currentIndex,
  onSelectMove,
  onGoToStart,
  onGoToPrevious,
  onGoToNext,
  onGoToEnd,
  canGoPrevious,
  canGoNext,
}: MoveHistoryProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto rounded-md border border-zinc-700/60 bg-zinc-950/50">
        {movePairs.length === 0 ? (
          <p className="p-4 text-sm text-zinc-500">No moves yet.</p>
        ) : (
          <div className="grid grid-cols-[auto_1fr_1fr] gap-x-1 gap-y-0.5 p-2">
            {movePairs.map((pair) => (
              <div key={pair.moveNumber} className="contents">
                <span className="px-2 py-1.5 text-sm tabular-nums text-zinc-500">
                  {pair.moveNumber}.
                </span>
                {pair.white && pair.whiteIndex !== undefined ? (
                  <MoveCell
                    label={pair.white}
                    moveIndex={pair.whiteIndex}
                    currentIndex={currentIndex}
                    onSelect={onSelectMove}
                  />
                ) : (
                  <span />
                )}
                {pair.black && pair.blackIndex !== undefined ? (
                  <MoveCell
                    label={pair.black}
                    moveIndex={pair.blackIndex}
                    currentIndex={currentIndex}
                    onSelect={onSelectMove}
                  />
                ) : (
                  <span />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-center gap-1">
        <NavButton
          label="First"
          symbol="«"
          onClick={onGoToStart}
          disabled={!canGoPrevious}
        />
        <NavButton
          label="Previous"
          symbol="‹"
          onClick={onGoToPrevious}
          disabled={!canGoPrevious}
        />
        <NavButton
          label="Next"
          symbol="›"
          onClick={onGoToNext}
          disabled={!canGoNext}
        />
        <NavButton
          label="Last"
          symbol="»"
          onClick={onGoToEnd}
          disabled={!canGoNext}
        />
      </div>
    </div>
  );
}

function NavButton({
  label,
  symbol,
  onClick,
  disabled,
}: {
  label: string;
  symbol: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-9 min-w-9 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 text-lg text-zinc-200 transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {symbol}
    </button>
  );
}
