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
  data() {
    return {
      flight: {},
    };
  },
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
    nextStep2(data) {
      this.$refs.paginator.next();
      this.flight.date = data.date;
      this.flight.flightNumber = data.flightNumber;

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
    nextStep3(data) {
      this.$refs.paginator.next();

      this.flight.coordinates = data.coordinates;

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
    },
    nextFinish(data) {
      this.flight.baggage = data.baggage;
      this.flight.checkIn = data.checkIn;
      this.flight.extraTime = data.extraTime;
      this.flight.priority = data.priority;

      this.$emit('finish', this.flight);
    }
  },
};
