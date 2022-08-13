import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(this.defaultDate);
    // console.log(selectedDates[0]);
    // if (this.defaultDate.getTime() < Date.now()) {
    //   console.log(Date.now());

    //   window.alert('Please choose a date in the future');
    // }
  },
};

flatpickr('input#datetime-picker', options);
