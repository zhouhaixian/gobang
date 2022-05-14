<template>
  <div class="piece" :class="{ cross: isCross, circle: isCircle }"></div>
</template>

<script lang="ts" setup>
import { PieceStatus } from "../types";

const props = defineProps<{ type: PieceStatus }>();
const isCross = props.type === "cross";
const isCircle = props.type === "circle";
</script>

<style lang="scss" scoped>
@use "sass:math";

$color: black;
$width: 40px;
$height: 40px;
$content-width: 2px;
$content-height: 30px;

.piece {
  width: $width;
  height: $width;
  display: inline-block;
  position: relative;

  &.cross::before,
  &.cross::after {
    position: absolute;
    content: ' ';
    background-color: $color;
    top: math.div($width - $content-height, 2);
    left: math.div($width - 2, 2);
    width: $content-width;
    height: $content-height;
  }

  &.cross::before {
    transform: rotate(45deg);
  }

  &.cross::after {
    transform: rotate(-45deg);
  }

  &.circle::before {
    position: absolute;
    content: ' ';
    top: math.div($width - $content-height, 2) + $content-width;
    left: math.div($width - $content-height, 2) + $content-width;
    width: $content-height - $content-width * 4;
    height: $content-height - $content-width * 4;
    border-radius: 50%;
    border: $content-width solid $color;
  }
}
</style>