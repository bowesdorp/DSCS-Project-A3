import { DeviceStateEvent } from 'seng-device-state-tracker';
import { mapMutations, mapState } from 'vuex';
import { FlowManager, AbstractRegistrableComponent } from 'vue-transition-component';
import { SET_DEVICE_STATE } from '../store/module/app/app';
import Loader from '../component/Loader/Loader';
import { RouteNames } from '../router/routes';

// @vue/component
export default {
  name: 'App',
  components: {
    Loader,
  },
  data() {
    return {
      loaderVisible: false,
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
  methods: {
    ...mapMutations({
      setDeviceState: SET_DEVICE_STATE,
    }),
    handleDeviceStateUpdate(event) {
      this.setDeviceState(event.data.state);
    },
    onLeave(element, done) {
      FlowManager.transitionOut.then(() => FlowManager.done()).then(done);
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
