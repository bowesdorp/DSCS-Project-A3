<style src="./HeroBackground.scss" module lang="scss"></style>
<script src="./HeroBackground.js"></script>

<template>
  <div :class="[$style.heroBackground]">
    <video autoplay muted loop id="myVideo" :class="$style.bgVideo">
      <source src="static/video/bg-video.mp4" type="video/mp4">
    </video>
  </div>
</template>
