// ! This const have to consider the size of the css .grid
// TODO: change the size of the .grid dinamically depending on these consts
const COLS = 10
const ROWS = 10

let Direction = {
    'Up': -COLS,
    'Down': COLS,
    'Right': 1,
    'Left': -1,
    'Init': 0
}

document.addEventListener("DOMContentLoaded", () => {
    createDivs()
    initGame()
});

// Save all existing elements on const
const btn = document.querySelector("button")
const grid = document.querySelector(".grid")
const span = document.querySelector("span")

let applePosition = 0
let snakePosition = [0,1,2] // 0 index is head, last index is tail
let direction = Direction.Init
let divs = []

// TODO: Create all the divs dinamically
function createDivs(){
    for (let index = 0; index < COLS * ROWS; index++) {
        let element = document.createElement("div")
        element.setAttribute("id", index)
        document.getElementsByClassName("grid")[0].appendChild(element)
    }
}

// Start game configuration
function initGame(params) {
    snakePosition[0] = getRandomIntInclusive(0, COLS * ROWS)
    snakePosition[1] = snakePosition[0] + 1
    snakePosition[2] = snakePosition[1] + 1

    applePosition = getRandomIntInclusive(0, COLS * ROWS)
    
    divs = document.querySelectorAll(".grid div")

    document.getElementById(applePosition).classList.add('apple')

    snakePosition.forEach(element => {
        divs[element].classList.add('snake')
    });
}

// TODO: Snake movement logic
// If key up or down => snake must move COLS size 
// If key left or right => snake must move COLS size 
// for each movement, must check if overflow
function moveSnake(){
    let newSnakePosition = snakePosition[0] + direction
    // TODO: check if snake hits himself
    if(snakePosition.find((element) => element === newSnakePosition)){
        // ? lose the game
        return
    }
    // TODO: check if snake hits with borders
    
    // TODO: check if snake hits apple

    divs[snakePosition[snakePosition.length-1]].classList.remove('snake')
    snakePosition.pop()
    snakePosition.unshift(newSnakePosition)
    divs[snakePosition[0]].classList.add('snake')
}

// TODO: Handle key events

document.addEventListener('keyup', (e) => {
//   console.log(`KeyboardEvent: key='${e.key}' | code='${e.code}'`)
    if (e.code === 'ArrowLeft') {
        direction = Direction.Left
    } else if(e.code === 'ArrowUp'){
        direction = Direction.Up
    } else if(e.code === 'ArrowRight'){
        direction = Direction.Right
    } else if(e.code === 'ArrowDown'){
        direction = Direction.Down
        console.log(direction);
    }
    moveSnake()
})

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }