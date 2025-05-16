import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const stateRadios = document.querySelectorAll('input[name="state"]');
const delayInput = document.querySelector('input[name="delay"]');

form.addEventListener('submit', ev => {
  ev.preventDefault();

  const delay = parseInt(delayInput.value);
  const state = Array.from(stateRadios).find(radio => radio.checked).value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(fulDelay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${fulDelay}ms`,
        position: 'topRight',
      });
    })
    .catch(rejDelay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${rejDelay}ms`,
        position: 'topRight',
      });
    });
});
