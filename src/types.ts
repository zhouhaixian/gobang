export type PieceStatus = "cross" | "circle";
export type CellStatus = null | PieceStatus;

export interface PiecesHistory {
  row: number;
  column: number;
  action: CellStatus;
}

export interface GameOption {
  minRow: number;
  minColumn: number;
  maxRow: number;
  maxColumn: number;
}