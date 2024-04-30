// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Walker {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.stepSize = 10;
    this.color = "red";
    this.radius = 5;
  }

  display() {
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  move() {
    let choice = random(100);
    if (choice < 25){
      this.y -= this.stepSize;
    }
    else if (choice < 50){
      this.y += this.stepSize;
    }
    else if (choice < 75){
      this.x -= this.stepSize;
    }
    else {
      this.x += this.stepSize;
    }
  }
}

let maram;
let griffin;

function setup() {
  createCanvas(windowWidth, windowHeight);
  maram = new Walker(width/2,height/2);
  griffin = new Walker(width/2,height/2);
  griffin.color = "green";
}

function draw() {
  maram.move();
  maram.display();
  griffin.move();
  griffin.display();
}
