import { AbstractPageTransitionComponent } from 'vue-transition-component';
import ResultTransitionController from './ResultTransitionController';
import ItineraryHeader from '../../component/ItineraryHeader';
import ItineraryAlert from '../../component/ItineraryAlert';
import Itinerary from '../../component/Itinerary';

// @vue/component
export default {
  name: 'Result',
  extends: AbstractPageTransitionComponent,
  components: {
    ItineraryHeader,
    ItineraryAlert,
    Itinerary,
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new ResultTransitionController(this);
      this.isReady();
    },
  },
};
