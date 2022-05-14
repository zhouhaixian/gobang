<template>
  <div class="cell" @click="handleClick">
    <piece type="cross" v-if="isCross" />
    <piece type="circle" v-if="isCircle" />
  </div>
</template>

<script lang="ts" setup>
import Piece from "./Piece.vue";
import { CellStatus } from "../types";
import { computed } from "vue";

const props = defineProps<{ content: CellStatus }>();
const isCross = computed(() => props.content === "cross");
const isCircle = computed(() => props.content === "circle");

const emits = defineEmits<{
  (e: "click", event: Event): void
}>();

function handleClick(e: Event) {
  emits("click", e);
}
</script>

<style lang="scss" scoped>
$width: 40px;
$height: 40px;
$border-width: 1px;

.cell {
  border: $border-width solid gray;
  width: $width;
  height: $height;
}
</style>