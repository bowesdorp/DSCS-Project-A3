<style src="./Result.scss" module lang="scss"></style>
<script src="./Result.js"></script>

<template>
  <div :class="[$style.result]" v-if="result">
    <itinerary-header :result="result" />
    <itinerary-alert :result="result" />
    <itinerary :result="result" />
  </div>
</template>
