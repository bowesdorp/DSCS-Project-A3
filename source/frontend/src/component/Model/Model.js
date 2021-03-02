import { AbstractTransitionComponent } from 'vue-transition-component';
import { TweenLite, TimelineMax, Power4 } from 'gsap';
import ModelTransitionController from './ModelTransitionController';
import Step1 from '../Step1';
import Step2 from '../Step2';
import Step3 from '../Step3';
import Paginator from '../Paginator';


// @vue/component
export default {
  name: 'Model',
  extends: AbstractTransitionComponent,
  components: {
    Step1,
    Step2,
    Step3,
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
      });

      TweenLite.to(this.$refs.step1.$el, 0.5, {
        opacity: 1,
        ease: Power4.easeInOut,
        delay: 1,
      })
    },
    prevStep1() {
      this.$refs.paginator.previous();
      this.timeline = new TimelineMax();

      this.timeline.to(this.$refs.step2.$el, 0.5, {
        opacity: 0,
        ease: Power4.easeInOut,
      }).set(this.$refs.step2.$el, {
        display: 'none',
      }).set(this.$refs.step1.$el, {
        display: 'block',
      }).to(this.$refs.step1.$el, 0.5, {
        opacity: 1,
        ease: Power4.easeInOut,
        delay: 0.4,
      })
    },
    prevStep2() {
      this.$refs.paginator.previous();
      this.timeline = new TimelineMax();

      this.timeline.to(this.$refs.step3.$el, 0.5, {
        opacity: 0,
        ease: Power4.easeInOut,
      }).set(this.$refs.step3.$el, {
        display: 'none',
      }).set(this.$refs.step2.$el, {
        display: 'block',
      }).to(this.$refs.step2.$el, 0.5, {
        opacity: 1,
        ease: Power4.easeInOut,
        delay: 0.4,
      })
    },
    nextStep2() {
      this.$refs.paginator.next();

      this.timeline = new TimelineMax();
      this.timeline.to(this.$refs.step1.$el, 0.5, {
        opacity: 0,
        ease: Power4.easeInOut,
      }).set(this.$refs.step1.$el, {
        display: 'none',
      }).set(this.$refs.step2.$el, {
        display: 'block',
      }).to(this.$refs.step2.$el, 0.5, {
        opacity: 1,
        ease: Power4.easeInOut,
        delay: 0.4,
      })
    },
    nextStep3() {
      this.$refs.paginator.next();

      this.timeline = new TimelineMax();
      this.timeline.to(this.$refs.step2.$el, 0.5, {
        opacity: 0,
        ease: Power4.easeInOut,
      }).set(this.$refs.step2.$el, {
        display: 'none',
      }).set(this.$refs.step3.$el, {
        display: 'block',
      }).to(this.$refs.step3.$el, 0.5, {
        opacity: 1,
        ease: Power4.easeInOut,
        delay: 0.4,
      })
    }
  },
};
