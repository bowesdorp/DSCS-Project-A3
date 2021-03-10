import { AbstractPageTransitionComponent } from 'vue-transition-component';
import ResultTransitionController from './ResultTransitionController';
import ItineraryHeader from '../../component/ItineraryHeader';
import ItineraryAlert from '../../component/ItineraryAlert';
import Itinerary from '../../component/Itinerary';
import { RouteNames } from '../../router/routes';

// @vue/component
export default {
  name: 'Result',
  extends: AbstractPageTransitionComponent,
  components: {
    ItineraryHeader,
    ItineraryAlert,
    Itinerary,
  },
  data() {
    return {
      result: {},
    };
  },
  mounted() {
  },
  created() {
    this.result = this.$route.params.result;

    console.log(this.result);
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new ResultTransitionController(this);
      this.isReady();

      if (this.result === undefined) {
        this.$router.push({ name: RouteNames.HOME });
      }
    },
  },
};
