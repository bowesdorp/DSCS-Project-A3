<style src="./HeroBackground.scss" module lang="scss"></style>
<script src="./HeroBackground.js"></script>

<template>
  <div :class="[$style.heroBackground]">
    <video autoplay muted playsinline loop id="myVideo" :class="$style.bgVideo">
      <source :src="videoPath" type="video/mp4">
    </video>
  </div>
</template>
