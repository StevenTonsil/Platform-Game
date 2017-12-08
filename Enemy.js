class Enemy extends Player
{
	constructor(x,y)
	{
		super(x,y);
	}
	
	show()
	{
		fill(255, 0, 0);
		noStroke();
		rect(this.pos.x, this.pos.y, this.width, this.height);
	}
}