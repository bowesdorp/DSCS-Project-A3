import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import moment from 'moment';
import ItineraryTransitionController from './ItineraryTransitionController';

// @vue/component
export default {
  name: 'Itinerary',
  extends: AbstractTransitionComponent,
  props: {
    result: VueTypes.object.isRequired,
  },
  data() {
    return {
      mode: 'car',
    };
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new ItineraryTransitionController(this);
      var momentDurationFormatSetup = require("moment-duration-format");
      momentDurationFormatSetup(moment);
      this.isReady();
    },
    selectMode(modus) {
      this.mode = modus;
    },
    transformBoolean(boolean) {
      if (boolean === true) {
        return 'Yes'
      } else {
        return 'No'
      }
    },
    returnExtraTime(time) {
      if (time === 0) return 'No';


      return moment.duration(Number(time), "minutes").format("h:mm");
    },
    returnBoarding(time) {
      // 2021-03-10T20:15:00.000+01:00
      return moment(time).format('HH:mm');
    }
  },
};
