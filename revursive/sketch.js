// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  recursiveCircle(mouseX, mouseY, mouseX);
}

function recursiveCircle(x , y, radius){
  circle(x, y, radius*2);

  if(radius > 30){
    recursiveCircle(x - radius/2, y, radius/2);
    recursiveCircle(x + radius/2, y, radius/2);
    recursiveCircle(x , y - radius/2, radius/2);
    recursiveCircle(x , y + radius/2, radius/2);
  }

}
