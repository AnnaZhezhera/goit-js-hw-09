function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let timerId = null;

btnStart.addEventListener('click', onClickStart);
btnStop.addEventListener('click', onClickStop);

function onClickStart() {
  btnStart.setAttribute('disabled', true);
  timerId = setInterval(() => {
    const newColor = getRandomHexColor();
    document.body.style.backgroundColor = newColor;
  }, 1000);
}

function onClickStop() {
  btnStart.removeAttribute('disabled');
  if (timerId !== null) {
    clearInterval(timerId);
  }
  console.log('stop');
}
