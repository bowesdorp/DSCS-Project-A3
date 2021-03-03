import { AbstractPageTransitionComponent } from 'vue-transition-component';
import HomePageTransitionController from './HomePageTransitionController';
import HeroBackground from '../../component/HeroBackground';
import Intro from '../../component/Intro';
import Model from '../../component/Model';

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
    handleFinish() {
      this.$parent.finish();
    },
  },
};
