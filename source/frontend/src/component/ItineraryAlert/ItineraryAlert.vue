<style src="./ItineraryAlert.scss" module lang="scss"></style>
<script src="./ItineraryAlert.js"></script>

<template>
  <div :class="[$style.itineraryAlert, 'wrapper']">
    <h4 :class="['heading-03', $style.title]">Your flight travel scheme for {{returnDate(result.flight_info.data[0].scheduleDate)}} at {{returnTime(result.flight_info.data[0].scheduleTime)}}</h4>
  </div>
</template>
