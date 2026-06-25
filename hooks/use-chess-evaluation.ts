"use client";

import { useEffect, useMemo, useState } from "react";
import {
  calculateMaterialEvaluation,
  formatEvaluationScore,
} from "@/lib/chess/evaluation";
import type { Evaluation } from "@/lib/chess/types";

const ANIMATION_MS = 400;

export function useChessEvaluation(fen: string) {
  const target = useMemo(() => calculateMaterialEvaluation(fen), [fen]);
  const [display, setDisplay] = useState<Evaluation>(target);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setDisplay(target));
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return {
    evaluation: display,
    formattedScore: formatEvaluationScore(display.score),
    transitionDurationMs: ANIMATION_MS,
  };
}
