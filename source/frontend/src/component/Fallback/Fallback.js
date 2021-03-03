import { AbstractTransitionComponent } from 'vue-transition-component';
import FallbackTransitionController from './FallbackTransitionController';

// @vue/component
export default {
  name: 'Fallback',
  extends: AbstractTransitionComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new FallbackTransitionController(this);
      this.isReady();
    },
  },
};
