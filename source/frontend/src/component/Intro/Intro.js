import { AbstractTransitionComponent } from 'vue-transition-component';
import IntroTransitionController from './IntroTransitionController';

// @vue/component
export default {
  name: 'Intro',
  extends: AbstractTransitionComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new IntroTransitionController(this);
      this.isReady();
    },
    openStep1() {
      const model = this.$parent.$refs.model;
      model.openTransition();
    }
  },
};
