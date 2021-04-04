
// TODO: Change size depending on css style
const SIZE = 168; //DIMENSION_COL * DIMENSION_ROW
const grid = document.querySelectorAll(".grid")[0];

let turns = 0;

let right_limits = [];
let left_limits = [];
let upper_limits = [];
let lower_limits = [];

// console.log(squares);
for (let index = 1; index <= SIZE; index++) {
  var newDiv = document.createElement("div");
  newDiv.id = index;
  newDiv.onclick = played;
  grid.appendChild(newDiv);
}

const DIMENSION_COL =
  document.querySelectorAll(".grid")[0].scrollWidth /
  document.querySelectorAll(".grid div")[0].scrollWidth;
const DIMENSION_ROW =
  document.querySelectorAll(".grid")[0].scrollHeight /
  document.querySelectorAll(".grid div")[0].scrollHeight;

const Direction = {
  Up: -DIMENSION_COL,
  Down: DIMENSION_COL,
  Left: -1,
  Right: 1,
};

function played() {
  turns++;
  if (turns % 2 === 0) {
    this.classList.add("player-two");
  } else {
    this.classList.add("player-one");
  }
  if (checkIfSomeWinner(this)) alert("win");
}

function checkIfSomeWinner(context) {
  let count = 4;
  for (const key in Direction) {
    console.log("checking " + key + " for id " + context.id);
    console.log(checkOverflow(context.id, count, Direction[key]));
    if (
      !checkOverflow(context.id, count, Direction[key]) &&
      checkLimits(context.classList[0], context.id, count, Direction[key])
    )
      return true;
  }
  console.log("done checking");
}

function checkOverflow(id, count, direction) {
  let overflow = false;
  let intId = parseInt(id);
  let last_id = intId + (count - 1) * direction;

  let row_position = (intId - 1) % DIMENSION_COL;
  let col_position = (intId - 1 - row_position) / DIMENSION_COL;

  if (direction === Direction.Down) {
    console.log(
      "last id " + last_id + " limit to compare " + lower_limits[row_position]
    );
    return lower_limits[row_position] < last_id;
  } else if (direction === Direction.Up) {
    // console.log("last id " + last_id + " limit to compare " + upper_limits[row_position])
    return upper_limits[row_position] > last_id;
  } else if (direction === Direction.Right) {
    // console.log("last id " + last_id + " limit to compare " + right_limits[col_position])
    return right_limits[col_position] < last_id;
  } else if (direction === Direction.Left) {
    // console.log("last id " + last_id + " limit to compare " + left_limits[col_position])
    return left_limits[col_position] > last_id;
  }

  if (overflow) {
    console.log("there is an overflow");
    return overflow;
  } else {
    return false;
  }
}

function checkLimits(player_color, id, count, direction) {
  // console.log("id " + id + " count " + count + " color " + document.getElementById(id).classList.contains(player_color) + " " + document.getElementById(id).classList);
  let nextId = parseInt(id) + direction;
  let bResult;

  if (--count > 0)
    bResult = checkLimits(player_color, nextId, count, direction);
  return bResult === false
    ? false
    : document.getElementById(id).classList.contains(player_color);
}

function calculateLimits() {
  for (let index = 0; index < SIZE / DIMENSION_COL; index++) {
    right_limits.push((index + 1) * DIMENSION_COL);
    left_limits.push(index * DIMENSION_COL + 1);
  }
  for (let index = 0; index < SIZE / DIMENSION_ROW; index++) {
    upper_limits.push(index + 1);
    lower_limits.push(SIZE - index);
  }
  lower_limits = lower_limits.sort((a, b) => a > b);

  // console.log(right_limits);
  // console.log(left_limits);
  // console.log(upper_limits);
  // console.log(lower_limits);
}

calculateLimits();
