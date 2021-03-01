import { AbstractTransitionComponent } from 'vue-transition-component';
import Step2TransitionController from './Step2TransitionController';

// @vue/component
export default {
  name: 'Step2',
  extends: AbstractTransitionComponent,
  data() {
    return {
      field1: '',
    };
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new Step2TransitionController(this);
      this.isReady();
    },
    prev() {
      this.$emit('prev');
    }
  },
};
