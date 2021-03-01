import { AbstractTransitionComponent } from 'vue-transition-component';
import PaginatorTransitionController from './PaginatorTransitionController';

// @vue/component
export default {
  name: 'Paginator',
  extends: AbstractTransitionComponent,
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new PaginatorTransitionController(this);
      this.isReady();
    },
    next() {
      this.active += 1;
    },
    previous() {
      this.active -= 1;
    },
  },
};
