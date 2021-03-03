import { DeviceStateEvent } from 'seng-device-state-tracker';
import { mapMutations, mapState } from 'vuex';
import { FlowManager, AbstractRegistrableComponent } from 'vue-transition-component';
import bowser from 'bowser';
import { SET_DEVICE_STATE } from '../store/module/app/app';
import Loader from '../component/Loader';
import Fallback from '../component/Fallback';
import { RouteNames } from '../router/routes';

// @vue/component
export default {
  name: 'App',
  components: {
    Loader,
    Fallback,
  },
  data() {
    return {
      loaderVisible: false,
      fallbackVisible: false,
    };
  },
  extends: AbstractRegistrableComponent,
  computed: {
    ...mapState({
      deviceState: (state) => state.app.deviceState,
    }),
  },
  created() {
    this.$deviceStateTracker.addEventListener(
      DeviceStateEvent.STATE_UPDATE,
      this.handleDeviceStateUpdate,
    );
    this.setDeviceState(this.$deviceStateTracker.currentState);
  },
  mounted() {
    setTimeout(() => {
      this.setFallback();
    }, 1000)
  },
  methods: {
    ...mapMutations({
      setDeviceState: SET_DEVICE_STATE,
    }),
    handleDeviceStateUpdate(event) {
      this.setDeviceState(event.data.state);
      this.setFallback();
    },
    onLeave(element, done) {
      FlowManager.transitionOut.then(() => FlowManager.done()).then(done);
    },
    setFallback() {
      this.fallbackVisible = window.innerWidth > 767;
    },
    finish() {
      this.loaderVisible = true;

      setTimeout(() => {
        this.$refs.loader.startAnimation().eventCallback("onComplete", () => {
          this.$router.push({ name: RouteNames.RESULT });
          this.$refs.loader.finishAnimation().eventCallback("onComplete", () => {
            this.loaderVisible = false;
          });
        });
      }, 100);
    }
  },
};
