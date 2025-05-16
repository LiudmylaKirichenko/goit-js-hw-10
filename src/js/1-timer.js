import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputTimer = document.getElementById('datetime-picker');
const btnStart = document.querySelector('[data-start]');

const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[ data-seconds]');

btnStart.disabled = true;

let userSelectDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
      userSelectDate = selectedDate;
    }
  },
};

flatpickr(inputTimer, options);

btnStart.addEventListener('click', () => {
  if (!userSelectDate) return;

  btnStart.disabled = true;
  inputTimer.disabled = true;

  let countdownInterval = setInterval(() => {
    const now = new Date();
    const ms = userSelectDate - now;

    if (ms <= 0) {
      clearInterval(countdownInterval);
      updateTimer(0);
      inputTimer.disabled = false;
      return;
    }

    updateTimer(ms);
  }, 1000);
});

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  daysElem.textContent = days;
  hoursElem.textContent = addLeadingZero(hours);
  minutesElem.textContent = addLeadingZero(minutes);
  secondsElem.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
