import { AbstractTransitionComponent } from 'vue-transition-component';
import Step3TransitionController from './Step3TransitionController';

// @vue/component
export default {
  name: 'Step3',
  extends: AbstractTransitionComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new Step3TransitionController(this);
      this.isReady();
    },
    prev() {
      this.$emit('prev')
    },
    next() {
      this.$emit('next')
    }
  },
};
