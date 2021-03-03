import { AbstractTransitionComponent } from 'vue-transition-component';
import LoaderTransitionController from './LoaderTransitionController';
import { TweenLite, TimelineMax } from 'gsap';

// @vue/component
export default {
  name: 'Loader',
  extends: AbstractTransitionComponent,
  data() {
    return {
      timeline: null,
    };
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new LoaderTransitionController(this);
      this.isReady();
    },
    startAnimation() {
      const planeWrap = this.$refs.planeWrap;
      const timeline = new TimelineMax();
      const loader = this.$refs.loader;
      const title = this.$refs.title;

      timeline.to(loader, .4, {
        autoAlpha: 1,
      }).to(title, .5, {
        autoAlpha: 1,
      }).set(planeWrap, {
        autoAlpha: 1,
      }).fromTo(planeWrap, 12, {
        y: '-100%'
      }, {
        x: '200%',
      });

      return timeline;
    },
    finishAnimation() {
      const planeWrap = this.$refs.planeWrap;
      const timeline = new TimelineMax();
      const loader = this.$refs.loader;
      const title = this.$refs.title;

      timeline.to(title, .5, {
        autoAlpha: 0,
      }).to(loader, .4, {
        autoAlpha: 0,
      }).set(planeWrap, {
        autoAlpha: 0,
      });

      return timeline;
    }
  },
};
