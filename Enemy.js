class Enemy extends Player
{
	constructor(x,y)
	{
		super(x,y);
		
		this.target = player;
		this.AI = 2;
	}
	
	show()
	{
		push();
		fill(255, 0, 0);
		noStroke();
		rect(this.pos.x, this.pos.y, this.width, this.height);
		pop();
	}
	
	update()
	{
		switch(this.AI)
		{
			case 0:
			
			break;
			
			case 1:
			this.basicAI();
			break;
			
			case 2:
			this.semiAdvAI();
			break;
			
			default:
			break;
		}
		
		super.update();
	}
	
	basicAI()
	{
		if (typeof this.lastPlatform != 'undefined')
		{
			
		}
	}
	
	semiAdvAI()
	{
		if (typeof this.target != 'undefined')
		{
			if (this.target.pos.x < this.pos.x)
			{
				super.toggleOn(37);
				super.toggleOff(39);
			}
			
			else if (this.target.pos.x + this.target.width > this.pos.x + this.width)
			{
				super.toggleOn(39);
				super.toggleOff(37);
			}
			
			if (this.target.pos.y < this.pos.y && !this.dJump)
			{
				if (!this.isOnGround)
				{
					this.vel.set(this.vel.x, 0);
					this.dJump = !this.dJump;
				}
				
				this.applyForce([0, -10]);
			}
		}
	}
}