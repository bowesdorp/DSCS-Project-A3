<style src="./Model.scss" module lang="scss"></style>
<script src="./Model.js"></script>

<template>
  <div :class="[$style.model]" ref="model">
<!--    <Step1 />-->
    <Step2 />

    <Paginator :class="$style.paginator" />
  </div>
</template>
