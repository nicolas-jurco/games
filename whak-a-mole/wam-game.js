const SIZE = 9;
const GAME_TIME = 15;
let timeLeft = GAME_TIME;
let imagePosition = -1;
let arrBoard = [];
let hits = 0;

document.addEventListener("DOMContentLoaded", () => {
  // console.log("page loaded");
  for (let index = 0; index < SIZE; index++) {
    var element = document.createElement("div");
    element.setAttribute("class", "square");
    element.id = index;
    document.body.getElementsByClassName("grid")[0].appendChild(element);
  }
});

function startGame() {
  setInterval(showImage, 2000);
}

function showImage() {
  // console.log("showing image");
  if (imagePosition != -1) {
    var oldImageElement = document.getElementById(imagePosition);
    oldImageElement.classList.remove("violet");
    oldImageElement.removeEventListener("click", checkHit);
  }

  imagePosition = randomIntFromInterval(0, SIZE - 1);
  // console.log(imagePosition)

  var newImageElement = document.getElementById(imagePosition);
  newImageElement.classList.add("violet");
  newImageElement.addEventListener("click", checkHit);
}

// TODO: stop game when score reaches 0
function checkHit() {
  hits += 1;
  var scoreElement = document.getElementById("score");
  scoreElement.innerText = "Score: " + hits;
  console.log("you hit the target: " + hits);
  this.removeEventListener("click", checkHit);
}

let timerId = setInterval(countDown, 1000);

function countDown() {
  timeLeft--;
  document.getElementById("time-left").textContent = "Time left: " + timeLeft;
  if (timeLeft === 0) {
    if (hits > 5) {
      alert("you WIn");
    } else {
      alert("you lose");
    }
    timeLeft = GAME_TIME;
    clearInterval(timerId);
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

startGame();
