import { AbstractTransitionComponent } from 'vue-transition-component';
import VueTypes from 'vue-types';
import moment from 'moment';
import { TweenLite, Power4 } from 'gsap';
import ItineraryTransitionController from './ItineraryTransitionController';

// @vue/component
export default {
  name: 'Itinerary',
  extends: AbstractTransitionComponent,
  props: {
    result: VueTypes.object.isRequired,
    destination: VueTypes.object.isRequired,
  },
  data() {
    return {
      mode: 'car',
      route: {},
    };
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new ItineraryTransitionController(this);
      var momentDurationFormatSetup = require("moment-duration-format");
      momentDurationFormatSetup(moment);
      this.route = this.result.routes.driving;
      this.isReady();
    },
    selectMode(modus) {
      this.mode = modus;

      switch (modus) {
        case 'car':
          this.route = this.result.routes.driving;
          break;
        case 'public':
          this.route = this.result.routes.transit;
          break;
        case 'walk':
          this.route = this.result.routes.walking;
          break;
        case 'bike':
          this.route = this.result.routes.bicycling;
          break;
      }
    },
    closeRoute() {
      TweenLite.to(this.$refs.innerOverlay, 0.4, {
        autoAlpha: 0,
        ease: Power4.easeInOut,
      });
      TweenLite.to(this.$refs.overlay, 0.3, {
        autoAlpha: 0,
        ease: Power4.easeInOut,
        onComplete: () => {
          TweenLite.set(this.$refs.overlay, {
            display: 'none'
          });
        }
      });
    },
    openRoute() {
      TweenLite.set(this.$refs.overlay, {
        display: 'block'
      });
      TweenLite.to(this.$refs.overlay, 0.3, {
        autoAlpha: 1,
        ease: Power4.easeInOut,
      });
      TweenLite.to(this.$refs.innerOverlay, 0.4, {
        autoAlpha: 1,
        ease: Power4.easeInOut,
      });
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
      if (time === null) return 'Null';
      // 2021-03-10T20:15:00.000+01:00
      return moment(time).format('HH:mm');
    },
    setRouteTime(time) {
      return moment(time, 'hh:mm A').format('HH:mm');
    },
    waiting(time) {
      return moment(time, 'hh:mm:ss').format('HH:mm');
    }
  },
};
