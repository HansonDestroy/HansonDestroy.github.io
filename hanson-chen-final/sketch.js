// Final
// Hanson

class Ball{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.dx = random(1,5);
    this.dy = random(1,5);
    this.r = random(10,20);
  }
  
  // move
  move(){

    // bounce if have to
    if(this.x >= width || this.x <= 0){
      this.dx = -this.dx;
    }
    if(this.y >= height || this.y <= 0){
      this.dy = -this.dy;
    }

    // move
    this.x += this.dx;
    this.y += this.dy;
  }

  // display
  display(){
    fill("red");
    circle(this.x, this.y, this.r * 2);
  }

  // take in postion return true if it is inside the ball else return false
  checkIfPointInsideBall(x, y){
    return dist(x,y,this.x,this.y) < this.r;
  }
}

let arrayAllBalls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i < 5; i++){
    addBalls();
  }
}

function draw() {
  background(220);
  for(let ball of arrayAllBalls){
    ball.move();
    ball.display();
  }
}

function keyTyped() {
  addBalls();
}

function mousePressed() {
  for(let i = 0; i < arrayAllBalls.length; i++){
    // go through every element
    let ball = arrayAllBalls[i];
    if(ball.checkIfPointInsideBall(mouseX,mouseY)){
      // if ball is click then spliced it
      arrayAllBalls.splice(i,1);
      i--;
    }
  }
}

// add a ball to array
function addBalls() {
  let ball = new Ball(random(0,width),random(0,height));
  arrayAllBalls.push(ball);
}