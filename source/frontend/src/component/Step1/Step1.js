import { AbstractTransitionComponent } from 'vue-transition-component';
import moment from 'moment';
import Step1TransitionController from './Step1TransitionController';

// @vue/component
export default {
  name: 'Step1',
  extends: AbstractTransitionComponent,
  data() {
    return {
      dates: [],
      date: '',
      flightNumber: '',
      hasError: false,
    };
  },
  created() {
    let newDates = [];

    const NUMB_DATES = 14;

    const dates = Array.from(Array(NUMB_DATES)).map((_, i) => {
      if (i === 0) {
        newDates.push({
          title: 'Today',
          timestamp: moment().format(),
        });
      } else if (i === 1) {
        moment().add(i, 'days');
        newDates.push({
          title: 'Tomorrow',
          timestamp: moment().add(i, 'days').format(),
        });
      } else {
        newDates.push({
          title: moment().add(i, 'days').format('dddd D MMMM'),
          timestamp: moment().add(i, 'days').format(),
        });
      }
    });

    this.dates = newDates;
    this.date = this.dates[0].timestamp;
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new Step1TransitionController(this);
      this.isReady();
    },
    handleKeypress() {
      this.hasError = false;
    },
    next() {
      this.hasError = false;

      if(this.flightNumber === '') {
        return this.hasError = true;
      }

      this.$emit('next');
    },
    prev() {
      this.$emit('prev');
    }
  },
};
