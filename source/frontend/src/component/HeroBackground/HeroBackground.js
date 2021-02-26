import { AbstractTransitionComponent } from 'vue-transition-component';
import HeroBackgroundTransitionController from './HeroBackgroundTransitionController';

// @vue/component
export default {
  name: 'HeroBackground',
  extends: AbstractTransitionComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new HeroBackgroundTransitionController(this);
      this.isReady();
    },
  },
};
