import { DeviceStateEvent } from 'seng-device-state-tracker';
import { mapMutations, mapState } from 'vuex';
import { SET_DEVICE_STATE } from '../store/module/app/app';
import Loader from '../component/Loader/Loader';

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
    finish() {
      this.loaderVisible = true;

      setTimeout(() => {
        this.$refs.loader.startAnimation().eventCallback("onComplete", () => {
          this.$router.push('/result');
          this.$refs.loader.finishAnimation().eventCallback("onComplete", () => {
            this.loaderVisible = false;
          });
        });
      }, 100);
    }
  },
};
