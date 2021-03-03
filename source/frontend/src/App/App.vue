<style src="./App.scss" module lang="scss"></style>
<script src="./App.js"></script>

<template>
  <div :class="[$style.app]">
    <Loader ref="loader" v-if="loaderVisible" />
    <router-view />
  </div>
</template>
