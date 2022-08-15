import Notiflix from 'notiflix';
import '../../node_modules/notiflix/dist/notiflix-3.2.5.min.css';

const formSubmit = document.querySelector('.form');
const inputEl = document.querySelector('input');

function createPromise(pos, del) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: pos, delay: del });
      } else {
        reject({ position: pos, delay: del });
      }
    }, del);
  });
}

formSubmit.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const formElements = event.currentTarget.elements;
  const inputDelay = parseInt(formElements.delay.value);
  const inputStep = parseInt(formElements.step.value);
  const inputAmount = parseInt(formElements.amount.value);

  // console.log(inputAmount, inputDelay, inputStep);

  for (let i = 1; i <= inputAmount; i += 1) {
    let currentDelay = inputDelay + (i - 1) * inputStep;
    console.log(currentDelay, inputDelay, inputStep);
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}
