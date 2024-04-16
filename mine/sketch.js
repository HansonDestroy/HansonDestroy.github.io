// 2D Grid
// Dan Schellenberg
// Apr 9, 2024

// if you are hard-coding a level, I'd use something like this

// let grid = [[1, 0, 0, 1],
//             [0, 1, 0, 1],
//             [1, 1, 0, 0],
//             [1, 0, 1, 1],
//             [0, 0, 0, 1],
//             [0, 0, 1, 1],
//             [0, 1, 0, 1],
//             [0, 0, 0, 1]];

let grid;
let cellSize;
const GRID_SIZE = 5;
let toggleStyle = "self";
let bgm;
let state = "start";

function preload(){
  bgm = loadSound("TownTheme.mp3");
}

function setup() {
  //make the canvas the largest square that you can...
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }

  //if randomizing the grid, do this:
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  
  //this is dumb -- should check if this is the right size!
  cellSize = height/grid.length;

  bgm.setVolume(1.0);
}

function windowResized() {
  //make the canvas the largest square that you can...
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }

  cellSize = height/grid.length;
}

function draw() {
  if (state === "start"){
    background(0);
  }
  else{
    background(220);
    displayGrid();
    if((frameCount % 5 === 4)){
      upDateGrid();
    }
  }
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }

  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }

  if (key === "n") {
    toggleStyle = "neighbours";
  }

  if (key === "s") {
    toggleStyle = "self";
  }

  if (key === "p"){
    upDateGrid();
  }
  if (state === "start"){
    state = "game";
    bgm.play();
  }
}

function upDateGrid(){
  // let nextTurn = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  let nextTurn = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  for(let y = 0; y < GRID_SIZE; y++){
    for(let x = 0; x < GRID_SIZE; x++){

      nextTurn[y][x] = 0 - grid[y][x];

      // for(let i = -1; i < 2; i++){
      //   for(let j = -1; j < 2; j++){
      //     if(y + i < GRID_SIZE && y + i > 0 && x + j < GRID_SIZE && x + j > 0){
      //       nextTurn[y][x] += grid[y+i,x+j];
      //     }
      //   }
      // }

      print(nextTurn,grid,y,x,grid[y][x])

      if (grid[y][x] === 1){
        if(nextTurn[y][x] === 3 || nextTurn[y][x] === 2){
          nextTurn[y][x] = 1;
        }
        else{
          nextTurn[y][x] = 0;
        }
      }
      else{
        if(nextTurn[y][x] === 3){
          nextTurn[y][x] = 1;
        }
        else{
          nextTurn[y][x] = 0;
        }
      }

    }
  }

  
  // grid = structuredClone(nextTurn);



}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  //toggle self
  toggleCell(x, y);

  // and NESW neighbours, if style is set to neighbours
  if (toggleStyle === "neighbours") {
    toggleCell(x + 1, y);
    toggleCell(x - 1, y);
    toggleCell(x, y + 1);
    toggleCell(x, y - 1);
  }
}

function toggleCell(x, y) {
  // make sure the cell you're toggling is in the grid...
  if (x < GRID_SIZE && y < GRID_SIZE &&
      x >= 0 && y >= 0) {
    //toggle the color of the cell
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else {
      grid[y][x] = 0;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 1) {
        fill("black");
      }
      else {
        fill("white");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let emptyArray = [];
  for (let y = 0; y < rows; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      //half the time, be a 1. Other half, be a 0.
      if (random(100) < 50) {
        emptyArray[y].push(0);
      }
      else {
        emptyArray[y].push(1);
      }
    }
  }
  return emptyArray;
}

function generateEmptyGrid(cols, rows) {
  let emptyArray = [];
  for (let y = 0; y < rows; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}