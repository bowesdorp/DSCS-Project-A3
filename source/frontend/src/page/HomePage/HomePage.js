import { AbstractPageTransitionComponent } from 'vue-transition-component';
import HomePageTransitionController from './HomePageTransitionController';
import HeroBackground from '../../component/HeroBackground';
import Intro from '../../component/Intro';
import Model from '../../component/Model';
import { postFlight } from '../../util/gatewayFormatter';
import { RouteNames } from '../../router/routes';

// @vue/component
export default {
  name: 'HomePage',
  extends: AbstractPageTransitionComponent,
  components: {
    HeroBackground,
    Intro,
    Model,
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new HomePageTransitionController(this);
      this.isReady();
    },
    handleFinish(data) {
      this.$parent.startFinish();
      postFlight(data).then((response) => {
        response.settings = data;
        this.$router.push({ name: RouteNames.RESULT, params: {result: response }});
        this.$parent.finish();
      });
    },
  },
};
