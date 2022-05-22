<template>
  <h3>Next Player:{{ game.nextPlayer.value === "circle" ? "O" : "X" }}</h3>
  <div class="checker-board">
    <div class="row" v-for="(item, index) in game.pieces.value" :key="index">
      <cell @click="game.drop(index, count)" :content="content" v-for="(content, count) in item"
            :key="`${index}${count}${index}`" />
    </div>
  </div>
  <div class="control-area">
    <button class="control" :disabled="game.canNotBack.value" @click="game.back()">Back</button>
    <button class="control primary" @click="game.reset()">Reset</button>
  </div>
</template>

<script lang="ts" setup>
import Cell from "./Cell.vue";
import { createGame } from "../utils";

const game = createGame({
  minRow: 9,
  minColumn: 9,
  maxRow: 15,
  maxColumn: 15
});
</script>

<style lang="scss" scoped>
$min-row: 9;
$min-column: 9;
$max-row: 15;
$max-column: 15;
$cell-width: 42px;
$cell-height: 42px;

.checker-board {
  border: 1px solid gray;

  .row {
    display: flex;
  }
}

.control-area {
  padding: 1em;
  text-align: center;

  .control + .control {
    margin-left: 0.5em;
  }

  .control {
    padding: 0.7rem;
    font-size: 1.2rem;
    border-radius: 0.5rem;
    border: 0;
    background-color: #efefef;
    cursor: pointer;

    &:hover {
      background-color: #c0c0c0;
    }

    &:active {
      transform: translateY(1px);
    }

    &.primary {
      background-color: #42b983;
    }

    &.primary:hover {
      background-color: #349a6b;
    }
  }
}

@media screen and (max-width: 580px) {
  .checker-board {
    grid-template-rows: repeat($min-row, $cell-height);

    .row {
      display: grid;
      grid-template-columns: repeat($min-column, $cell-width);
    }
  }
}
</style>