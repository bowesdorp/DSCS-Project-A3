import { AbstractPageTransitionComponent } from 'vue-transition-component';
import HomePageTransitionController from './HomePageTransitionController';
import HeroBackground from '../../component/HeroBackground';
import Intro from '../../component/Intro';
import Model from '../../component/Model';
import { postFlight } from '../../util/gatewayFormatter';

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
      postFlight(data).then((response) => {
        console.log(response);
      });
      // this.$parent.finish();
    },
  },
};
