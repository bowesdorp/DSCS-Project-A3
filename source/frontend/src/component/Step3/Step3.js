import { AbstractTransitionComponent } from 'vue-transition-component';
import Step3TransitionController from './Step3TransitionController';

// @vue/component
export default {
  name: 'Step3',
  extends: AbstractTransitionComponent,
  data() {
    return {
      checkIn: false,
      baggage: false,
      priority: false,
      extraTime: 0,
    };
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new Step3TransitionController(this);
      this.isReady();
    },
    prev() {
      this.$emit('prev')
    },
    next() {
      this.$emit('next', {checkIn: this.checkIn, baggage: this.baggage, priority: this.priority, extraTime: this.extraTime})
    }
  },
};
