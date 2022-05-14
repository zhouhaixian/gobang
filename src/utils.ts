import { CellStatus, GameOption, PiecesHistory, PieceStatus } from "./types";
import { computed, ref } from "vue";

export function createGame(option: GameOption) {
  const { minRow, minColumn, maxRow, maxColumn } = option;
  const pieces = ref(createPieces(minRow, minColumn, maxRow, maxColumn));
  const nextPlayer = ref<PieceStatus>("circle");
  const history = ref<PiecesHistory[]>([]);
  const canNotBack = computed(() => history.value.length === 0);

  function createPieces(
    minRow: number,
    minColumn: number,
    maxRow: number,
    maxColumn: number
  ): CellStatus[][] {
    const { matches } = window.matchMedia("(max-width: 580px)");

    if (matches) {
      const pieces = Array(minRow);
      for (let i = 0; i < pieces.length; i++) {
        pieces[i] = Array(minColumn).fill(null);
      }
      return pieces;
    } else {
      const pieces = Array(maxRow);
      for (let i = 0; i < pieces.length; i++) {
        pieces[i] = Array(maxColumn).fill(null);
      }
      return pieces;
    }
  }

  function drop(row: number, column: number) {
    if (pieces.value[row][column] === null) {
      history.value.push({
        row,
        column,
        action: pieces.value[row][column],
      });
      next(row, column, nextPlayer.value);
    }
  }

  function reset() {
    pieces.value = createPieces(minRow, minColumn, maxRow, maxColumn);
    history.value = []
    nextPlayer.value = "circle";
  }

  function back() {
    const step = history.value.pop();
    const { row, column, action } = step!;
    next(row, column, action);
  }

  function next(row: number, column: number, action: CellStatus) {
    pieces.value[row][column] = action;
    if (nextPlayer.value === "cross") {
      nextPlayer.value = "circle";
    } else {
      nextPlayer.value = "cross";
    }
  }

  return { pieces, nextPlayer, drop, reset, back, canNotBack };
}
