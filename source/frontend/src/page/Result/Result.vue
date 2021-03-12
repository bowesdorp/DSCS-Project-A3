<style src="./Result.scss" module lang="scss"></style>
<script src="./Result.js"></script>

<template>
  <div :class="$style.result">
    <div :class="[]" v-if="result && !result.code">
      <itinerary-header :result="result" :destination="destination" />
      <itinerary-alert :result="result"/>
      <itinerary :result="result" :destination="destination" />

      <button :class="['button primary-button', $style.btnWrap, $style.button]" @click="newFlight">
        Make new flightplan
      </button>
    </div>

    <div :class="[$style.error, 'wrapper']" v-else>
      <h3 :class="['heading-02', $style.heading]">
        Something went wrong...
      </h3>
      <p :class="['copy-03', $style.copy]">
        Please check your flight number and entered details
        <br><br>
        <span v-if="result.message">
          {{result.message}}
        </span>
      </p>
      <button :class="['button primary-button', $style.button]" @click="newFlight">
        New flight
      </button>
    </div>


  </div>
</template>
