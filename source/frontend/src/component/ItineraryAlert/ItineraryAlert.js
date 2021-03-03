import { AbstractTransitionComponent } from 'vue-transition-component';
import ItineraryAlertTransitionController from './ItineraryAlertTransitionController';

// @vue/component
export default {
  name: 'ItineraryAlert',
  extends: AbstractTransitionComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new ItineraryAlertTransitionController(this);
      this.isReady();
    },
  },
};
