<style src="./Model.scss" module lang="scss"></style>
<script src="./Model.js"></script>

<template>
  <div :class="[$style.model]" ref="model">
    <Step1 @next="nextStep2" ref="step1" :class="[$style.step1]" />
    <Step2 @next="nextStep3" @prev="prevStep1" ref="step2" :class="[$style.step2]" />
    <step3 @prev="prevStep2" @next="nextFinish" ref="step3" :class="[$style.step3]" />
    <Paginator ref="paginator" :class="$style.paginator" />
  </div>
</template>
