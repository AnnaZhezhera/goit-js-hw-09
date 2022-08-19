import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('button[data-start]');
const timerExpiryText = document.querySelector('.timer');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
let selectedDate;

btnStart.setAttribute('disabled', true);
btnStart.addEventListener('click', onClickStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    console.log(new Date(0));
    // if (new Date() > selectedDate) {
    //   window.alert('Please choose a date in the future');
    // }
    console.log(selectedDates[0]);
    if (selectedDate.getTime() < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnStart.removeAttribute('disabled');
    }
  },
};

flatpickr('input#datetime-picker', options);

function onClickStart() {
  timer.start(selectedDate);
  clearInterval();
}

const timer = {
  isActive: false,
  start(futureTime) {
    // const startTime = Date.now();

    if (this.isActive) {
      return;
    }
    this.isActive = true;

    const timerId = setInterval(() => {
      //   const futureTime = Date.now();
      const deltaTime = futureTime - Date.now();
      const TimeComponents = convertMs(deltaTime);
      console.log(
        `${TimeComponents.days}:${TimeComponents.hours}:${TimeComponents.minutes}:${TimeComponents.seconds}`
      );

      updateCounter(TimeComponents);

      if (deltaTime < 0) {
        clearInterval(timerId);
        updateCounter({
          days: addLeadingZero(0),
          hours: addLeadingZero(0),
          minutes: addLeadingZero(0),
          seconds: addLeadingZero(0),
        });
      }
    }, 1000);
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function updateCounter({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}
