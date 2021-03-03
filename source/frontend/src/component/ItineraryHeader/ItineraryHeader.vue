<style src="./ItineraryHeader.scss" module lang="scss"></style>
<script src="./ItineraryHeader.js"></script>

<template>
  <div :class="[$style.itineraryHeader, 'wrapper']">
    <h3 :class="['heading-03', $style.flight]">KLM (KL1007)</h3>
    <h2 :class="['heading-02', $style.title]">
      Flight to <br>
      London Heathrow
    </h2>
  </div>
</template>
