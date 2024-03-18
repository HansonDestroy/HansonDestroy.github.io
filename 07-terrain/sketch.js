// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let terrain = [];
let numberOfRect = 0;
let widthRect = 0;
let time;

function setup() {
  createCanvas(windowWidth, windowHeight);
  numberOfRect = width/1;
  widthRect = width / numberOfRect;
  generateTerrain();
}

function draw() {
  time += 0.01;
  background(220);
  for (let someRect of terrain){
    rect(someRect.x,someRect.y,someRect.w,someRect.h);
  }
}

function spawnRect(leftSide, rectHeight){
  let thisRect = {
    x: leftSide,
    y: height-rectHeight,
    w: widthRect,
    h: rectHeight
  };
  terrain.push(thisRect);
}

function generateTerrain(){
  let time = 0;
  let deltaTime = 0.01;

  for (let i = 0; i < width; i += widthRect){
    time += deltaTime;
    spawnRect(i,height*noise(time));
  }
    
}