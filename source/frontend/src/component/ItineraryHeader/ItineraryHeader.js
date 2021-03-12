import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import ItineraryHeaderTransitionController from './ItineraryHeaderTransitionController';

// @vue/component
export default {
  name: 'ItineraryHeader',
  extends: AbstractTransitionComponent,
  props: {
    result: VueTypes.object.isRequired,
    destination: VueTypes.object.isRequired,
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new ItineraryHeaderTransitionController(this);
      this.isReady();
    },
  },
};
