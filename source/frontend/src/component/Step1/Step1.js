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
      hasErrorWrong: false,
    };
  },
  created() {
    let newDates = [];

    const NUMB_DATES = 14;

    const dates = Array.from(Array(NUMB_DATES)).map((_, i) => {
      if (i === 0) {
        newDates.push({
          title: 'Today',
          timestamp: moment().format('YYYY-MM-DD'),
        });
      } else if (i === 1) {
        moment().add(i, 'days');
        newDates.push({
          title: 'Tomorrow',
          timestamp: moment().add(i, 'days').format('YYYY-MM-DD'),
        });
      } else {
        newDates.push({
          title: moment().add(i, 'days').format('dddd D MMMM'),
          timestamp: moment().add(i, 'days').format('YYYY-MM-DD'),
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
      this.hasErrorWrong = false;
    },
    next() {
      this.hasError = false;
      this.hasErrorWrong = false;

      if(this.flightNumber === '') {
        return this.hasError = true;
      }

      if(!/\b([A-Z]{2}|[A-Z]\d|\d[A-Z])\s?\d{3,4}\b$/.test(this.flightNumber)) {
        return this.hasErrorWrong = true;
      }

      const number = this.flightNumber.replace(/\s/g, '');
      console.log(number);

      this.$emit('next', {date: this.date, flightNumber: number});
    },
    prev() {
      this.$emit('prev');
    }
  },
};
