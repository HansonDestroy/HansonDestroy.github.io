let monster;

function setup() {
	new Canvas(5000, 1200);

	monster = new Sprite();
	monster.img = 'heart.png';
	monster.scale = 0.05
	monster.diameter = 70;
	monster.x = 50
	monster.y = 50
	player = new Sprite();
	player.img = 'heart.png';
	player.scale = 0.05
	player.diameter = 70;
	player.x = 50
	player.y = 50
	player.collider = "n"
	hi = new Sprite(100,200,60,60,"k")
}

function draw() {
	clear();
	if (keyIsDown(83)){
		monster.x = monster.x + 2;
	}
	if (keyIsDown(86)){
		monster.y = monster.y + 2;
	}
	//monster.moveTowards(mouse)
	player.x = monster.x
	player.y = monster.y
	if (kb.presses(2)) {
		monster.scale = monster.scale / 2.2;
	}
	monster.debug = mouse.pressing();
}