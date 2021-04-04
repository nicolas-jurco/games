document.addEventListener("DOMContentLoaded", () => {
  createBoard();
});

let arrCardImages = [
  {
    name: "blue",
    image: "images/blue.png",
  },
  {
    name: "red",
    image: "images/red.png",
  },
  {
    name: "green",
    image: "images/green.png",
  },
  {
    name: "orange",
    image: "images/orange.png",
  },
  {
    name: "violet",
    image: "images/violet.png",
  },
  {
    name: "grey",
    image: "images/grey.png",
  },
];

let arrForBoardCards = arrCardImages
  .concat(arrCardImages)
  .sort(() => 0.5 - Math.random());

console.log(0.5 - Math.random());
console.log(arrForBoardCards);

let arrWinnerCards = [];

let arrChoosenCards = [];

const boardDiv = document.getElementsByClassName("grid")[0];

function createBoard() {
  boardDiv.innerHTML = "";
  for (let index = 0; index < arrForBoardCards.length; index++) {
    var card = arrForBoardCards[index];
    var image = document.createElement("img");
    image.setAttribute("src", "images/white.png");
    image.setAttribute("id", card.name);
    image.style.cssText = "object-fit:none;";
    image.addEventListener("click", flipCard);
    boardDiv.appendChild(image);
  }
}

function flipCard() {
  console.log(this.id);
  arrChoosenCards.push(this.id);
  this.setAttribute(
    "src",
    arrCardImages.find((arr) => arr.name === this.id).image
  );
  if (arrChoosenCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  if (arrChoosenCards[0] === arrChoosenCards[1]) {
    alert("win");
    console.log("win");
  } else {
    alert("loss");
    console.log("loss");
    let reWhiteCards = document.querySelectorAll(
      "img#" + arrChoosenCards[0] + ",img#" + arrChoosenCards[1]
    );
    reWhiteCards.forEach((element) => {
      element.setAttribute("src", "images/white.png");
    });
  }
  arrChoosenCards = [];
}
