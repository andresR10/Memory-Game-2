document.addEventListener('DOMContentLoaded', function () {

const gameContainer = document.getElementById("game");
const startButton = document.getElementById('start-button');
const timerDisplay = document.getElementById('timer-display');
let cardOne = null;
let cardTwo = null;
let = cardsFlipped = 0;
let noClicking = false;
let timer;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

startButton.addEventListener('click', startGame);
function startGame () {
  startButton.disabled = true;
  let timeCount = 0;

  timer = setInterval(function() {
    timeCount++;
    timerDisplay.innerHTML = `Time is ticking : ${timeCount} seconds`;

    if (gameFinished()) {
      clearInterval(timer);
    }
  }, 1000);
}

function gameFinished(){
  if (cardsFlipped === COLORS.length){
    return true;
  } else {
    return false;
  }
}


function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");  
    newDiv.classList.add(color);
    newDiv.addEventListener('click', handleCardClick);
    gameContainer.append(newDiv);
  }
}


function handleCardClick(event) {
  if(noClicking) return;
  if (event.target.classList.contains('flipped')) return;

  let chosenCard = event.target;
  chosenCard.style.backgroundColor = chosenCard.classList[0];

  if (!cardOne || !cardTwo) {
    chosenCard.classList.add('flipped');
    cardOne = cardOne || chosenCard;
    cardTwo = chosenCard === cardOne ? null : chosenCard;
  }

  if (cardOne && cardTwo) {
    noClicking = true;

    let gif1 = cardOne.className;
    let gif2 = cardTwo.className;

    if (gif1 === gif2) {
      cardsFlipped += 2;
      cardOne.removeEventListener('click', handleCardClick);
      cardTwo.removeEventListener('click', handleCardClick);
      cardOne = null;
      cardTwo = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        cardOne.style.backgroundColor = '';
        cardTwo.style.backgroundColor = '';
        cardOne.classList.remove('flipped');
        cardTwo.classList.remove('flipped');
        cardOne = null;
        cardTwo = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (cardsFlipped === COLORS.length) alert("You matched them all!");
}

createDivsForColors(shuffledColors); 

})