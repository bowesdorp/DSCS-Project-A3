<style src="./App.scss" module lang="scss"></style>
<script src="./App.js"></script>

<template>
  <div :class="[$style.app]">
    <Loader ref="loader" v-if="loaderVisible" />
    <Fallback v-if="fallbackVisible" />
    <transition @leave="onLeave">
      <router-view />
    </transition>
  </div>
</template>
