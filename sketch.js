let player;
let gravity = new p5.Vector(0, 0.3);
let platforms = [];
let testGround;

function setup()
{
	createCanvas(windowWidth, windowHeight);
	background(0);

	platforms.push(new Platform(windowWidth/2 - 20, windowHeight/2 + 60, 100, 20, .85));
	
	for (let i = 0; i < 4; i++)
		platforms.push(new Platform(random(windowWidth/2 - 400, windowWidth/2 + 400), random(windowHeight/2 - 200, windowHeight/2 + 200), random(50, 200), random(20, 40), .85));
	
	player = new Player(windowWidth/2, windowHeight/2);
	
	noCursor();
}

function draw()
{
	background(0);
	testGround = false;
	
	for (let i = 0; i < platforms.length; i++)
	{
		platforms[i].show();
		if(!testGround && player.checkCollusion(platforms[i]))
			testGround = !testGround;
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

function keyReleased()
{
	// Left Arrow Key && Right Arrow Key
	if (keyCode == 37 || keyCode == 39)
	{
		player.toggleOff(keyCode);
	}
}

function windowResized()
{
	createCanvas(windowWidth, windowHeight);
}

class Player
{
	constructor(x,y)
	{
		// Movement Vectors
		this.pos = new p5.Vector(x,y);
		this.vel = new p5.Vector(0,0);
		this.acc = new p5.Vector(0,0);

		this.height = 40;
		this.width = 20;

		// Keys being pressed
		this.right = false;
		this.left = false;

		this.isOnGround = false;
		this.dJump = false;
	}

	show()
	{
		fill(255);
		//stroke(this.r,this.b,this.g);
		rect(this.pos.x, this.pos.y, this.width, this.height);
	}

	applyForce(force)
	{
		this.acc.add(force);
	}

	update()
	{
		if (this.right)
		{
			this.applyForce(.1);
		}

		else if (this.left)
		{
			this.applyForce(-.1);
		}

		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);

		this.vel.limit(10);
	}

	toggleOn(keyCode)
	{
		if (keyCode == 39)
		{
			this.right = true;
		}

		else
		{
			this.left = true;
		}
	}

	toggleOff(keyCode)
	{
		if (keyCode == 39)
		{
			this.right = false;
		}

		else
		{
			this.left = false;
		}
	}

	checkCollusion(platform)
	{
		// If the player hits the platform
		if ((this.pos.x <= platform.pos.x + platform.width && this.pos.x + this.width >= platform.pos.x) && (this.pos.y <= platform.pos.y + platform.height && this.pos.y + this.height >= platform.pos.y))
		{
			//Left or Right
			if ((this.pos.x + this.width < platform.pos.x + 10 || this.pos.x > platform.pos.x + platform.width - 10) && !(this.pos.y + this.height < platform.pos.y + 10))
			{
				this.left = false;
				this.right = false;
				this.vel.set(0, this.vel.y);
				this.isOnGround = false;
			}
			
			//Bottom
			else if (this.pos.y > platform.pos.y + platform.height - 10)
			{
				this.vel.set(this.vel.x, -this.vel.y);
				this.isOnGround = false;
			}
			
			//Top
			else if (this.pos.y + this.height < platform.pos.y + 10)
			{
					this.pos.set(this.pos.x, platform.pos.y - this.height);
					this.vel.set(this.vel.x, 0);
					this.vel.mult(platform.friction);
					this.isOnGround = true;
					this.dJump = false;
			}
			
			return true;
		}
		
		else 
		{
			this.isOnGround = false;
			return false;
		}
	}
	
	checkEdges()
	{
		if (this.pos.y > windowHeight)
			resetMap();
	}
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
		stroke(255);
		fill(0);
		rect(this.pos.x, this.pos.y, this.width, this.height);
	}

}

function resetMap()
{
	platforms.splice(0, platforms.length);
	player.pos.set(windowWidth/2, windowHeight/2);
	
	platforms.push(new Platform(windowWidth/2 - 20, windowHeight/2 + 60, 100, 20, .85));
	
	for (let i = 1; i < 8; i++)
		platforms.push(new Platform(i * random(100, 300), i * random(50, 200), 100, 20, .85));
}