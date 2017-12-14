let player;
let enemies = [];
const gravity = new p5.Vector(0, 0.3);
let platforms = [];
let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function setup()
{
	createCanvas(windowWidth, windowHeight);
	background(0);

	platforms.push(new Platform(windowWidth/2 - 20, windowHeight/2 + 60, 100, 20, .85));
	
	for (let i = 0; i < 4; i++)
		platforms.push(new Platform(random(windowWidth/2 - 400, windowWidth/2 + 400), random(windowHeight/2 - 200, windowHeight/2 + 200), random(50, 200), random(20, 40), .95));
	
	player = new Player(windowWidth/2, windowHeight/2);
	
	for (let i = 0; i < 2; i++)
		enemies.push(new Enemy(30, 30));
	
	//enemies[1].target = player;
	
	noCursor();
}

function draw()
{
	background(0);
	translate(-player.pos.x + windowWidth/2, -player.pos.y + windowHeight/2);
	
	for (let platform of platforms)
	{
		platform.show();
		player.checkCollusion(platform);
			
		for (let enemy of enemies)
			enemy.checkCollusion(platform);
	}
	
	for (let enemy of enemies)
	{
		if (!enemy.isOnGround)
			enemy.applyForce(gravity);
		
		enemy.checkEdges();
		enemy.update();
		enemy.show();
		
		enemy.checkCollusion(player);
		
		for (let enemy2 of enemies)
			if (JSON.stringify(enemy) !== JSON.stringify(enemy2))
				enemy.checkCollusion(enemy2);
	}
	
	if (!player.isOnGround)
		player.applyForce(gravity);
	
	player.update();
	player.show();
	
	//resetMap();
}