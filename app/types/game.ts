export interface BestWorstQuestion {
  theme: string;
  options: string[];
}

export interface PittariTheme {
  theme: string;
  low: string;
  high: string;
}

export type ShiritoriDifficulty = 'express' | 'limited' | 'shinkansen';

export interface ShiritoriEntry {
  word: string;
  player: number;
  turn: number;
}

export type GameGenre = '推理' | '協力' | '心理戦';

export interface GameInfo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  genre: GameGenre;
  path: string;
}
