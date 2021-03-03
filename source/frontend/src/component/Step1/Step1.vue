<style src="./Step1.scss" module lang="scss"></style>
<script src="./Step1.js"></script>

<template>
  <div :class="[$style.step1]">
    <h2 :class="[$style.heading, 'heading-02']">Find a flight <br>
      Find a route</h2>
    <div :class="$style.form">
      <div :class="[$style.formItem, 'form-item']">
        <label for="flightnumber" :class="['form-label']">Find your flight</label>
        <p :class="['form-label error']" v-if="hasError">Please fill in a flight number</p>
        <input type="text" id="flightnumber" :class="['input', {['error']: hasError}]" placeholder="Enter your flight number or destination" v-model="flightNumber" @keypress="handleKeypress">
      </div>

      <div :class="[$style.formItem, 'form-item']">
        <label for="date" :class="['form-label']">Select your date</label>
        <select name="cars" id="date" :class="['input']" v-model="date">
          <option :value="date.timestamp" v-for="(date, index) in dates" :key="index">{{date.title}}</option>
        </select>
      </div>
      <div>
        <button :class="['button primary-button', $style.button]" @click="next">
          Next
        </button>
      </div>
    </div>
  </div>
</template>
