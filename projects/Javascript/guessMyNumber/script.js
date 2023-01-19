'use strict';

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
//                                 INITIALISATION                                    //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////

// ----- ////// DOM SELECTORS ////// ------ //

const againBtn = document.querySelector('.btn.again'),
  checkBtn = document.querySelector('.btn.check'),
  guessInput = document.querySelector('input.guess'),
  guessMessage = document.querySelector('p.message'),
  labelScore = document.querySelector('span.score'),
  labelHighscore = document.querySelector('span.highscore'),
  secretNumberDiv = document.querySelector('div.number'),
  root = document.querySelector(':root');

// ----- ////// DATA ////// ------ //

const SCORE_DEFAULT = 500,
  SCORE_STEP = 50,
  MAX_SECRET_NUMBER = 20;

let secretNumber,
  score,
  highscore = 0;

updateScore('reset');
rollSecretNumber();

// ----- ////// EVENT LISTENERS ////// ------ //

againBtn.addEventListener('click', resetGame);
checkBtn.addEventListener('click', checkInput);
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') checkInput();
});

///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
//                                 FUNCTIONS                                         //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////

// ----- ////// DISPLAY MANAGEMENT ////// ------ //

/**
 * display the message in the 'message' paragraph
 * @param {*} message the message to display
 */
function displayOnMessage(message) {
  guessMessage.innerText = message;
}

/**
 * display the message in place of the 'secretNumber' square
 * @param {*} message the message to display
 */
function displayOnSecretNumber(message) {
  secretNumberDiv.innerText = message;
}

/**
 * Refreshes the score and highscore display
 */
function displayScores() {
  labelScore.innerText = score;
  labelHighscore.innerText = highscore;
}

/**
 * Changes the background colors of the game
 * @param {String} colorName must be one of CSS :root's variable colors, without '--color'
 */
function changePageColor(colorName) {
  root.style.setProperty('--activeColor', `var(--color${colorName})`);
}

/**
 * Changes some colors and display an error to the user on the input
 * @param {Boolean} display true to display, false to reset
 */
function displayInputError(display) {
  if (display) {
    guessMessage.style.color = 'var(--colorDefeat)';
    guessInput.style.borderColor = 'var(--colorDefeat)';
    displayOnMessage("You didn't enter a number !");
  } else {
    guessMessage.style.color = 'var(--colorLight)';
    guessInput.style.borderColor = 'var(--colorLight)';
  }
}

/**
 * Allows or disalows input and check usage
 * @param {Boolean} allow true to allow, false to disallow
 */
function allowInputs(allow) {
  if (allow) {
    guessInput.removeAttribute('disabled');
    checkBtn.removeAttribute('disabled');
  } else {
    guessInput.setAttribute('disabled', true);
    checkBtn.setAttribute('disabled', true);
  }
}

// ----- ////// NUMBERS MANAGEMENT ////// ------ //

/**
 * Updates score depending on given parameter
 * @param {String} type 'reset' to reset | 'decrease' to decrease
 */
function updateScore(type) {
  switch (type) {
    case 'reset':
      score = SCORE_DEFAULT;
      break;
    case 'decrease':
      score -= SCORE_STEP;
  }
  displayScores();
}

/**
 * Rolls a new secretNumber
 * @param {Number} max the max value allowed
 */
function rollSecretNumber(max) {
  secretNumber = Math.ceil(Math.random() * MAX_SECRET_NUMBER);
}

/**
 * Updates highscore if the actual score beats it
 */
function updateHighScore() {
  if (score > highscore) {
    highscore = score;
    displayScores();
  }
}

/**
 * Resets the input field
 */
function resetInput() {
  guessInput.value = null;
}

// ----- ////// GAMEPLAY ////// ------ //

/**
 * Compare the input to the secretNumber and acts accordingly
 */
function checkInput() {
  //Reset input error in case it was displayed
  displayInputError(false);
  //If input invalid display input error
  if (guessInput.value === '') {
    displayInputError(true);
    //If right value players wins
  } else if (guessInput.value == secretNumber) {
    playerVictory();
    //If wrong value score decreases
  } else {
    updateScore('decrease');
    //If score null player loses
    if (score === 0) {
      playerDefeat();
      //Else give a hint depending on score
      displayOnMessage(
        `${guessInput.value} is too ${
          guessInput.value > secretNumber ? 'high' : 'low'
        }...'`
      );
      displayOnSecretNumber(`${guessInput.value > secretNumber ? '↓' : '↑'}`);
      //Reset input to avoid double entry
      resetInput();
    }
  }
}

/**
 * Change display to show victory
 */
function playerVictory() {
  updateHighScore();
  changePageColor('Victory');
  displayOnMessage('You win !');
  displayOnSecretNumber(secretNumber);
}

/**
 * Change display to show defeat
 */
function playerDefeat() {
  changePageColor('Defeat');
  displayOnMessage('You lost... Try again !');
  allowInputs(false);
  displayOnSecretNumber(secretNumber);
}

/**
 * Does what it says ^^
 */
function resetGame() {
  rollSecretNumber();
  updateScore('reset');
  displayOnMessage('Start guessing...');
  displayOnSecretNumber('?');
  changePageColor('Dark');
  resetInput();
  allowInputs(true);
}
