// 2D Grid Minesweeper
// Hanson
// Apr 9, 2024

// I beilive I have the most optimal algorism to fill in the 0s
// prompt
// resize the font properly
// switch music

let grid = {
  minePlace: [],
  mineNeighbour: [],
  mineState: [],
};

let hansonScore;
let gridSize;
let promptInput;
let gridCol;
let gridRow;
let mineNumber;
let time;
let colors = ["pink","blue","green","red","purple","brown","aqua","black","grey"];
let toggleStyle = "normal";
let isAutoPlayOn = true;
let gosperGun;
let state = "start screen";
let sizeOfText = 0;
let firstClick = true;
let town;

let canLoad = false;
let megalovania;
let theLoadSoundTime = 100;

function preloadButNo() {
  let promise = new Promise(
    function (resolve, reject) {
      if (canLoad){
        town = loadSound("assets/music/townTheme.mp3");
        megalovania =loadSound("assets/music/Megalovania.mp3");
        print("hello");
        resolve();
      }
      else{
        reject();
      }
    });
  
  promise.then(function () {
    console.log("Success, You are a GEEK");
  }).catch(function () {
    console.log("Some error has occurred");
  });
}


// function loadImage5(url) {
//   return new  Promise(resolve => {
//         const image = new Image();
//         image.addEventListener('load', () => {
//             resolve(image);
//         });
//         image.src = url; 
//     });
// }

// function loadImage(){
//   const canvas = document.getElementById('screen');
//   const context = canvas.getContext('2d');

//   context.fillRect(0,0,50,50);

//   loadImage5('/img/tiles.png')
//   .then(image=>{
//   context.drawImage(image,0,0);  // the function LoadImage returns a Promise with image object(which is  a constant)
//   // as parameter and if the promise is fulfilled then the image is drawn. 
//   });
// }

function setup() {
  //make the canvas the largest square that you can...
  promptInput = prompt("h: hard m: mid, e: easy, c: custum", "h");
  canLoad = true;
  preloadButNo();
  if (promptInput === "h"){
    // hard mode setup
    gridCol = 30;
    gridRow = 16;
    mineNumber = 99;
    hansonScore = 57;
  }
  else if (promptInput === "m"){
    // medium mode setup
    gridCol = 16;
    gridRow = 16;
    mineNumber = 40;
    hansonScore = 21;
  }
  else if (promptInput === "e"){
    // easy mode setup
    gridCol = 9;
    gridRow = 9;
    mineNumber = 10;
    hansonScore = 2;
  }
  else if (promptInput[0] === "c"){
    // custum mode setup
    promptInput = prompt("row");
    gridCol = promptInput;
    promptInput = prompt("col");
    gridRow = promptInput;
    promptInput = prompt("mine");
    mineNumber = promptInput;
    hansonScore = gridCol * gridRow / 16 / 0.3;
  }
  if (windowWidth / gridCol < windowHeight / gridRow) {
    // when it is not wide enough
    createCanvas(windowWidth, windowWidth / gridCol * gridRow);
    gridSize = width / gridCol;
  }
  else {
    // when it is not long enough
    createCanvas(windowHeight / gridRow * gridCol, windowHeight);
    gridSize = height / gridRow;
  }

  //randomizing the grid
  grid.minePlace = generateRandomGrid(gridCol, gridRow, mineNumber);
  //let the state be close initailly
  grid.mineState = generateEmptyGrid(gridCol, gridRow);
  //update neibour array
  grid.minePlace = updateGridNeighbour();

  // adjust the font size to be the same as the gridSize
  for(let size = 10; textWidth("__") < gridSize; size++){
    textSize(size);
    sizeOfText = size;
  }
}

function windowResized() {
  //make the canvas the largest square that you can when it is resized

  if (windowWidth / gridCol < windowHeight / gridRow) {
    createCanvas(windowWidth, windowWidth / gridCol * gridRow);
    gridSize = width / gridCol;
  }
  else {
    createCanvas(windowHeight / gridRow * gridCol, windowHeight);
    gridSize = height / gridRow;
  }

  // adjust the font size to be the same as the gridSize
  for(let size = 10; textWidth("__") < gridSize; size++){
    textSize(size);
    sizeOfText = size;
  }
}

