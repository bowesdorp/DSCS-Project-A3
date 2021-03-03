import { AbstractTransitionComponent } from 'vue-transition-component';
import IntroTransitionController from './IntroTransitionController';
import { getValue } from '../../util/injector';
import { CONFIG_MANAGER } from '../../data/Injectables';
import { VariableNames } from '../../data/enum/configNames';

// @vue/component
export default {
  name: 'Intro',
  extends: AbstractTransitionComponent,
  data() {
    return {
      videoPath: '',
    };
  },
  mounted() {
    const configManager = getValue(CONFIG_MANAGER);
    this.videoPath = configManager.getVariable(VariableNames.VERSIONED_STATIC_ROOT) + 'video/bg-video.mp4';
  },
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
