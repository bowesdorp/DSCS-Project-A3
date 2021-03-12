import { AbstractPageTransitionComponent } from 'vue-transition-component';
import ResultTransitionController from './ResultTransitionController';
import ItineraryHeader from '../../component/ItineraryHeader';
import ItineraryAlert from '../../component/ItineraryAlert';
import Itinerary from '../../component/Itinerary';
import { RouteNames } from '../../router/routes';
import airports from '../../asset/json/airports.json';

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
      destination: {},
    };
  },
  mounted() {
  },
  created() {
    this.result = this.$route.params.result;

    console.log(this.result);
    this.loadJSON();
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new ResultTransitionController(this);
      this.isReady();

      if (this.result === undefined) {
        this.$router.push({ name: RouteNames.HOME });
      }
    },
    newFlight() {
      this.$router.push({ name: RouteNames.HOME });
    },
    loadJSON() {
      const destinationCode = this.result.flight_info.data[0].route.destinations[0];

      Object.filter = (obj, predicate) =>
        Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

      const filtered = Object.filter(airports, airport => airport.iata === destinationCode);
      const filterKey = Object.keys(filtered)[0];

      this.destination = filtered[filterKey];
    },
  },
};
