// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let initailTriangle = [
  {x: 0, y: 300},
  {x: 200, y: 0},
  {x: 400, y: 300},
];

let depth = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  sierperpinski(initailTriangle,depth);
}

function sierperpinski(points, depth){
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);
  if(depth > 0){
    sierperpinski([midPoint(points[0], points[1]), midPoint(points[0], points[2]), points[0]],depth-1);
    sierperpinski([midPoint(points[1], points[0]), midPoint(points[1], points[2]), points[1]],depth-1);
    sierperpinski([midPoint(points[2], points[1]), midPoint(points[2], points[0]), points[2]],depth-1);
  }
}


function midPoint(point1, point2){
  return  {
    x: (point1.x + point2.x)/2,
    y: (point1.y + point2.y)/2
  };
}

function mouseReleased(){
  if (depth<7){
    depth++;
  }

}