<style src="./Step3.scss" module lang="scss"></style>
<script src="./Step3.js"></script>

<template>
  <div :class="[$style.step3]">
    <h2 :class="[$style.heading, 'heading-02']">Your travel <br>
      options</h2>

    <div :class="$style.form">
      <div :class="[$style.formItem, 'form-item']">
        <label :class="['form-label']">Check-in at the airport?</label>
        <div :class="['checkbox-wrapper']">
          <input type="checkbox" class="checkbox" id="checkin" v-model="checkIn">
          <label for="checkin" :class="'checkbox-label'">
          </label>
        </div>
      </div>

      <div :class="[$style.formItem, 'form-item']">
        <label :class="['form-label']">Checked baggage?</label>
        <div :class="['checkbox-wrapper']">
          <input type="checkbox" class="checkbox" id="baggage" v-model="baggage">
          <label for="baggage" :class="'checkbox-label'">
          </label>
        </div>
      </div>

      <div :class="[$style.formItem, 'form-item']">
        <label :class="['form-label']">Do you have a priority ticket?</label>
        <div :class="['checkbox-wrapper']">
          <input type="checkbox" class="checkbox" id="priority" v-model="priority">
          <label for="priority" :class="'checkbox-label'">
          </label>
        </div>
      </div>

      <div :class="[$style.formItem, 'form-item']">
        <label for="date" :class="['form-label']">Add extra time at the airport?</label>
        <select name="cars" id="date" :class="['input']" v-model="extraTime">
          <option value="0">No extra time</option>
          <option value="30">Half hour</option>
          <option value="60">One hour</option>
          <option value="90">one and a half hours</option>
          <option value="120">Two hours</option>
        </select>
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
