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
		
		this.lastPlatform;
	}

	show()
	{
		fill(255);
		noStroke();
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
			this.applyForce(.5);
		}

		else if (this.left)
		{
			this.applyForce(-.5);
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
					this.lastPlatform = platform;
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
		// Selects a random platform
		let platform = platforms[Math.floor(random(0,platforms.length))];
		
		if (this.pos.y > windowHeight)
			resetEntity(this, platform.pos.x + platform.width/2, platform.pos.y - platform.height - 20);
	}
}
