<style src="./Step1.scss" module lang="scss"></style>
<script src="./Step1.js"></script>

<template>
  <div :class="[$style.step1]">
    <h2 :class="[$style.heading, 'heading-02']">Find a flight <br>
      Find a route</h2>
    <div :class="$style.form">
      <div :class="[$style.formItem, 'form-item']">
        <label for="flightnumber" :class="['form-label']">Find your flight</label>
        <input type="text" id="flightnumber" :class="['input']" placeholder="Enter your flight number or destination">
      </div>

      <div :class="[$style.formItem, 'form-item']">
        <label for="date" :class="['form-label']">Find your flight</label>
        <select name="cars" id="date" :class="['input']">
          <option value="22 march 2021">22 March 2021</option>
          <option value="23 march 2021">23 March 2021</option>
          <option value="24 march 2021">24 March 2021</option>
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
