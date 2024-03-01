// traffoic light
// Hanson
// 3/1/24
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let count = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  count = 0;
  count++;
  for (let x = 0; x < height; x += height / 8) {
    for (let y = 0; y < height; y += height / 8) {
      fill((count % 2) * 1000);
      rect(x, y, height / 8);
      count++;
    }
    count++;
  }
}
