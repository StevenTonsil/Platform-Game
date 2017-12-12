class Enemy extends Player
{
	constructor(x,y)
	{
		super(x,y);
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
		/*if (typeof this.lastPlatform != "undefined")
		{*/
			if (player.pos.x < this.pos.x)
			{
				super.toggleOn(37);
				super.toggleOff(39);
			}
			
			else if (player.pos.x + player.width > this.pos.x + this.width)
			{
				super.toggleOn(39);
				super.toggleOff(37);
			}
		//}
		
		if (player.pos.y < this.pos.y && !this.dJump)
		{
			if (!this.isOnGround)
			{
				this.vel.set(this.vel.x, 0);
				this.dJump = !this.dJump;
			}
			
			this.applyForce([0, -10]);
		}
		
		super.update();
	}
}