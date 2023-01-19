'use strict';

//DOM SELECTORS
const againBtn = document.querySelector('.btn.again'),
  checkBtn = document.querySelector('.btn.check'),
  guessInput = document.querySelector('input.guess'),
  guessMessage = document.querySelector('p.message'),
  labelScore = document.querySelector('span.score'),
  labelHighscore = document.querySelector('span.highscore'),
  secretNumberDiv = document.querySelector('div.number'),
  root = document.querySelector(':root');

const SCORE_DEFAULT = 500,
  SCORE_STEP = 50;

  //initialize data
let secretNumber = Math.ceil(Math.random() * 20),
  highscore = 0,
  score = SCORE_DEFAULT;
  labelScore.innerText = score;

function playerVictory() {
  //set highsocre
  if (score > highscore) {
    highscore = score;
    labelHighscore.innerHTML = highscore;
  }
  //show green bg
  root.style.setProperty('--activeColor', 'var(--colorVictory)');
  guessMessage.innerText = 'You Win !';
  secretNumberDiv.innerText = secretNumber;
}

function playerDefeat() {
  //change colors to defeat and disable inputs
  root.style.setProperty('--activeColor', 'var(--colorDefeat)');
  guessMessage.innerText = 'You lost... Try again !';
  guessInput.setAttribute('disabled', true);
  checkBtn.setAttribute('disabled', true);
  secretNumberDiv.innerText = secretNumber;
}

function checkInput() {
  //reset styling to default in case it was changed
  guessMessage.style.color = 'var(--colorLight)';
  guessInput.style.borderColor = 'var(--colorLight)';
  //change styling if entry isn't a number
  if (guessInput.value === '') {
    guessMessage.innerText = "You didn't enter a number !";
    guessMessage.style.color = 'var(--colorDefeat)';
    guessInput.style.borderColor = 'var(--colorDefeat)';
  } else if (guessInput.value == secretNumber) {
    playerVictory();
  } else {
    //update score
    score -= SCORE_STEP;
    labelScore.innerText = score;

    //check for defeat
    if (score === 0) {
      playerDefeat();
    }
    //Show intell to help find the number
    else if (guessInput.value > secretNumber) {
      guessMessage.innerText = `${guessInput.value} is too high...'`;
      secretNumberDiv.innerText = '↓';
    } else {
      guessMessage.innerText = `${guessInput.value} is too low...`;
      secretNumberDiv.innerText = '↑';
    }
    //Reset input to avoid double send
    guessInput.value = null;
  }
}

function resetGame() {
  //reset score and number
  secretNumber = Math.ceil(Math.random() * 20);
  score = SCORE_DEFAULT;
  labelScore.innerText = score;
  secretNumberDiv.innerText = '?';
  //reset input
  guessInput.value = null;
  //reset bacground
  root.style.setProperty('--activeColor', 'var(--colorDark)');
  //reset disabled in case of loss
  guessInput.removeAttribute('disabled');
  checkBtn.removeAttribute('disabled');
  //reset messenge
  guessMessage.innerText = 'Start guessing...';
}

//EVENT LISTENERS
againBtn.addEventListener('click', resetGame);
checkBtn.addEventListener('click', checkInput);
//on enter we check input too
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkInput();
});