function draw() {
  // start screen
  if (state === "start screen"){
    background(100);
  }
  // display the numbers on the grid
  if (state === "game"){
    displayGrid();
    if (isAutoPlayOn) {
      grid.minePlace = updateGrid();
    }
  }
  // write death
  if (state === "death"){
    background("red");
    textAlign(CENTER,CENTER);
    fill("green");
    text("death", width/2, height/2);
  }
  // write win
  if (state === "win"){
    background("red");
    textAlign(CENTER,CENTER);
    fill("green");
    text("Hanson win: " + hansonScore + " < " + floor(time), width/2, height/2);
  }

}

function keyPressed() {
  if (state === "win"){
    // when key is pressed during win state
    //initialize
    //randomizing the grid
    grid.minePlace = generateRandomGrid(gridCol, gridRow, mineNumber);
    //set the state to close
    grid.mineState = generateEmptyGrid(gridCol, gridRow);
    //update neibour array
    grid.minePlace = updateGridNeighbour();
    state = "game";
    time = millis();
    firstClick = true;
  }
  if (state === "start screen" || state === "death") {
    // when key is pressed during start and death state
    if(state === "start screen"){
      print("music");
      town.jump(0);
      town.play();
      town.setLoop(true);
      time = millis();
    }
    state = "game";
  }
  else{
    // new grid 
    if (key === "r") {
      //if randomizing the grid, do this:
      grid.minePlace = generateRandomGrid(gridCol, gridRow, mineNumber);
      //close initailly
      grid.mineState = generateEmptyGrid(gridCol, gridRow);
      //update neibour array
      grid.minePlace = updateGridNeighbour();
      time = millis();
      firstClick = true;
    }
    // empty grid
    if (key === "e") {
      grid.minePlace = generateEmptyGrid(gridCol, gridRow);
    }
    

    if (key === "n") {
      toggleStyle = "neighbours";
    }

    if (key === "s") {
      toggleStyle = "self";
    }

    if (key === "p") {
      toggleStyle = "normal";
    }

    // god mode mine auto appear
    if (key === " ") {
      for (let y = 0; y < gridRow; y++) {
        for (let x = 0; x < gridCol; x++) {
          if (grid.minePlace[y][x] === 1){
            grid.mineState[y][x] = 1;
          }
        }
      }
    }

    if (key === "a") {
      isAutoPlayOn = !isAutoPlayOn;
    }
  }
}

function updateGridNeighbour() {
  //need a second array, so I don't mess with the grid while counting neighbours
  let neghbourGrid = generateEmptyGrid(gridCol, gridRow);

  //look at every cell
  for (let y = 0; y < gridRow; y++) {
    for (let x = 0; x < gridCol; x++) {
      neghbourGrid[y][x] = 0;

      //don't count yourself in the neighbours
      // neghbourGrid[y][x] -= grid[y][x];

      //look at every cell in a 3x3 grid around the cell
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          //avoid going off the edge of the grid
          if (
            x + j >= 0 &&
            x + j < gridCol &&
            y + i >= 0 &&
            y + i < gridRow
          ) {
            neghbourGrid[y][x] += grid.minePlace[y + i][x + j];
          }
        }
      }

      //apply the rules
      if (grid.minePlace[y][x] === 1) {
        //currently alive
        neghbourGrid[y][x] = -1;
      }
    }
  }
  
  grid.mineNeighbour = structuredClone(neghbourGrid);
  return grid.minePlace;
}

