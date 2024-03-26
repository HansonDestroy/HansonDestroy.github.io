// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theBubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  for (let i = 0; i < 5; i++){
    spawnBubble();
  }
  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(10000);
  displayBubbles();
  // moveBubblesRandomly();
  moveBubblesWithNoise();
}

function moveBubblesWithNoise(){
  for (let bubble of theBubbles) {
    let x = noise(bubble.timeX) * width;
    let y = noise(bubble.timeY) * height;

    bubble.x = x;
    bubble.y = y;

    bubble.timeX = bubble.dealtatime;
    bubble.timeY = bubble.dealtatime;
  }
  
}

function displayBubbles(){
  for (let bubble of theBubbles){
    fill(bubble.r, bubble.y, bubble.g, bubble.alpha);
    circle(bubble.x, bubble.y, bubble.size);
  }
}

function moveBubblesRandomly() {
  for (let bubble of theBubbles){
    let choice = random(100);
    if (choice < 25){
      bubble.y -= bubble.speed;
    }
    else if (choice < 50){
      bubble.y += bubble.speed;
    }
    else if (choice < 75){
      bubble.x += bubble.speed;
    }
    else{
      bubble.x -= bubble.speed;
    }

  }
}

function spawnBubble() {
  let someBubble = {
    size: random(10,30),
    x: random(width),
    y: random(height),
    speed: 3,
    r: random(255),
    g: random(255),
    b: random(255),
    alpha: random(255),
    timeX: random(100000),
    timeY: random(100000),
    dealtatime: 0.01
  };
  theBubbles.push(someBubble);
}


function mousePressed(){
  for (let i = theBubbles.length - 1; i > -1; i--){
    if (clickedInBubble(mouseX,mouseY,theBubbles[i])){
      theBubbles.splice(i,1);
    }
  }
}

function clickedInBubble(x, y, someBubble){
  let distanceAway = dist(x, y, someBubble.x, someBubble.y);
  let radius = someBubble.size/2;
  return distanceAway < radius;
}