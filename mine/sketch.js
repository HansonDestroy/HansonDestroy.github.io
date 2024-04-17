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

let grid = {
  minePlace: [],
  mineNeighbour: [],
  mineState: [],
};
let cellSize;
let gridSize = 5;
let mineNumber = 3;
let toggleStyle = "self";
let isAutoPlayOn = false;
let gosperGun;


function preload(){
  // gosperGun = loadJSON("gosper.json");
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
  grid.minePlace = generateRandomGrid(gridSize, gridSize, mineNumber);
  
  //close initailly
  grid.mineState = generateEmptyGrid(gridSize, gridSize);
  //this is dumb -- should check if this is the right size!
  cellSize = height/grid.minePlace.length;
}

function windowResized() {
  //make the canvas the largest square that you can...
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }

  cellSize = height/grid.minePlace.length;
}

function draw() {

  displayGrid();
  
  if (isAutoPlayOn) {
    grid.minePlace = updateGrid();
  }

}

function keyPressed() {
  if (key === "r") {
    grid.minePlace = generateRandomGrid(gridSize, gridSize, mineNumber);
  }

  if (key === "e") {
    grid.minePlace = generateEmptyGrid(gridSize, gridSize);
  }

  if (key === "n") {
    toggleStyle = "neighbours";
  }

  if (key === "s") {
    toggleStyle = "self";
  }

  if (key === " ") {
    grid.minePlace = updateGrid();
  }

  if (key === "a") {
    isAutoPlayOn = !isAutoPlayOn;
  }
}

function updateGrid() {
  //need a second array, so I don't mess with the grid while counting neighbours
  let neghbourGrid = generateEmptyGrid(gridSize, gridSize);

  //look at every cell
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      neghbourGrid[y][x] = 0;
      
      //don't count yourself in the neighbours
      // neghbourGrid[y][x] -= grid[y][x];

      //look at every cell in a 3x3 grid around the cell
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          //avoid going off the edge of the grid
          if (x+j >= 0 && x+j < gridSize && y+i >= 0 && y+i < gridSize) {
            neghbourGrid[y][x] += grid.minePlace[y + i][x + j];
          }
        }
      }
      
      //apply the rules
      if (grid.minePlace[y][x] === 1) { //currently alive
        neghbourGrid[y][x] = -1;
        if (grid.mineState[y][x] === 0){
          fill("red");
          textSize(20);
          text(neghbourGrid[y][x], x * height / gridSize, (y+1) * height / gridSize);
        }

      }


      if (grid.minePlace[y][x] === 0) { //currently dead
        if (grid.mineState[y][x] === 0){
          fill("blue ");
          textSize(20);
          text(neghbourGrid[y][x], x * height / gridSize, (y+1) * height / gridSize);
        }
      }
        
    }
  }

  grid.mineNeighbour = structuredClone(neghbourGrid);
  return grid.minePlace;
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
  if (x < gridSize && y < gridSize &&
      x >= 0 && y >= 0) {
    //toggle the color of the cell
    if (grid.minePlace[y][x] === 0) {
      grid.minePlace[y][x] = 1;
    }
    else {
      grid.minePlace[y][x] = 0;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < grid.minePlace.length; y++) {
    for (let x = 0; x < grid.minePlace[y].length; x++) {
      if (grid.minePlace[y][x] === 1) {
        fill("black");
      }
      else {
        fill("white");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function generateRandomGrid(cols, rows, mineNumber) {
  let emptyArray = generateEmptyGrid(cols, rows);

  if (rows * cols < mineNumber){
    return emptyArray;
  }

  for (let mine = 0; mine < mineNumber; mine++){
    let shouldRepeat = true;
    while(shouldRepeat){
      let x = floor(random(rows));
      let y = floor(random(cols));
      if (emptyArray[y][x] === 0){
        emptyArray[y][x] = 1;
        shouldRepeat = false;
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