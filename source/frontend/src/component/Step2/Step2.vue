<style src="./Step2.scss" module lang="scss"></style>
<script src="./Step2.js"></script>

<template>
  <div :class="[$style.step2]">
    <h2 :class="[$style.heading, 'heading-02']">Where are you
      <br>travel from?</h2>
    <div :class="$style.form">
      <div :class="[$style.formItem, 'form-item']">
        <label for="address" :class="['form-label']">Find your address</label>
        <p :class="['form-label error']" v-if="hasError">Please fill in an address</p>

        <div v-if="field1" :class="['copy-02']">
          {{field1}}
        </div>

        <place-autocomplete-field @keydown="handleKeypress" id="address" v-model="field1" placeholder="Enter your address and select location" name="field1" api-key="AIzaSyAYWnC8NQ7LgTytkmBzElvJnd4kJFpMMTE"></place-autocomplete-field>
      </div>

      <div :class="$style.buttonWrapper">
        <button :class="['button primary-button light', $style.button]" @click="prev">
          Previous
        </button>
        <button :class="['button primary-button', $style.button]" @click="next">
          Next
        </button>
      </div>
    </div>
  </div>
</template>
