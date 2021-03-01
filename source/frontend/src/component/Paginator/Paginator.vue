<style src="./Paginator.scss" module lang="scss"></style>
<script src="./Paginator.js"></script>

<template>
  <div :class="[$style.paginator]">
    <span :class="[$style.step, {[$style.isActive]: active === 0}]"></span>
    <span :class="[$style.step, {[$style.isActive]: active === 1}]"></span>
    <span :class="[$style.step, {[$style.isActive]: active === 2}]"></span>
  </div>
</template>
