<style src="./ItineraryHeader.scss" module lang="scss"></style>
<script src="./ItineraryHeader.js"></script>

<template>
  <div :class="[$style.itineraryHeader, 'wrapper']">
    <h3 :class="['heading-03', $style.flight]">{{result.flight_info.data[0].prefixICAO}} ({{result.flight_info.data[0].flightName}})</h3>
    <h2 :class="['heading-02', $style.title]">
      Flight to <br>
      {{result.flight_info.data[0].route.destinations[0]}}
    </h2>
  </div>
</template>
