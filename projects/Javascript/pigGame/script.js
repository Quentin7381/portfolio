"use strict";

const divsScore = [
		document.querySelector("#current--0"),
		document.querySelector("#current--1"),
	],
	divsTotal = [
		document.querySelector("#score--0"),
		document.querySelector("#score--1"),
	],
  divPlayers = [
    document.querySelector('.player--0'),
    document.querySelector('.player--1')
  ],
	imgDice = document.querySelector("img.dice"),
	btnNew = document.querySelector(".btn--new"),
	btnRoll = document.querySelector(".btn--roll"),
	btnHold = document.querySelector(".btn--hold");

  console.log(divsScore);
let scores = [0, 0],
	totals = [0, 0],
	roll = 1,
  playerActive = 0;

function newRoll() {
	roll = Math.ceil(Math.random() * 6);
  setScore(playerActive);
  if(roll === 1){
    hold();
  }
  refreshDisplay();
}

function refreshDisplay(){
  divsScore[0].textContent = scores[0];
  divsScore[1].textContent = scores[1];
  divsTotal[0].textContent = totals[0];
  divsTotal[1].textContent = totals[1];
  imgDice.src = `dice-${roll}.png`;
}

function setScore(player){
  scores[player] = roll === 1 ? 0 : scores[player] + roll;
}

function hold(){
  setTotal(playerActive);
  changePlayer();
  refreshDisplay();
}

function changePlayer(){
  playerActive = (playerActive === 0) ? 1 : 0;
  divPlayers[playerActive].classList.add('player--active');
  divPlayers[ (playerActive === 0) ? 1 : 0].classList.remove('player--active');
}

function setTotal(player) {
  totals[player] += scores[player];
}

function reset(player){
  scores[player] = 0;
  totals[player] = 0;
  divsScore[player] = 0;
}

function resetGame(){
  for(let i = 0; i<2;i++){
    totals[i] = 0;
    scores[i] = 0;
  }
  refreshDisplay();
}

btnRoll.addEventListener('click', newRoll);
btnHold.addEventListener('click', hold);
btnNew.addEventListener('click', resetGame);