import { AbstractTransitionComponent } from 'vue-transition-component';
import ItineraryTransitionController from './ItineraryTransitionController';

// @vue/component
export default {
  name: 'Itinerary',
  extends: AbstractTransitionComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new ItineraryTransitionController(this);
      this.isReady();
    },
  },
};
