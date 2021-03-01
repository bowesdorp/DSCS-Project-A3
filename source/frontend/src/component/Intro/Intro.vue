<style src="./Intro.scss" module lang="scss"></style>
<script src="./Intro.js"></script>

<template>
  <div :class="[$style.intro, 'wrapper']">
    <h1 :class="[$style.heading, 'heading-01']">Plan your trip</h1>
    <p :class="[$style.copy, 'copy-01']">Find your flight, plan your trip,<br>
      and enjoy your time</p>
    <button :class="['button primary-button', $style.button]" @click="openStep1">
      Start
    </button>
  </div>
</template>
