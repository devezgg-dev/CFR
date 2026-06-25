import type { Evaluation } from "./types";

const PIECE_VALUES: Record<string, number> = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 0,
};

export function calculateMaterialEvaluation(fen: string): Evaluation {
  const placement = fen.split(" ")[0];
  let whiteMaterial = 0;
  let blackMaterial = 0;

  for (const char of placement) {
    if (char === "/" || /\d/.test(char)) continue;

    const piece = char.toLowerCase();
    const value = PIECE_VALUES[piece] ?? 0;

    if (char === piece) {
      blackMaterial += value;
    } else {
      whiteMaterial += value;
    }
  }

  const total = whiteMaterial + blackMaterial;
  const whitePercent =
    total === 0 ? 50 : (whiteMaterial / total) * 100;

  return {
    score: whiteMaterial - blackMaterial,
    whiteMaterial,
    blackMaterial,
    whitePercent,
  };
}

export function formatEvaluationScore(score: number): string {
  const rounded = Math.round(score * 10) / 10;
  const prefix = rounded > 0 ? "+" : "";
  return `${prefix}${rounded.toFixed(1)}`;
}
