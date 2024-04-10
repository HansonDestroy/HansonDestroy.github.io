// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid  = [
  [1,0,0,1],
  [0,1,0,1],
  [1,0,0,0],
  [1,1,0,1],
  [1,0,1,1],
  [0,0,0,1]
];

let cell = 50;
const GRID_SIZE = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateRandomGrid(GRID_SIZE,GRID_SIZE);

  cell = height/ grid.length;
  displaygrid();
}


function draw() {
  // background(220);
  displaygrid();
}

function generateRandomGrid(c,r){
  
  grid = [];
  for (let y = 0; y < c; y++){
    let arrayTemp = [];
    for (let x = 0; x < r; x++){
      arrayTemp.push(floor(random(2)));
    }
    grid.push(arrayTemp);
  }
}

function displaygrid(){
  for (let y = 0; y < grid.length; y++){
    for (let x = 0; x < grid[0].length; x++){
      fill(grid[y][x]*1000);
      square(x*cell,y*cell,cell);
    }
  }
}

function mouseReleased(){
  // generateRandomGrid(GRID_SIZE,GRID_SIZE);
  // displaygrid();
  grid[floor(mouseY/cell)][floor(mouseX/cell)] += 1;
  grid[floor(mouseY/cell)][floor(mouseX/cell)] = grid[floor(mouseY/cell)][floor(mouseX/cell)] % 2;
  if(floor(mouseX/cell) - 1 > -1){
    grid[floor(mouseY/cell)][floor(mouseX/cell)-1] += 1;
    grid[floor(mouseY/cell)][floor(mouseX/cell)-1] = grid[floor(mouseY/cell)][floor(mouseX/cell)-1] % 2;
  }
  if(floor(mouseX/cell) + 1 < grid[0].length){
    grid[floor(mouseY/cell)][floor(mouseX/cell)+1] += 1;
    grid[floor(mouseY/cell)][floor(mouseX/cell)+1] = grid[floor(mouseY/cell)][floor(mouseX/cell)+1] % 2;
  }
  if(floor(mouseY/cell) - 1 > -1){
    grid[floor(mouseY/cell)-1][floor(mouseX/cell)] += 1;
    grid[floor(mouseY/cell)-1][floor(mouseX/cell)] = grid[floor(mouseY/cell)-1][floor(mouseX/cell)] % 2;
  }
  if(floor(mouseY/cell) + 1 < grid.length){
    grid[floor(mouseY/cell)+1][floor(mouseX/cell)] += 1;
    grid[floor(mouseY/cell)+1][floor(mouseX/cell)] = grid[floor(mouseY/cell)+1][floor(mouseX/cell)] % 2;
  }
}