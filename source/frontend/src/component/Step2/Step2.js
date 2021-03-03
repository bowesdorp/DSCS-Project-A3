import { AbstractTransitionComponent } from 'vue-transition-component';
import Step2TransitionController from './Step2TransitionController';

// @vue/component
export default {
  name: 'Step2',
  extends: AbstractTransitionComponent,
  data() {
    return {
      field1: '',
      hasError: false,
    };
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new Step2TransitionController(this);
      this.isReady();
    },
    handleKeypress() {
      this.hasError = false;
    },
    next() {
      this.hasError = false;

      if(this.field1 === '') {
        return this.hasError = true;
      }

      this.$emit('next');
    },
    prev() {
      this.$emit('prev');
    },
  },
};
