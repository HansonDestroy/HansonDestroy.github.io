// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ball;
let ballArray = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBall(width/2,height/2);
}

function draw() {
  background(220);
  displayBall();
  moveBall();
  spawnBall(mouseX,mouseY);
}

function mousePressed(){
  spawnBall(mouseX,mouseY);
}

function moveBall(){
  for (let ball of ballArray){
    // move
    ball.x += ball.dx;
    ball.y += ball.dy;
    // teleport
    if (ball.x < 0){
      ball.x = width;
    }
    if (ball.x > width){
      ball.x = 0;
    }
    if (ball.y < 0){
      ball.y = height;
    }
    if (ball.y > height){
      ball.y = 0;
    }
  }
}

function displayBall(){
  for (let ball of ballArray){
    fill(ball.color);
    circle(ball.x,ball.y,2*ball.radius);
  }
}

function spawnBall(initialX, initalY){
  ball = {
    x: initialX,
    y: initalY,
    radius: random(15,30),
    color: color(random(255),random(255),random(255)),
    dx: random(-5,5),
    dy: random(-5,5),
  };
  if (ballArray.length > 100){
    ballArray.pop(0);
  }
  ballArray.push(ball);
}