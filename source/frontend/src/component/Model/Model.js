import { AbstractTransitionComponent } from 'vue-transition-component';
import ModelTransitionController from './ModelTransitionController';
import Step1 from '../../component/Step1';

// @vue/component
export default {
  name: 'Model',
  extends: AbstractTransitionComponent,
  components: {
    Step1,
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new ModelTransitionController(this);
      this.isReady();
    },
  },
};
