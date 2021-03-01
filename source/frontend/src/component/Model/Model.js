import { AbstractTransitionComponent } from 'vue-transition-component';
import { TweenLite, Power4 } from 'gsap';
import ModelTransitionController from './ModelTransitionController';
import Step1 from '../Step1';
import Step2 from '../Step2';
import Paginator from '../Paginator';


// @vue/component
export default {
  name: 'Model',
  extends: AbstractTransitionComponent,
  components: {
    Step1,
    Step2,
    Paginator,
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new ModelTransitionController(this);
      this.isReady();
    },
    openTransition() {
      TweenLite.to(this.$refs.model, 0.8, {
        y: '0%',
        ease: Power4.easeInOut,
      })
    }
  },
};
