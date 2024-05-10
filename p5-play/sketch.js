let monster;

function setup() {
	new Canvas(5000, 1200);

	monster = new Sprite();
	monster.img = 'heart.png';
  monster.scale = 0.05
	monster.diameter = 70;
	monster.x = 50
  monster.y = 50
	hi = new Sprite(100,50,60,60,"k")
}

function draw() {
	clear();
  monster.moveTowards(mouse)
	if (kb.presses(2)) {
		monster.scale = 1;
	}
	monster.debug = mouse.pressing();
}