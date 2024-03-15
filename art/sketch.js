// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let tileSize = 25;
let someTile;
let theTile = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let x = 0; x < width; x += tileSize){
    for(let y = 0; y < height; y += tileSize){ 
      someTile = spawnTile(x,y);
      theTile.push(someTile);
    }
  }
}

function draw() {
  background(220);
  for(someTile of theTile){
    line(someTile.x1,someTile.y1,someTile.x2,someTile.y2);
  }
}

function spawnTile(x,y){
  let choice = random(100);
  let tile;

  if(choice > 50){
    tile = {
      x1: x - tileSize/2,
      y1: y - tileSize/2,
      x2: x + tileSize/2,
      y2: y + tileSize/2,
    };
  }
  else{
    tile = {
      x1: x - tileSize/2,
      y1: y + tileSize/2,
      x2: x + tileSize/2,
      y2: y - tileSize/2,
    };
  }

  return tile;
}