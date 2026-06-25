"use client";

import { useCallback, useEffect, useState } from "react";

type PgnInterfaceProps = {
  pgn: string;
  onLoadPgn: (pgn: string) => { ok: true } | { ok: false; error: string };
};

export function PgnInterface({ pgn, onLoadPgn }: PgnInterfaceProps) {
  const [input, setInput] = useState(pgn);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    setInput(pgn);
  }, [pgn]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(pgn);
      setCopyMessage("Copied!");
      setTimeout(() => setCopyMessage(null), 2000);
    } catch {
      setCopyMessage("Copy failed");
      setTimeout(() => setCopyMessage(null), 2000);
    }
  }, [pgn]);

  const handleLoad = useCallback(() => {
    const result = onLoadPgn(input);
    if (result.ok) {
      setLoadError(null);
    } else {
      setLoadError(result.error);
    }
  }, [input, onLoadPgn]);

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-zinc-400">Current game PGN</p>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md border border-zinc-600 bg-zinc-800 px-3 py-1.5 text-sm text-zinc-200 transition-colors hover:bg-zinc-700"
        >
          {copyMessage ?? "Copy PGN"}
        </button>
      </div>

      <textarea
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
          setLoadError(null);
        }}
        spellCheck={false}
        className="min-h-[220px] flex-1 resize-none rounded-md border border-zinc-700 bg-zinc-950/60 p-3 font-mono text-xs leading-relaxed text-zinc-200 outline-none focus:border-emerald-600/60 focus:ring-1 focus:ring-emerald-600/40"
        placeholder="Paste PGN here..."
      />

      {loadError && (
        <p className="text-sm text-red-400" role="alert">
          {loadError}
        </p>
      )}

      <button
        type="button"
        onClick={handleLoad}
        className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
      >
        Load PGN
      </button>
    </div>
  );
}