function updateGrid() {
  //display nothing if the state is colsed
  //display the number or mine if the state is open at the right place
  //look at every cell
  let safes = 0;
  for (let y = 0; y < gridRow; y++) {
    for (let x = 0; x < gridCol; x++) {
      //apply the rules
      if (grid.minePlace[y][x] === 1) {
        //currently alive
        if (grid.mineState[y][x] === 1) {
          fill("black");
          textSize(sizeOfText);
          textAlign(CENTER,CENTER);
          text(
            "M",
            (x + 0.5) * gridSize,
            (y + 1 - 0.5) * gridSize
          );
        }
      }
      if (grid.minePlace[y][x] === 0) {
        //currently dead
        if (grid.mineState[y][x] === 1) {
          safes++;
          fill(colors[grid.mineNeighbour[y][x]]);
          textSize(sizeOfText);
          textAlign(CENTER,CENTER);
          text(
            grid.mineNeighbour[y][x],
            (x + 0.5) *  gridSize,
            (y + 1 - 0.5) * gridSize
          );
        }
      }
    }
  }
  // check if the game is over when enough numbers are digged out
  if (gridRow * gridCol - mineNumber === safes){
    state = "win";
    time = (millis() - time) / 1000;
  }
  grid.mineNeighbour = structuredClone(grid.mineNeighbour);
  return grid.minePlace;
}

function mousePressed() {
  if (state === "start screen" || state === "death"){
    // start a new game maby
  }
  if (state === "game"){
    let x = Math.floor(mouseX / gridSize);
    let y = Math.floor(mouseY / gridSize);

    if (toggleStyle === "normal") {
      while (firstClick){
        if (grid.mineNeighbour[y][x] === 0){
          firstClick = false;
        }
        else{
          //if randomizing the grid, do this:
          grid.minePlace = generateRandomGrid(gridCol, gridRow, mineNumber);
          //close initailly
          grid.mineState = generateEmptyGrid(gridCol, gridRow);
          //update neibour array
          grid.minePlace = updateGridNeighbour();
        }
      }

      // if step on mine and mine is closed die
      if (grid.minePlace[y][x] === 1 && grid.mineState[y][x] === 0){
        state = "death";
      }

      // if 0 then auto fill
      if (grid.mineNeighbour[y][x] === 0){
        autofillZero(y,x);
      }

      // fill the cell
      grid.mineState[y][x] = 1;
    }
    else {
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
  }
}

function autofillZero(y,x){
  // if the grid is  in range or if it is aready filled then exit the function and if the grid is not filled then fill it
  if(x < gridCol && y < gridRow && x >= 0 && y >= 0){
    if(grid.mineState[y][x] === 1){
      return 0;
    }
    if(grid.mineNeighbour[y][x] === 0){
      grid.mineState[y][x] = 1;
    }
    else{
      grid.mineState[y][x] = 1;
      return 0;
    }
    // fill the grid around it
    autofillZero(y+1,x+1);
    autofillZero(y+1,x);
    autofillZero(y+1,x-1);
    autofillZero(y,x+1);
    autofillZero(y,x-1);
    autofillZero(y-1,x+1);
    autofillZero(y-1,x);
    autofillZero(y-1,x-1);
  }
}

function toggleCell(x, y) {
  // make sure the cell you're toggling is in the grid...
  if (x < gridCol && y < gridRow && x >= 0 && y >= 0) {
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
        fill("white");
        // if the state is open the fill white but I might change this later
      }
      else {
        fill("white");
        // if the state is closed the fill white
      }
      square(x * gridSize, y * gridSize, gridSize);
    }
  }
}

function generateRandomGrid(cols, rows, mineNumber) {
  // fist have a empty grid
  let emptyArray = generateEmptyGrid(cols, rows);

  // make sure it is possible
  if (rows * cols < mineNumber) {
    return emptyArray;
  }

  // randomly but mines in if possible
  for (let mine = 0; mine < mineNumber; mine++) {
    let shouldRepeat = true;
    while (shouldRepeat) {
      let x = floor(random(cols));
      let y = floor(random(rows));
      if (emptyArray[y][x] === 0) {
        emptyArray[y][x] = 1;
        shouldRepeat = false;
      }
    }
  }

  return emptyArray;
}

function generateEmptyGrid(cols, rows) {
  //create empty matrix
  let emptyArray = [];
  for (let y = 0; y < rows; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}