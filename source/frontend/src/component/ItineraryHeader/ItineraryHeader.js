import { AbstractTransitionComponent } from 'vue-transition-component';
import ItineraryHeaderTransitionController from './ItineraryHeaderTransitionController';

// @vue/component
export default {
  name: 'ItineraryHeader',
  extends: AbstractTransitionComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new ItineraryHeaderTransitionController(this);
      this.isReady();
    },
  },
};
