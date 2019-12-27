window.addEventListener("load", init);
const seconds = document.querySelector("#seconds");
//Globals
let time = seconds.value;
let score = 0;
let isPlaying;

const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const hs = document.querySelector("#hs");

const words = [
  "Weidar",
  "Dorelle",
  "Humbert",
  "Fifi",
  "Jade",
  "Rodrique",
  "Rutger",
  "Wallis",
  "Cody",
  "Melisande",
  "Karissa",
  "Hilary",
  "Olly",
  "Agnella",
  "Wilfrid",
  "Minna",
  "Leyla",
  "Kerby",
  "Teodorico",
  "Alikee",
  "Ingaborg"
];

//Initialize Game

function init() {
  //Load HighScore
  var hsValue = document.cookie.split("=");
  console.log(hsValue);
  if (document.cookie == "") {
    hs.innerHTML = "00";
  } else {
    hs.innerHTML = hsValue[1];
  }
  //Load word from array
  showWord(words);
  // Start Matching on Word Input
  wordInput.addEventListener("input", startMatch);
  //Call countdown every second
  setInterval(countdown, 1000);
  //Check Game Status
  setInterval(checkStatus, 50);
}

//Start Match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = parseInt(seconds.value) + 1;
    showWord(words);
    wordInput.value = "";
    score++;
  }
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

//Pick & show random word
function showWord(words) {
  //Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  //Output random word
  currentWord.innerHTML = words[randIndex];
}

//Countdown timer
function countdown() {
  //Make sure time is not run out
  if (time > 0) {
    //Decrement
    time--;
  } else if (time === 0) {
    //Game is over
    isPlaying = false;
    if (score > hs.innerHTML) {
      hs.innerHTML = score;
      document.cookie = `HighScore=${score}`;
    }
  }
  //Show Time
  timeDisplay.innerHTML = time;
}

//Check Game Status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = "Game Over";
    score = -1;
  }
}
