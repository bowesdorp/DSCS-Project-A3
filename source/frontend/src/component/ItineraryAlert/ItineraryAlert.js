import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import moment from 'moment';
import ItineraryAlertTransitionController from './ItineraryAlertTransitionController';

// @vue/component
export default {
  name: 'ItineraryAlert',
  extends: AbstractTransitionComponent,
  props: {
    result: VueTypes.object.isRequired,
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new ItineraryAlertTransitionController(this);
      this.isReady();
    },
    returnDate(date) {
      return moment(date).format('dddd D MMMM');
    },
    returnTime(time) {
      return moment(time, 'HH:mm:ss').format('HH:mm');
    }
  },
};
