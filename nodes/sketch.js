// Connected Nodes OOP Demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  for (let somePoint of points){
    somePoint.display();
    somePoint.update();
  }
}

function mousePressed(){
  let somePoint = new MovingPoint();
  somePoint.x = mouseX;
  somePoint.y = mouseY;
  points.push(somePoint);
}

class MovingPoint {
  constructor(){
    this.radius = 15;
    this.speed = 5;
    this.reach = 109;
    this.maxRadius = 50;
    this.minRadius = 15;
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.01;
    this.color= color(random(225),random(225),random(225));
  }

  display() {
    noStroke();
    fill(this.color);
    circle(this.x,this.y,this.radius*2);
  }

  move(){
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);
    this.dx = map(dx, 0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
    this.x += this.dx;
    this.y += this.dy;
  }

  wrapAroundScreen() {
    if (this.x > width){
      this.x -= width;
    }
    if (this.x < 0){
      this.x += width;
    }
    if (this.y > height){
      this.y -= height;
    }
    if (this.y < 0){
      this.y += width;
    }
  }
  update(){
    this.move();
    this.wrapAroundScreen();
    this.adjustSizeWithMouse();
    this.connectTo(points);
  }

  adjustSizeWithMouse() {
    let mouseDistance = dist(this.x, this.y, mouseX, mouseY);
    if (mouseDistance < 100){
      let theSize = map(mouseDistance, 0, this.reach, this.maxRadius, this.minRadius);
      this.radius = theSize;
    }
    else{
      this.radius = 15;
    }
  }

  connectTo(pointsArray){
    for (let otherPoint of pointsArray){
      if (this !== otherPoint){
        let pointDistance = dist(this.x,this.y,otherPoint.x,otherPoint.y);
        if (pointDistance < this.reach){
          stroke(50)
          line(this.x, this.y, otherPoint.x, otherPoint.y);
        }
        
      }
    }
  }
}

