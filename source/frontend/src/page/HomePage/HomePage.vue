
<style src="./HomePage.scss" module lang="scss"></style>
<script src="./HomePage.js"></script>

<template>
  <div :class="[$style.homePage]">
    <HeroBackground />
    <Intro />
    <Model ref="model" @finish="handleFinish" />
  </div>
</template>
