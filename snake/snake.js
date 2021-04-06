// ! This const have to consider the size of the css .grid
// TODO: change the size of the .grid dinamically depending on these consts
// TODO: add start/restart button functionallity
// TODO: add score functionallity
const COLS = 10
const ROWS = 10
const SPEED = 0.2
let interval = 0

let upper_limits = []
let bottom_limits = []
let right_limits = []
let left_limits = []

let Direction = {
    'Up': -COLS,
    'Down': COLS,
    'Right': 1,
    'Left': -1,
    'Init': 0
}

document.addEventListener("DOMContentLoaded", () => {
    for (let index = 0; index < COLS * ROWS; index++) {
        let element = document.createElement("div")
        element.setAttribute("id", index)
        document.getElementsByClassName("grid")[0].appendChild(element)
    }
    calculateLimits()
    startGame()
});

// Save all existing elements on const
const btn = document.querySelector("button")
const grid = document.querySelector(".grid")
const span = document.querySelector("span")

let applePosition = 0
let snakePosition = [0,1,2] // 0 index is head, last index is tail
let direction = Direction.Init
let divs = []

// Start game configuration
function startGame() {
    clearInterval(interval)
    let intervalTime = 1000
    newSnakePosition = []
    applePosition = 0
    snakePosition = [0,1,2] // 0 index is head, last index is tail
    direction = Direction.Init
    divs.forEach((element) => {
        element.classList = []
    })

    // TODO: check that when initializing snake, it is on same row
    snakePosition[0] = getRandomIntInclusive(0, COLS * ROWS)
    snakePosition[1] = snakePosition[0] + 1
    snakePosition[2] = snakePosition[1] + 1

    newApple()

    divs = document.querySelectorAll(".grid div")
    
    snakePosition.forEach(element => {
        divs[element].classList.add('snake')
    });

    intervalTime = intervalTime * SPEED
    console.log("interval time : " + intervalTime)
    interval = setInterval(moveSnake, intervalTime)

}

// TODO: Snake movement logic
// If key up or down => snake must move COLS size 
// If key left or right => snake must move COLS size 
// for each movement, must check if overflow
function moveSnake(){
    if(direction === Direction.Init)
        return
    let newSnakePosition = snakePosition[0] + direction
    // TODO: check if snake hits himself
    if(snakePosition.find((element) => element === newSnakePosition)
        || direction === Direction.Up && upper_limits.includes(snakePosition[0])
        || direction === Direction.Down && bottom_limits.includes(snakePosition[0])
        || direction === Direction.Right && right_limits.includes(snakePosition[0])
        || direction === Direction.Left && left_limits.includes(snakePosition[0])
    ){
        alert('you lost')
        startGame()
        return
    }
    // TODO: check if snake hits apple
    if(newSnakePosition !== applePosition){
        divs[snakePosition[snakePosition.length-1]].classList.remove('snake')
        snakePosition.pop()
    }else{
        document.getElementById(applePosition).classList.remove('apple')
        newApple()
    }
    divs[snakePosition[0]].classList.remove('snakehead') // remove the head class
    divs[snakePosition[0]].classList.add('snake') 
    snakePosition.unshift(newSnakePosition)
    divs[snakePosition[0]].classList.add('snakehead')
}

// TODO: Handle key events

document.addEventListener('keyup', (e) => {
//   console.log(`KeyboardEvent: key='${e.key}' | code='${e.code}'`)
    // !doesnt allow to change direction if already moving to oposite direction
    if (e.code === 'ArrowLeft' && direction !== Direction.Right){
        direction = Direction.Left
    } else if(e.code === 'ArrowUp' && direction !== Direction.Down){
        direction = Direction.Up
    } else if(e.code === 'ArrowRight' && direction !== Direction.Left){
        direction = Direction.Right
    } else if(e.code === 'ArrowDown' && direction !== Direction.Up){
        direction = Direction.Down
        console.log(direction);
    }
})

btn.addEventListener('click', () => {
    startGame()
})
function newApple() {
    applePosition = getRandomIntInclusive(0, COLS * ROWS)
    let element = document.getElementById(applePosition)
    if(element.classList.contains('snake') || element.classList.contains('snakehead')){
        newApple()
        return
    }
    element.classList.add('apple')
}

function calculateLimits() {
    for (let i = 0; i < COLS; i++) {
        upper_limits.push(i)
        bottom_limits.push((COLS * ROWS) - i - 1)
        left_limits.push(i * ROWS)
        right_limits.push(COLS + (ROWS * i) - 1)    
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }