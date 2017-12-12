let player;
let enemies = [];
let gravity = new p5.Vector(0, 0.3);
let platforms = [];
let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//let testGround;

function setup()
{
	createCanvas(windowWidth, windowHeight);
	background(0);

	platforms.push(new Platform(windowWidth/2 - 20, windowHeight/2 + 60, 100, 20, .85));
	
	for (let i = 0; i < 4; i++)
		platforms.push(new Platform(random(windowWidth/2 - 400, windowWidth/2 + 400), random(windowHeight/2 - 200, windowHeight/2 + 200), random(50, 200), random(20, 40), .95));
	
	player = new Player(windowWidth/2, windowHeight/2);
	
	for (let i = 0; i < 1; i++)
		enemies.push(new Enemy(30, 30));
	
	noCursor();
}

function draw()
{
	background(0);
	translate(-player.pos.x + windowWidth/2, -player.pos.y + windowHeight/2);
	//testGround = false;
	
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
	}
	
	if (!player.isOnGround)
		player.applyForce(gravity);
	
	player.checkEdges();
	player.update();
	player.show();
	
	//resetMap();
}

function keyPressed()
{
	if (!isMobile)
	{
		// Left Arrow Key && Right Arrow Key
		if (keyCode == 37 || keyCode == 39)
		{
			player.toggleOn(keyCode);
		}

		// Up Arrow Key && Space Bar
		if (((keyCode == 38 || keyCode == 32) && player.isOnGround) || !player.dJump && ((keyCode == 38 || keyCode == 32)))
		{
			if (!player.isOnGround)
			{
				player.vel.set(player.vel.x, 0);
				player.dJump = !player.dJump;
			}

			player.applyForce([0, -10]);
		}

		// Down Arrow Key
		/*if (keyCode == 40)
		{
			player.applyForce([0, 1]);
		}*/

		// R Key
		if (keyCode == 82)
			resetMap();
	}
}

function keyReleased()
{
	if (!isMobile)
	{
		// Left Arrow Key && Right Arrow Key
		if (keyCode == 37 || keyCode == 39)
		{
			player.toggleOff(keyCode);
		}
	}
}

function mousePressed()
{
	if (isMobile)
	{
		// Left
		if (mouseX < windowWidth/4)
		{
			player.toggleOn(37);
		}
		
		// Right
		else if (mouseX > 3 * windowWidth/4)
		{
			player.toggleOn(39);	
		}

		// Up
		if (mouseY < windowHeight/4 && (player.isOnGround || !player.dJump))
		{
			if (!player.isOnGround)
			{
				player.vel.set(player.vel.x, 0);
				player.dJump = !player.dJump;
			}

			player.applyForce([0, -10]);
		}

		// Bottom Middle
		if ((mouseX > windowWidth/4 && mouseX < 3 * windowWidth/4) && mouseY > 3 * windowHeight/4)
			resetMap();
	}
}

function mouseReleased()
{
	if (isMobile)
	{
		// Left
		if (mouseX < windowWidth/4)
		{
			player.toggleOff(37);
		}
		
		// Right
		else if (mouseX > 3 * windowWidth/4)
		{
			player.toggleOff(39);	
		}
	}
}

function windowResized()
{
	createCanvas(windowWidth, windowHeight);
}


class Platform
{
	constructor(x,y, width, height, friction)
	{
		this.pos = new p5.Vector(x,y);
		this.width = width;
		this.height = height;
		this.friction = friction;
	}

	show()
	{
		push();
		strokeWeight(2);
		stroke(255);
		fill(0);
		rect(this.pos.x, this.pos.y, this.width, this.height);
		pop();
	}

}

function resetMap()
{
	platforms.splice(0, platforms.length);
	
	platforms.push(new Platform(windowWidth/2 - 20, windowHeight/2 + 60, 100, 20, .85));
	
	for (let i = 1; i < 8; i++)
		platforms.push(new Platform(i * random(100, 300), i * random(50, 200), 100, 20, .85));
}

function resetEntity(entity, x, y)
{
	entity.vel.set(0,0);
	entity.pos.set(x,y);
}
