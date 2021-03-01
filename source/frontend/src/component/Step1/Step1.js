import { AbstractTransitionComponent } from 'vue-transition-component';
import Step1TransitionController from './Step1TransitionController';

// @vue/component
export default {
  name: 'Step1',
  extends: AbstractTransitionComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new Step1TransitionController(this);
      this.isReady();
    },
    next() {
      this.$emit('next');
    },
    prev() {
      this.$emit('prev');
    }
  },
};
