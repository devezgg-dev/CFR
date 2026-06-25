"use client";

import { useState } from "react";
import { MoveHistory } from "@/components/chess/move-history";
import { PgnInterface } from "@/components/chess/pgn-interface";
import type { ControlTab, MovePair } from "@/lib/chess/types";

type ControlPanelProps = {
  activeTab?: ControlTab;
  movePairs: MovePair[];
  currentIndex: number;
  pgn: string;
  onSelectMove: (index: number) => void;
  onGoToStart: () => void;
  onGoToPrevious: () => void;
  onGoToNext: () => void;
  onGoToEnd: () => void;
  onLoadPgn: (pgn: string) => { ok: true } | { ok: false; error: string };
  maxIndex: number;
};

const TABS: { id: ControlTab; label: string }[] = [
  { id: "moves", label: "Moves" },
  { id: "pgn", label: "PGN" },
];

export function ControlPanel({
  activeTab: initialTab = "moves",
  movePairs,
  currentIndex,
  pgn,
  onSelectMove,
  onGoToStart,
  onGoToPrevious,
  onGoToNext,
  onGoToEnd,
  onLoadPgn,
  maxIndex,
}: ControlPanelProps) {
  const [activeTab, setActiveTab] = useState<ControlTab>(initialTab);

  return (
    <div className="flex h-full min-h-[420px] flex-col rounded-lg border border-zinc-700/70 bg-zinc-900/90 shadow-xl">
      <div className="flex border-b border-zinc-700/70">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-emerald-500 text-emerald-400"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4">
        {activeTab === "moves" ? (
          <MoveHistory
            movePairs={movePairs}
            currentIndex={currentIndex}
            onSelectMove={onSelectMove}
            onGoToStart={onGoToStart}
            onGoToPrevious={onGoToPrevious}
            onGoToNext={onGoToNext}
            onGoToEnd={onGoToEnd}
            canGoPrevious={currentIndex > 0}
            canGoNext={currentIndex < maxIndex}
          />
        ) : (
          <PgnInterface pgn={pgn} onLoadPgn={onLoadPgn} />
        )}
      </div>
    </div>
  );
}
