import { AbstractPageTransitionComponent } from 'vue-transition-component';
import HomePageTransitionController from './HomePageTransitionController';
import HeroBackground from '../../component/HeroBackground';
import Intro from '../../component/Intro';

// @vue/component
export default {
  name: 'HomePage',
  extends: AbstractPageTransitionComponent,
  components: {
    HeroBackground,
    Intro,
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new HomePageTransitionController(this);
      this.isReady();
    },
  },
};
